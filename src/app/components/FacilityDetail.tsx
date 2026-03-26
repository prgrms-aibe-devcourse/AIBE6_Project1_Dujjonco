import { Accessibility, ArrowLeft, Camera, Heart, MapPin, Phone, Send, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useReviews } from '../../hooks/useReviews'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Facility {
    content_id: string
    content_type: string
    title: string
    address: string
    addr2?: string
    tel?: string
    lat?: number
    lng?: number
    image_url?: string
    image_url2?: string

    parking?: string
    wheelchair?: string
    restroom?: string
}

export function FacilityDetail() {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest')
    const { reviews, loading, averages, addReview, uploadImage, toggleLikeReview, addReply, deleteReview, deleteReply } = useReviews(
        id || '',
        user?.id,
        sortBy,
    )

    // UI ?ÅÌÉú Í¥ÄÎ¶?
    const [facility, setFacility] = useState<Facility | null>(null)
    const [newReview, setNewReview] = useState('') // ?ëÏÑ± Ï§ëÏù∏ Î¶¨Î∑∞ ?çÏä§??
    const [selectedImages, setSelectedImages] = useState<File[]>([]) // ?†ÌÉù???¥Î?ÏßÄ ?åÏùº??
    const [imagePreviews, setImagePreviews] = useState<string[]>([]) // ?¥Î?ÏßÄ ÎØ∏Î¶¨Î≥¥Í∏∞ URL??

    // Î≥ÑÏ†ê ?ÅÌÉú
    const [ratings, setRatings] = useState({
        entrance: 5,
        interior: 5,
        amenities: 5,
    })

    const [isSubmitting, setIsSubmitting] = useState(false) // ?ÖÎ°ú???Ä???ÅÌÉú
    const [error, setError] = useState<string | null>(null) // ?êÎü¨ Î©îÏãúÏßÄ
    const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({}) // ?µÍ? ?ÖÎ†• ?ÅÌÉú

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (id) fetchFacility()
    }, [id])

    //?•ÏÜå ?ïÎ≥¥Î•?Í∞Ä?∏Ïòµ?àÎã§.
    const fetchFacility = async () => {
        const { data, error } = await supabase.from('places').select('*').eq('content_id', id).single()

        if (error) {
            console.error(error)
        } else {
            setFacility(data)
        }
    }

    //?¥Î?ÏßÄ ?†ÌÉù ??ÎØ∏Î¶¨Î≥¥Í∏∞Î•??ùÏÑ±?òÍ≥† ?ÅÌÉú???Ä?•Ìï©?àÎã§.
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setSelectedImages((prev) => [...prev, ...files])

            const newPreviews = files.map((file) => URL.createObjectURL(file))
            setImagePreviews((prev) => [...prev, ...newPreviews])
        }
    }

    //?†ÌÉù???¥Î?ÏßÄÎ•?Î™©Î°ù?êÏÑú ??†ú?©Îãà??
    const removeImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    //Î¶¨Î∑∞Î•??úÏ∂ú?©Îãà?? (?¥Î?ÏßÄ ?ÖÎ°ú??-> ?∞Ïù¥?∞Î≤†?¥Ïä§ ?Ä??
    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            setError('Î°úÍ∑∏?∏Ïù¥ ?ÑÏöî?©Îãà??')
            return
        }
        if (!newReview.trim()) {
            setError('Î¶¨Î∑∞ ?¥Ïö©???ÖÎ†•?¥Ï£º?∏Ïöî.')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            // 1. ?¥Î?ÏßÄÍ∞Ä ?†ÌÉù?òÏóà?§Î©¥ ?§ÌÜ†Î¶¨Ï???Î®ºÏ? ?ÖÎ°ú?úÌï©?àÎã§.
            const uploadedUrls: string[] = []
            for (const file of selectedImages) {
                const { url, error: uploadError } = await uploadImage(file)
                if (uploadError) throw new Error(uploadError)
                if (url) uploadedUrls.push(url)
            }

            // 2. ?ëÏÑ±???¥Ïö©Í≥??¥Î?ÏßÄ URL???¨Ìï®?òÏó¨ Î¶¨Î∑∞Î•??ùÏÑ±?©Îãà??
            const result = await addReview(user.id, newReview, ratings, uploadedUrls)
            if (!result.success) {
                throw new Error(result.error)
            }

            // 3. ?±Í≥µ ???ºÏùÑ Ï¥àÍ∏∞?îÌï©?àÎã§.
            setNewReview('')
            setSelectedImages([])
            setImagePreviews([])
            setRatings({ entrance: 5, interior: 5, amenities: 5 })
        } catch (err: any) {
            setError(err.message || 'Î¶¨Î∑∞ ?ëÏÑ± Ï§??§Î•òÍ∞Ä Î∞úÏÉù?àÏäµ?àÎã§.')
        } finally {
            setIsSubmitting(false)
        }
    }

    //  ?µÍ? ?úÏ∂ú ?∏Îì§??
    const handleSubmitReply = async (reviewId: string) => {
        const content = replyInputs[reviewId]
        if (!content?.trim() || !user) return

        const result = await addReply(reviewId, user.id, content)
        if (result.success) {
            setReplyInputs((prev) => ({ ...prev, [reviewId]: '' }))
        }
    }

    // Î¶¨Î∑∞ ??†ú ?∏Îì§??
    const handleDeleteReview = async (reviewId: string) => {
        if (!user || !window.confirm('Î¶¨Î∑∞Î•???†ú?òÏãúÍ≤†Ïäµ?àÍπå?')) return
        await deleteReview(reviewId, user.id)
    }

    // ?µÍ? ??†ú ?∏Îì§??
    const handleDeleteReply = async (replyId: string) => {
        if (!user || !window.confirm('?µÍ?????†ú?òÏãúÍ≤†Ïäµ?àÍπå?')) return
        await deleteReply(replyId, user.id)
    }

    // Î≥ÑÏ†ê ?†ÌÉù Ïª¥Ìè¨?åÌä∏
    const StarRatingInput = ({
        label,
        value,
        onChange,
    }: {
        label: string
        value: number
        onChange: (val: number) => void
    }) => {
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

    if (!facility) {
        return <div className="py-12 text-center">Î°úÎî©Ï§?..</div>
    }

    return (
        <div className="space-y-6 pb-20">
            {/* ?§Î°úÍ∞ÄÍ∏?*/}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="size-5" />
                <span>Î™©Î°ù?ºÎ°ú</span>
            </Link>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                {/* ?¥Î?ÏßÄ */}
                <div className="relative h-96">
                    <ImageWithFallback
                        src={facility.image_url || '/fallback.png'}
                        alt={facility.title}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
                        <h1 className="mb-2 text-4xl">{facility.title}</h1>
                        <p className="opacity-90">{facility.content_type}</p>
                    </div>
                </div>

                {/* ?¥Ïö© */}
                <div className="space-y-6 p-8">
                    {/* Í∏∞Î≥∏ ?ïÎ≥¥ */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <MapPin className="size-5 text-blue-600" />
                            <p>{facility.address}</p>
                        </div>

                        {facility.tel && (
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-orange-600" />
                                <p>{facility.tel}</p>
                            </div>
                        )}
                    </div>

                    {/* ?ëÍ∑º??*/}
                    <div>
                        <h2 className="mb-3 flex items-center gap-2 text-2xl">
                            <Accessibility className="size-6 text-blue-500" />
                            ?∏Ïùò?úÏÑ§
                        </h2>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                            {facility.wheelchair && <div className="rounded-lg bg-blue-50 p-3">?†Ï≤¥???ëÍ∑º Í∞Ä??/div>}

                            {facility.parking && <div className="rounded-lg bg-blue-50 p-3">?•Ïï†??Ï£ºÏ∞® Í∞Ä??/div>}

                            {facility.restroom && <div className="rounded-lg bg-blue-50 p-3">?•Ïï†???îÏû•??/div>}
                        </div>

                        {!facility.wheelchair && !facility.parking && !facility.restroom && (
                            <p className="text-gray-400">?±Î°ù???∏Ïùò?úÏÑ§ ?ïÎ≥¥ ?ÜÏùå</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Î¶¨Î∑∞ ?πÏÖò */}
            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="flex items-center gap-2 text-2xl font-bold">Î¶¨Î∑∞ ({reviews.length})</h2>

                {/* ?âÍ∑† ?âÏ†ê ?îÏïΩ ?πÏÖò */}
                {averages.count > 0 && (
                    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-blue-50/50 p-6 md:grid-cols-4">
                        <div className="flex flex-col items-center justify-center border-b border-blue-100 pb-4 md:border-r md:border-b-0 md:pb-0">
                            <span className="text-sm font-medium text-blue-600">?ÑÏ≤¥ ?âÏ†ê</span>
                            <span className="text-4xl font-bold text-gray-800">{averages.total.toFixed(1)}</span>
                            <div className="mt-1 flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Accessibility
                                        key={s}
                                        className={`size-4 ${s <= Math.round(averages.total) ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                            <span className="mb-1 text-xs text-gray-500">ÏßÑÏûÖÎ°?/span>
                            <span className="text-xl font-bold text-gray-700">{averages.entrance.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                            <span className="mb-1 text-xs text-gray-500">?¥Î? ?úÏÑ§</span>
                            <span className="text-xl font-bold text-gray-700">{averages.interior.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                            <span className="mb-1 text-xs text-gray-500">?∏Ïùò?úÏÑ§</span>
                            <span className="text-xl font-bold text-gray-700">{averages.facility.toFixed(1)}</span>
                        </div>
                    </div>
                )}

                {/* Î¶¨Î∑∞ ?ëÏÑ± ??*/}
                {user ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4 rounded-xl bg-gray-50 p-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Î¶¨Î∑∞ ?®Í∏∞Í∏?/label>
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                                        e.preventDefault()
                                        handleSubmitReview(e)
                                    }
                                }}
                                placeholder="???•ÏÜå???Ä??Í≤ΩÌóò??Í≥µÏú†?¥Ï£º?∏Ïöî."
                                className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-4 transition-all outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Î≥ÑÏ†ê ?†ÌÉù ?ÅÏó≠ */}
                        <div className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-3">
                            <StarRatingInput
                                label="ÏßÑÏûÖÎ°?
                                value={ratings.entrance}
                                onChange={(val) => setRatings((prev) => ({ ...prev, entrance: val }))}
                            />
                            <StarRatingInput
                                label="?¥Î? ?úÏÑ§"
                                value={ratings.interior}
                                onChange={(val) => setRatings((prev) => ({ ...prev, interior: val }))}
                            />
                            <StarRatingInput
                                label="?∏Ïùò?úÏÑ§"
                                value={ratings.amenities}
                                onChange={(val) => setRatings((prev) => ({ ...prev, amenities: val }))}
                            />
                        </div>

                        {/* ?¥Î?ÏßÄ ?ÑÎ¶¨Î∑?*/}
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
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                                >
                                    <Camera className="size-4" />
                                    ?¨ÏßÑ Ï≤®Î?
                                </button>
                                <span className="text-xs text-gray-500">{selectedImages.length}Í∞??†ÌÉù??/span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    '?ëÏÑ± Ï§?..'
                                ) : (
                                    <>
                                        ?ëÏÑ±?òÍ∏∞
                                        <Send className="size-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </form>
                ) : (
                    <div className="rounded-xl bg-gray-50 p-6 text-center">
                        <p className="mb-4 text-gray-500">Î°úÍ∑∏????Î¶¨Î∑∞Î•??ëÏÑ±?????àÏäµ?àÎã§.</p>
                        <Link to="/login" className="font-medium text-blue-600 hover:underline">
                            Î°úÍ∑∏?∏Ìïò??Í∞ÄÍ∏?
                        </Link>
                    </div>
                )}

                {/* Î¶¨Î∑∞ Î™©Î°ù ?πÏÖò */}
                <div className="space-y-6">
                    {/* ?ïÎ†¨ Î≤ÑÌäº ?ÅÏó≠ */}
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-2xl font-bold">Î¶¨Î∑∞ ({reviews.length})</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSortBy('latest')}
                                className={`text-sm font-medium transition-colors ${sortBy === 'latest' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                ÏµúÏã†??
                            </button>
                            <span className="text-gray-200">|</span>
                            <button
                                onClick={() => setSortBy('likes')}
                                className={`text-sm font-medium transition-colors ${sortBy === 'likes' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Ï¢ãÏïÑ?îÏàú
                            </button>
                        </div>
                    </div>

                    {loading && reviews.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">Î¶¨Î∑∞Î•?Î∂àÎü¨?§Îäî Ï§ëÏûÖ?àÎã§...</div>
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="space-y-3 border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-800">?¨Ïö©??{review.user_id.slice(0, 4)}</span>
                                        {user?.id === review.user_id && (
                                            <button
                                                onClick={() => handleDeleteReview(review.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                                title="Î¶¨Î∑∞ ??†ú"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Î≥ÑÏ†ê ?úÏãú */}
                                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-600">ÏßÑÏûÖÎ°?/span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Accessibility
                                                    key={s}
                                                    className={`size-3 ${s <= review.rating_entrance ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="rounded bg-orange-50 px-2 py-0.5 text-orange-600">?¥Î?</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Accessibility
                                                    key={s}
                                                    className={`size-3 ${s <= review.rating_interior ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="rounded bg-green-50 px-2 py-0.5 text-green-600">?∏Ïùò?úÏÑ§</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Accessibility
                                                    key={s}
                                                    className={`size-3 ${s <= review.rating_facility ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="leading-relaxed text-gray-600">{review.content}</p>

                                {review.images && review.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {review.images.map((url, i) => (
                                            <div key={i} className="size-24 overflow-hidden rounded-lg">
                                                <ImageWithFallback
                                                    src={url}
                                                    alt="review"
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Ï¢ãÏïÑ??Î≤ÑÌäº */}
                                <div className="pt-2">
                                    <button
                                        onClick={() => user && toggleLikeReview(review.id, user.id)}
                                        disabled={!user}
                                        className={`flex transform items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                                            review.is_liked
                                                ? 'border border-red-200 bg-red-50 text-red-600'
                                                : 'border border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        <Heart className={`size-4 ${review.is_liked ? 'fill-current' : ''}`} />
                                        <span>Ï¢ãÏïÑ??{review.likes || 0}</span>
                                    </button>
                                </div>

                                {/* ?µÍ? Î™©Î°ù Î∞??ëÏÑ± ?πÏÖò */}
                                <div className="mt-4 ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
                                    {/* Í∏∞Ï°¥ ?µÍ? ?åÎçîÎß?*/}
                                    {review.replies && review.replies.length > 0 && (
                                        <div className="space-y-3">
                                            {review.replies.map((reply) => (
                                                <div key={reply.id} className="text-sm">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="font-bold text-gray-700">
                                                            ?µÎ™Ö {reply.user_id.slice(0, 4)}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            {new Date(reply.created_at).toLocaleDateString()}
                                                        </span>
                                                        {user?.id === reply.user_id && (
                                                            <button
                                                                onClick={() => handleDeleteReply(reply.id)}
                                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                                                title="?µÍ? ??†ú"
                                                            >
                                                                <Trash2 className="size-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ?µÍ? ?ÖÎ†•Ï∞?(Î°úÍ∑∏???úÏóêÎß??∏Ï∂ú) */}
                                    {user && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={replyInputs[review.id] || ''}
                                                onChange={(e) =>
                                                    setReplyInputs((prev) => ({ ...prev, [review.id]: e.target.value }))
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                                        handleSubmitReply(review.id)
                                                    }
                                                }}
                                                placeholder="?µÍ????®Í≤®Ï£ºÏÑ∏??.."
                                                className="flex-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-blue-400 focus:bg-white"
                                            />
                                            <button
                                                onClick={() => handleSubmitReply(review.id)}
                                                className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                                            >
                                                ?±Î°ù
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="py-10 text-center text-gray-400">Ï≤?Î≤àÏß∏ Î¶¨Î∑∞Î•??®Í≤®Î≥¥ÏÑ∏??</p>
                    )}
                </div>
            </div>
        </div>
    )
}
