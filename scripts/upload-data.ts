import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { AreaCode, ContentType } from '../constants/api-codes.ts'

dotenv.config()

const supabase = createClient(process.env.VITE_PUBLIC_SUPABASE_URL!, process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)

const SERVICE_KEY = process.env.DATA_API_KEY

/** 1. 특정 장소의 무장애 상세 정보 가져오기 */
async function fetchBarrierFreeDetail(contentId: string) {
    const url = `http://apis.data.go.kr/B551011/KorWithService2/detailWithTour2?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}`

    try {
        const res = await fetch(url)
        const text = await res.text()
        const data = JSON.parse(text)
        return data.response?.body?.items?.item?.[0] || {}
    } catch (e) {
        console.error(`❌ 상세정보 파싱 실패! ID: ${contentId}`)
        return {}
    }
}

/** 2. API 원본 데이터를 DB 스키마에 맞게 매핑 */
function mapToPlaceSchema(item: any, detail: any, areaCode: string) {
    return {
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
        area_code: areaCode,

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
    }
}

/** 3. 한 페이지 분량의 데이터를 처리하고 저장 */
async function processPage(areaCode: string, typeId: string, pageNo: number) {
    const numOfRows = '20'
    const listUrl = `http://apis.data.go.kr/B551011/KorWithService2/areaBasedList2?serviceKey=${SERVICE_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${typeId}&areaCode=${areaCode}`

    const res = await fetch(listUrl)
    const data = await res.json()
    const rawItems = data.response?.body?.items?.item

    if (!rawItems) return null

    const itemsArray = Array.isArray(rawItems) ? rawItems : [rawItems]
    const mergedData = []

    for (const item of itemsArray) {
        const detail = await fetchBarrierFreeDetail(item.contentid)
        mergedData.push(mapToPlaceSchema(item, detail, areaCode))
        await new Promise((r) => setTimeout(r, 500)) // 상세 API 부하 방지
    }

    const { error } = await supabase.from('places').upsert(mergedData, { onConflict: 'content_id' })
    if (error) throw new Error(`DB 저장 실패: ${error.message}`)

    return mergedData.length
}

/** 4. 메인 실행 함수 (Depth가 획기적으로 줄어듬) */
async function uploadAllData() {
    const targetAreas = [AreaCode.JEJU]
    const targetTypes = [ContentType.TOURISM, ContentType.LODGING, ContentType.RESTAURANT]

    for (const area of targetAreas) {
        for (const type of targetTypes) {
            console.log(`🚀 [시작] 지역:${area} / 타입:${type}`)

            for (let page = 1; page <= 15; page++) {
                try {
                    const count = await processPage(area, type, page)
                    if (!count) break // 데이터 없으면 다음 타입으로

                    console.log(`✅ ${page}페이지 완료 (${count}개)`)
                    await new Promise((r) => setTimeout(r, 2000)) // 페이지간 휴식
                } catch (err: any) {
                    console.error(`⚠️ 에러 발생:`, err.message)
                    if (err.message.includes('QUOTA')) return // 할당량 끝났으면 전체 종료
                }
            }
        }
    }
}

uploadAllData()
