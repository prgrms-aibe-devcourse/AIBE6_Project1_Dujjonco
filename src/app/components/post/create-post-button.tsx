import { useAuth } from '@/app/contexts/AuthContext'
import { useOpenCreatePostModal } from '@/store/post-editor-modal'
import { PlusCircleIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function CreatePostButton() {
    const { user } = useAuth()
    const openCreatePostModal = useOpenCreatePostModal()

    const handleClick = () => {
        if (!user?.id) {
            toast.error('로그인이 필요합니다.', { position: 'top-center' })
            return
        }
        openCreatePostModal()
    }

    return (
        <div onClick={handleClick} className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4">
            <div className="flex items-center justify-between">
                <div>새로운 소식이 있나요?</div>
                <PlusCircleIcon className="h-5 w-5" />
            </div>
        </div>
    )
}
