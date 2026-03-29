// 전체 평점 및 각 카테고리별 평균 점수를 시각적으로 보여주는 컴포넌트

import { Star } from 'lucide-react'


interface ReviewAveragesProps {
    total: number
    entrance: number
    interior: number
    facility: number
    count: number
}

export function ReviewAverages({ total, entrance, interior, facility, count }: ReviewAveragesProps) {
    if (count === 0) return null

    return (
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-blue-50/50 p-6 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center border-b border-blue-100 pb-4 md:border-r md:border-b-0 md:pb-0">
                <span className="text-sm font-medium text-blue-600 dark:text-black">전체 평점</span>
                <span className="text-4xl font-bold text-gray-800 dark:text-black">{total.toFixed(1)}</span>
                <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                            key={s}
                            className={`size-4 ${
                                s <= Math.round(total) ? 'fill-current text-yellow-400' : 'text-gray-200'
                            }`}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                <span className="mb-1 text-xs text-gray-500 dark:text-black">진입로</span>
                <span className="text-xl font-bold text-gray-700 dark:text-black">{entrance.toFixed(1)}</span>
            </div>
            <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                <span className="mb-1 text-xs text-gray-500 dark:text-black">내부 시설</span>
                <span className="text-xl font-bold text-gray-700 dark:text-black">{interior.toFixed(1)}</span>
            </div>
            <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                <span className="mb-1 text-xs text-gray-500 dark:text-black">편의시설</span>
                <span className="text-xl font-bold text-gray-700 dark:text-black">{facility.toFixed(1)}</span>
            </div>
        </div>
    )
}
