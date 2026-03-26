import { type Database } from '@/database.types'

export type PostEntity = Database['public']['Tables']['post']['Row']
export type PostImageEntity = Database['public']['Tables']['post_images']['Row']
export type PostLikeEntity = Database['public']['Tables']['post_likes']['Row']
export type PostCommentEntity = Database['public']['Tables']['post_comments']['Row']

export type Post = PostEntity & {
    post_images: Pick<PostImageEntity, 'image_url'>[]
    post_likes: Pick<PostLikeEntity, 'id' | 'user_id'>[]
    post_comments: Pick<PostCommentEntity, 'id'>[]
}

export type UseMutationCallback = {
    onSuccess?: () => void
    onError?: (error: Error) => void
    onMutate?: () => void
    onSettled?: () => void
}
