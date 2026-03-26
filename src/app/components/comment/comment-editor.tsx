import { useAuth } from '@/app/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCreateComment } from '@/hooks/mutations/comment/use-create-comment'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CommentEditor({ postId }: { postId: string }) {
    const { user } = useAuth()
    const [content, setContent] = useState('')

    const { mutate: createComment, isPending } = useCreateComment(postId, {
        onSuccess: () => setContent(''),
        onError: () => toast.error('댓글 작성에 실패했습니다.', { position: 'top-center' }),
    })

    const handleSubmit = () => {
        if (content.trim() === '') return
        if (!user?.id) {
            toast.error('로그인이 필요합니다.', { position: 'top-center' })
            return
        }
        createComment({ postId, userId: user.id, content })
    }

    return (
        <div className="flex flex-col gap-2">
            <Textarea
                className="border-gray-300"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPending}
                placeholder="댓글을 입력하세요"
            />
            <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={isPending}>
                    작성
                </Button>
            </div>
        </div>
    )
}
