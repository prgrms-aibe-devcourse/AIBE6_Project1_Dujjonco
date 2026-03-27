import { supabase } from '../../supabase/supabase'

export async function getUserNickname(userId: string): Promise<string> {
    const { data, error } = await (supabase as any).rpc('get_user_nickname', {
        p_user_id: userId,
    })
    if (error) return '알 수 없음'
    return data ?? '알 수 없음'
}