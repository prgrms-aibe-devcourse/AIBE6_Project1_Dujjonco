import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config() // .env 파일의 키를 가져옴

// 디버깅용: 키가 제대로 찍히는지 터미널에서 확인
console.log('--- 환경변수 체크 ---')
console.log('URL:', process.env.VITE_PUBLIC_SUPABASE_URL)
console.log('KEY:', process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? '키 존재함' : '키 없음 (undefined)')
console.log('-------------------')

const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('.env 파일에서 Supabase 키를 찾을 수 없습니다. 파일 위치나 변수명을 확인하세요.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadAllData() {
    const contentTypes = ['12', '32', '39'] // 현재 12는 5페이지 다 들어갔는데 나머지는 안들어가있으니 다음 테스트는 32,39만 해보려 함-> 이주석은 나중에 지울예정
    const SERVICE_KEY = process.env.DATA_API_KEY
    const numOfRows = '2' // 상세정보까지 가져오니 20개가 적당하고 테스트 용으론 2개로 함.하루에 1000개만 긁어올 수 있어서 애매함

    for (const typeId of contentTypes) {
        let pageNo = 1
        let isFinished = false

        while (!isFinished) {
            console.log(`📡 [타입 ${typeId}] ${pageNo}페이지 시도 중...`)

            // 2페이지 넘으면 즉시 종료(테스트용)
            if (pageNo > 2) {
                console.log(`✅ [타입 ${typeId}] 2페이지까지 완료하여 다음 타입으로 넘어갑니다.`)
                isFinished = true
                break
            }

            try {
                const listUrl = `http://apis.data.go.kr/B551011/KorWithService2/areaBasedList2?serviceKey=${SERVICE_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${typeId}`
                const listRes = await fetch(listUrl)
                const textData = await listRes.text()
                let listData

                try {
                    listData = JSON.parse(textData) // 여기서 JSON 변환 시도
                } catch (e) {
                    // 서버가 JSON 대신 "API token... " 같은 에러 텍스트를 보냈을 때 여기서 잡힘
                    console.error(`❌ JSON 파싱 실패! 서버 응답: ${textData.substring(0, 100)}...`)

                    // 만약 하루 할당량이 끝났거나 키가 막혔다면 여기서 중단하거나 다음 타입으로 넘어가야 함
                    if (textData.includes('LIMIT_EXCEEDED') || textData.includes('DEADLINE_EXCEEDED')) {
                        console.log('🚨 트래픽 제한이 걸렸습니다. 잠시 중단하거나 내일 다시 시도하세요.')
                        isFinished = true
                    }
                    pageNo++
                    continue
                }

                const rawItems = listData.response?.body?.items?.item

                if (!rawItems) {
                    console.log(`📭 [타입 ${typeId}] 더 이상 데이터가 없습니다.`)
                    isFinished = true
                    break
                }

                const itemsArray = Array.isArray(rawItems) ? rawItems : [rawItems]
                const mergedData = [] // 루프마다 초기화

                for (const item of itemsArray) {
                    const detailUrl = `http://apis.data.go.kr/B551011/KorWithService2/detailWithTour2?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}`
                    const detailRes = await fetch(detailUrl)
                    const detailText = await detailRes.text()
                    let detail: Record<string, any> = {}

                    try {
                        const parsedDetail = JSON.parse(detailText)
                        detail = parsedDetail.response?.body?.items?.item?.[0] || {}
                    } catch (e) {
                        console.error(`❌ 상세정보 파싱 실패! content_id: ${item.contentid}`)
                        console.error(`❌ 서버 응답 전문: ${detailText.substring(0, 100)}...`) // 너무 길 수 있으니 100자만

                        // 할당량 초과 문구가 있는지 확인
                        if (
                            detailText.includes('LIMIT_EXCEEDED') ||
                            detailText.includes('LIMITED') ||
                            detailText.includes('DEADLINE')
                        ) {
                            console.log('🚨 상세 API 할당량도 끝난 것 같습니다. 작업을 중단합니다.')
                            isFinished = true // while 루프 종료 준비
                            throw new Error('API_QUOTA_EXCEEDED')
                        }
                        // 그냥 데이터가 없는 경우라면 빈 객체로 넘김
                    }

                    mergedData.push({
                        // --- 0. Place 기본 정보 ---
                        content_id: item.contentid,
                        content_type: Number(item.contenttypeid),
                        title: item.title,
                        address: item.addr1,
                        addr2: item.addr2 || null,
                        tel: item.tel || null,
                        lat: Number(item.mapy),
                        lng: Number(item.mapx),
                        image_url: item.firstimage || null,
                        image_url2: item.firstimage2 || null,

                        // --- 1. 지체장애 ---
                        parking: detail.parking || null,
                        publictransport: detail.publictransport || null,
                        route: detail.route || null,
                        ticketoffice: detail.ticketoffice || null,
                        promotion: detail.promotion || null,
                        wheelchair: detail.wheelchair || null,
                        exit: detail.exit || null,
                        elevator: detail.elevator || null,
                        restroom: detail.restroom || null,
                        auditorium: detail.auditorium || null,
                        room: detail.room || null,
                        handicapetc: detail.handicapetc || null,

                        // --- 2. 시각장애 ---
                        braileblock: detail.braileblock || null,
                        helpdog: detail.helpdog || null,
                        guidehuman: detail.guidehuman || null,
                        audioguide: detail.audioguide || null,
                        bigprint: detail.bigprint || null,
                        brailepromotion: detail.brailepromotion || null,
                        guidesystem: detail.guidesystem || null,
                        blindhandicapetc: detail.blindhandicapetc || null,

                        // --- 3. 청각장애 ---
                        signguide: detail.signguide || null,
                        videoguide: detail.videoguide || null,
                        hearingroom: detail.hearingroom || null,
                        hearinghandicapetc: detail.hearinghandicapetc || null,

                        // --- 4. 영유아 가족 ---
                        stroller: detail.stroller || null,
                        lactationroom: detail.lactationroom || null,
                        babysparechair: detail.babysparechair || null,
                        infantsfamilyetc: detail.infantsfamilyetc || null,
                    })

                    // 상세 API 호출 사이의 짧은 휴식 -> 이거 없으면 너무 많은 요청이였나 너무 오래걸리는 요청이였나 5XX 에러뜸
                    await new Promise((r) => setTimeout(r, 500))
                }

                // Supabase 저장 시도
                const { error } = await supabase.from('places').upsert(mergedData, { onConflict: 'content_id' })

                if (error) {
                    console.error(`❌ DB 저장 실패: ${error.message}`)
                } else {
                    console.log(`✅ [타입 ${typeId}] ${pageNo}페이지 저장 성공! (${mergedData.length}개)`)
                }

                pageNo++ // 다음 페이지로

                // 페이지 사이의 휴식 (509 에러 방지용 )
                await new Promise((r) => setTimeout(r, 3000))
            } catch (err: any) {
                console.error(`⚠️ ${pageNo}페이지 로직 에러:`, err.message)
                pageNo++ // 에러 나도 일단 다음 페이지 시도
            }
        }
    }
}

uploadAllData()
