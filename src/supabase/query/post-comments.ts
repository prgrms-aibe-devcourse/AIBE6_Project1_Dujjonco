import { supabase } from '../supabase'

export async function fetchComments(postId: string) {
    const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    if (error) throw error
    return data
}

export async function createComment({ postId, userId, content }: { postId: string; userId: string; content: string }) {
    const { data, error } = await supabase
        .from('post_comments')
        .insert({ post_id: postId, user_id: userId, content })
        .select()
        .single()

    if (error) throw error
    return data
}

export async function updateComment({ id, content }: { id: string; content: string }) {
    const { data, error } = await supabase
        .from('post_comments')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deleteComment(id: string) {
    const { error } = await supabase.from('post_comments').delete().eq('id', id)
    if (error) throw error
}
