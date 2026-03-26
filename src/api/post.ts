import { supabase } from '@/app/lib/supabase'
import { uploadPostImages } from './post-images'

export async function fetchPosts() {
    const { data, error } = await supabase
        .from('post')
        .select(
            `
            *,
            post_images (image_url),
            post_likes (id, user_id),
            post_comments (id)
        `,
        )
        .order('created_at', { ascending: false })
    if (error) throw error
    return data
}

export async function createPost(postData: { title: string; content: string; user_id: string; images?: File[] }) {
    const { data, error } = await supabase
        .from('post')
        .insert({
            title: postData.title,
            content: postData.content,
            user_id: postData.user_id,
        })
        .select()
        .single()

    if (error) throw error

    if (postData.images && postData.images.length > 0) {
        await uploadPostImages(data.id, postData.user_id, postData.images)
    }

    return data
}

export async function updatePost(postData: { id: string; content: string }) {
    const { data, error } = await supabase
        .from('post')
        .update({
            content: postData.content,
            title: postData.content.slice(0, 20),
            updated_at: new Date().toISOString(),
        })
        .eq('id', postData.id)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deletePost(id: string) {
    const { error } = await supabase.from('post').delete().eq('id', id)

    if (error) throw error
}

export async function togglePostLike({ postId, userId }: { postId: string; userId: string }) {
    const { data, error } = await supabase.rpc('toggle_post_like', {
        p_post_id: postId,
        p_user_id: userId,
    })
    if (error) throw error
    return data
}
