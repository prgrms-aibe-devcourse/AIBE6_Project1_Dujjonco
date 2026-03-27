import { useAuth } from '@/app/contexts/AuthContext'
import { Button } from '@/app/ui2/button2'
import { Carousel, CarouselContent, CarouselItem } from '@/app/ui2/carousel2'
import { Dialog, DialogContent, DialogTitle } from '@/app/ui2/dialog2'
import { useCreatePost } from '@/hooks/mutations/post/use-create-post'
import { useUpdatePost } from '@/hooks/mutations/post/use-update-post'
import { usePostEditorModal } from '@/store/post-editor-modal'
import { ImageIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { toast } from 'sonner'

type Image = {
    file: File
    previewUrl: string
}

export default function PostEditorModal() {
    const { user } = useAuth()
    const postEditorModal = usePostEditorModal()

    const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
        onSuccess: () => {
            postEditorModal.actions.close()
        },
        onError: (_error) => {
            toast.error('게시물 등록에 실패하였습니다.', { position: 'top-center' })
        },
    })

    const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
        onSuccess: () => {
            postEditorModal.actions.close()
        },
        onError: (_error) => {
            toast.error('포스트 수정에 실패했습니다.', { position: 'top-center' })
        },
    })

    const [content, setContent] = useState('')
    const [images, setImages] = useState<Image[]>([])

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleCloseModal = () => {
        postEditorModal.actions.close()
    }

    const handleSavePostClick = () => {
        if (content.trim() === '') return
        if (!user?.id) {
            toast.error('로그인이 필요합니다.', { position: 'top-center' })
            return
        }
        if (!postEditorModal.isOpen) return

        if (postEditorModal.type === 'CREATE') {
            createPost({
                title: content.slice(0, 20),
                content: content,
                user_id: user.id,
                images: images.map((img) => img.file),
            })
        } else {
            if (content === postEditorModal.content) return
            updatePost({
                id: postEditorModal.postId,
                content: content,
            })
        }
    }

    const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            files.forEach((file) => {
                setImages((prev) => [...prev, { file, previewUrl: URL.createObjectURL(file) }])
            })
        }
        e.target.value = ''
    }

    const handleDeleteImage = (image: Image) => {
        setImages((prevImages) => prevImages.filter((item) => item.previewUrl !== image.previewUrl))
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [content])

    useEffect(() => {
        if (!postEditorModal.isOpen) return
        if (postEditorModal.type === 'CREATE') {
            setContent('')
            setImages([])
        } else {
            setContent(postEditorModal.content)
            setImages([])
        }
        textareaRef.current?.focus()
    }, [postEditorModal.isOpen])

    const isPending = isCreatePostPending || isUpdatePostPending

    return (
        <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="max-h-[90vh]">
                <DialogTitle>
                    {postEditorModal.isOpen && postEditorModal.type === 'EDIT' ? '포스트 수정' : '포스트 작성'}
                </DialogTitle>
                <textarea
                    disabled={isPending}
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="max-h-125 min-h-25 focus:outline-none"
                    placeholder="새로운 소식이 있나요?"
                />
                <input
                    onChange={handleSelectImages}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                />
                {postEditorModal.isOpen && postEditorModal.type === 'EDIT' && (
                    <Carousel>
                        <CarouselContent>
                            {postEditorModal.imageUrls?.map((url) => (
                                <CarouselItem className="basis-2/5" key={url}>
                                    <div className="relative">
                                        <img src={url} className="h-full w-full rounded-sm object-cover" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
                {images.length > 0 && (
                    <Carousel>
                        <CarouselContent>
                            {images.map((image) => (
                                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                                    <div className="relative">
                                        <img src={image.previewUrl} className="h-full w-full rounded-sm object-cover" />
                                        <div
                                            onClick={() => handleDeleteImage(image)}
                                            className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                                        >
                                            <XIcon className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
                {postEditorModal.isOpen && postEditorModal.type === 'CREATE' && (
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isPending}
                        variant={'outline'}
                        className="cursor-pointer"
                    >
                        <ImageIcon />
                        이미지 추가
                    </Button>
                )}
                <Button disabled={isPending} onClick={handleSavePostClick} className="cursor-pointer">
                    저장
                </Button>
            </DialogContent>
        </Dialog>
    )
}
