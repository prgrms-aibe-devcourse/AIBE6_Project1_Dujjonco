import { supabase } from '../../supabase'

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export async function uploadPostImages(postId: string, userId: string, files: File[]) {
    const base64Images = await Promise.all(files.map(fileToBase64))

    const { error } = await supabase.from('post_images').insert({
        post_id: postId,
        user_id: userId,
        image_url: base64Images,
    })

    if (error) throw error
}
