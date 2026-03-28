import { useCommentsData } from '@/hooks/queries/use-comments-data'
import CommentItem from './comment-item'

export default function CommentList({ postId }: { postId: string }) {
    const { data: comments, isPending, error } = useCommentsData(postId)

    if (isPending) return <div className="text-muted-foreground text-sm">댓글을 불러오는 중...</div>
    if (error) return <div className="text-destructive text-sm">댓글을 불러오지 못했습니다.</div>
    if (!comments || comments.length === 0)
        return <div className="text-muted-foreground text-sm">첫 번째 댓글을 남겨보세요!</div>

    return (
        <div className="flex flex-col gap-4">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    )
}
