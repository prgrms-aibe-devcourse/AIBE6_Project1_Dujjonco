// 새로운 리뷰를 작성하기 위한 폼 컴포넌트
// 별점 선택, 텍스트 입력, 이미지 첨부 기능을 제공

import { Camera, Send, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { StarRatingInput } from './StarRatingInput'

interface ReviewFormProps {
    user: any
    onSubmit: (
        userId: string,
        content: string,
        ratings: { entrance: number; interior: number; amenities: number },
        images: string[],
    ) => Promise<any>
    onUploadImage: (file: File) => Promise<{ url?: string; error?: string }>
}

export function ReviewForm({ user, onSubmit, onUploadImage }: ReviewFormProps) {
    const [newReview, setNewReview] = useState('')
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [ratings, setRatings] = useState({
        entrance: 5,
        interior: 5,
        amenities: 5,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setSelectedImages((prev) => [...prev, ...files])
            const newPreviews = files.map((file) => URL.createObjectURL(file))
            setImagePreviews((prev) => [...prev, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            setError('로그인이 필요합니다.')
            return
        }
        if (!newReview.trim()) {
            setError('리뷰 내용을 입력해주세요.')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const uploadedUrls: string[] = []
            for (const file of selectedImages) {
                const { url, error: uploadError } = await onUploadImage(file)
                if (uploadError) throw new Error(uploadError)
                if (url) uploadedUrls.push(url)
            }

            const result = await onSubmit(user.id, newReview, ratings, uploadedUrls)
            if (!result.success) {
                throw new Error(result.error)
            }

            setNewReview('')
            setSelectedImages([])
            setImagePreviews([])
            setRatings({ entrance: 5, interior: 5, amenities: 5 })
        } catch (err: any) {
            setError(err.message || '리뷰 작성 중 오류가 발생했습니다.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!user) {
        return (
            <div className="rounded-xl bg-gray-50 p-6 text-center">
                <p className="mb-4 text-gray-500 dark:text-black">로그인 후 리뷰를 작성할 수 있습니다.</p>
                <Link to="/login" className="font-medium text-blue-600 hover:underline">
                    로그인하러 가기
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-gray-50 p-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-black">리뷰 남기기</label>
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                            e.preventDefault()
                            handleSubmit(e)
                        }
                    }}
                    placeholder="이 장소에 대한 경험을 공유해주세요."
                    className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-4 transition-all outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-3">
                <StarRatingInput
                    label="진입로"
                    value={ratings.entrance}
                    onChange={(val) => setRatings((prev) => ({ ...prev, entrance: val }))}
                />
                <StarRatingInput
                    label="내부 시설"
                    value={ratings.interior}
                    onChange={(val) => setRatings((prev) => ({ ...prev, interior: val }))}
                />
                <StarRatingInput
                    label="편의시설"
                    value={ratings.amenities}
                    onChange={(val) => setRatings((prev) => ({ ...prev, amenities: val }))}
                />
            </div>

            {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {imagePreviews.map((url, index) => (
                        <div key={index} className="group relative size-20 overflow-hidden rounded-lg">
                            <img src={url} alt="preview" className="size-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Trash2 className="size-5 text-white" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-black"
                    >
                        <Camera className="size-4" />
                        사진 첨부
                    </button>
                    <span className="text-xs text-gray-500 dark:text-black">{selectedImages.length}개 선택됨</span>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        '작성 중...'
                    ) : (
                        <>
                            작성하기
                            <Send className="size-4" />
                        </>
                    )}
                </button>
            </div>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
    )
}
