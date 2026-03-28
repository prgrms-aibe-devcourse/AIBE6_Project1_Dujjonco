// 리뷰 작성 시 진입로, 내부 시설, 편의시설 등에 대한 별점(1-5점)을 선택할 수 있는 입력 컴포넌트

import { Accessibility } from 'lucide-react'
import { useState } from 'react'

interface StarRatingInputProps {
    label: string
    value: number
    onChange: (val: number) => void
}

export function StarRatingInput({ label, value, onChange }: StarRatingInputProps) {
    const [hover, setHover] = useState(0)

    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHover(star)}
                        className={`transform transition-all hover:scale-110 ${
                            (hover || value) >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        <Accessibility className={`size-6 ${(hover || value) >= star ? 'fill-current' : ''}`} />
                    </button>
                ))}
            </div>
        </div>
    )
}
