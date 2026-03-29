import { useCommentsData } from '@/hooks/queries/use-comments-data'
import Fallback from '../../common/ErrorFallback'
import Loader from '../../common/LoadingSpinner'
import CommentItem from './comment-item'

export default function CommentList({ postId }: { postId: string }) {
    const { data: comments, isPending, error } = useCommentsData(postId)

    if (isPending) return <Loader />
    if (error) return <Fallback />

    return (
        <div className="flex flex-col gap-5">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    )
}
