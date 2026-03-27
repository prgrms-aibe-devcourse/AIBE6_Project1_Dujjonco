import { useAuth } from '@/app/contexts/AuthContext'
import { formatTimeAgo } from '@/app/util/time'
import defaultAvatar from '@/assets/default-avatar.png'
import { useDeleteComment } from '@/hooks/mutations/comment/use-delete-comment'
import { useUpdateComment } from '@/hooks/mutations/comment/use-update-comment'
import { useOpenAlertModal } from '@/store/alert-modal'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'

type Comment = {
    id: string
    post_id: string | null
    user_id: string | null
    content: string
    created_at: string | null
    updated_at: string | null
}

export default function CommentItem({ comment }: { comment: Comment }) {
    const { user } = useAuth()
    const openAlertModal = useOpenAlertModal()
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)

    const { mutate: updateComment, isPending: isUpdatePending } = useUpdateComment(comment.post_id ?? '', {
        onSuccess: () => setIsEditing(false),
        onError: () => toast.error('댓글 수정에 실패했습니다.', { position: 'top-center' }),
    })

    const { mutate: deleteComment } = useDeleteComment(comment.post_id ?? '', {
        onError: () => toast.error('댓글 삭제에 실패했습니다.', { position: 'top-center' }),
    })

    const handleDeleteClick = () => {
        openAlertModal({
            title: '댓글 삭제',
            description: '삭제된 댓글은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?',
            onPositive: () => deleteComment(comment.id),
        })
    }

    const handleUpdateClick = () => {
        if (editContent.trim() === '' || editContent === comment.content) {
            setIsEditing(false)
            return
        }
        updateComment({ id: comment.id, content: editContent })
    }

    return (
        <div className="flex flex-col gap-8 border-b pb-5">
            <div className="flex items-start gap-4">
                <Link to={'#'}>
                    <div className="flex h-full flex-col">
                        <img className="h-10 w-10 rounded-full object-cover" src={defaultAvatar} />
                    </div>
                </Link>
                <div className="flex w-full flex-col gap-2">
                    <div className="font-bold">{user?.nickname ?? '알 수 없음'}</div>
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full rounded border p-2 text-sm focus:outline-none"
                                disabled={isUpdatePending}
                            />
                            <div className="flex gap-2">
                                <button onClick={handleUpdateClick} className="text-sm hover:underline">
                                    저장
                                </button>
                                <button onClick={() => setIsEditing(false)} className="text-sm hover:underline">
                                    취소
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>{comment.content}</div>
                    )}
                    <div className="text-muted-foreground flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div>{comment.created_at ? formatTimeAgo(comment.created_at) : ''}</div>
                        </div>
                        {comment.user_id === user?.id && !isEditing && (
                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer hover:underline" onClick={() => setIsEditing(true)}>
                                    수정
                                </div>
                                <div className="bg-border h-[13px] w-[2px]"></div>
                                <div className="cursor-pointer hover:underline" onClick={handleDeleteClick}>
                                    삭제
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
