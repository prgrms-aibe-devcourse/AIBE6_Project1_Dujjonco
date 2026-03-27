import { Button } from '@/app/ui2/button2'
import { useOpenEditPostModal } from '@/store/post-editor-modal'
import type { Post } from '@/types'

export default function EditPostButton({ post }: { post: Post }) {
    const openEditPostModal = useOpenEditPostModal()

    const handleButtonClick = () => {
        openEditPostModal({
            postId: post.id,
            content: post.content,
            imageUrls: post.post_images.flatMap((img) => img.image_url ?? []),
        })
    }

    return (
        <Button onClick={handleButtonClick} className="cursor-pointer" variant={'ghost'}>
            수정
        </Button>
    )
}
