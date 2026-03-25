// 경로: api/fetch-places.ts (프로젝트 최상단 api 폴더)

export default async function handler(req: any, res: any) {
    const pageNo = req.query.page || '1'
    const numOfRows = '20'
    const SERVICE_KEY = process.env.DATA_API_KEY
    
    // 1. 가져올 타입들 정의
    const contentTypes = ['12', '32', '39']
    const mergedData = [] // 모든 타입의 데이터를 합칠 바구니

    try {
        // 2. 타입별로 반복문 시작
        for (const typeId of contentTypes) {
            const listUrl = `http://apis.data.go.kr/B551011/KorWithService2/areaBasedList2?serviceKey=${SERVICE_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${typeId}`

            const listRes = await fetch(listUrl)
            const listData = await listRes.json()

            const rawItems = listData.response?.body?.items?.item
            if (!rawItems) continue; // 이 타입에 데이터가 없으면 다음 타입으로 패스

            for (const item of rawItems) {
                const detailUrl = `http://apis.data.go.kr/B551011/KorWithService2/detailWithTour2?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}`

                const detailRes = await fetch(detailUrl)
                const detailData = await detailRes.json()
                const detail = detailData.response?.body?.items?.item?.[0] || {}

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
                
                // 509 에러 방지용 미세한 지연 
                await new Promise(resolve => setTimeout(resolve, 100)); 
            }
        }

        // 모든 타입이 합쳐진 결과 반환
        return res.status(200).json({
            success: true,
            page: pageNo,
            total_types: contentTypes,
            total_count: mergedData.length,
            data: mergedData,
        })

    } catch (error: any) {
        console.error('데이터 가공 중 에러 발생:', error)
        return res.status(500).json({ success: false, error: error.message })
    }
}