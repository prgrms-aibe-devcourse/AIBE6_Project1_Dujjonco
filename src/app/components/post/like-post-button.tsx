import { useAuth } from '@/app/contexts/AuthContext'
import useTogglePostLike from '@/hooks/mutations/post/use-toggle-post-like'
import { HeartIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function LikePostButton({
    id,
    likeCount,
    isLiked,
}: {
    id: string
    likeCount: number
    isLiked: boolean
}) {
    const { user } = useAuth()
    const { mutate: togglePostLike } = useTogglePostLike(id, {
        onError: (_error) => {
            toast.error('좋아요 요청에 실패했습니다.', { position: 'top-center' })
        },
    })

    const handleLikeClick = () => {
        if (!user?.id) {
            toast.error('로그인이 필요합니다.', { position: 'top-center' })
            return
        }
        togglePostLike({ postId: id, userId: user.id })
    }

    return (
        <div
            onClick={handleLikeClick}
            className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm"
        >
            <HeartIcon className={`h-4 w-4 ${isLiked ? 'fill-black' : ''}`} />
            <span>{likeCount}</span>
        </div>
    )
}
