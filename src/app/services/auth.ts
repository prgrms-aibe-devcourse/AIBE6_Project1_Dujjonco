import { supabase } from '../lib/supabase'

export interface User {
    id: string
    email: string
    name: string
    accessibilityType: string
    createdAt: string
}

class AuthService {
    async register(
        email: string,
        password: string,
        name: string,
        accessibilityType: string,
    ): Promise<{ success: boolean; message: string }> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, accessibilityType },
            },
        })

        if (error) {
            if (error.message.includes('already registered')) {
                return { success: false, message: '이미 등록된 이메일입니다.' }
            }
            return { success: false, message: error.message }
        }

        if (data.user && !data.session) {
            return { success: true, message: '이메일 인증 후 로그인해주세요.' }
        }

        return { success: true, message: '회원가입이 완료되었습니다.' }
    }

    async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
        }

        const user = this.mapSupabaseUser(data.user)
        return { success: true, message: '로그인되었습니다.', user }
    }

    async logout(): Promise<void> {
        await supabase.auth.signOut()
    }

    async getCurrentUser(): Promise<User | null> {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        return user ? this.mapSupabaseUser(user) : null
    }

    async updateUser(_userId: string, updates: Partial<User>): Promise<{ success: boolean; message: string }> {
        const { error } = await supabase.auth.updateUser({
            data: {
                name: updates.name,
                accessibilityType: updates.accessibilityType,
            },
        })

        if (error) {
            return { success: false, message: error.message }
        }

        return { success: true, message: '프로필이 업데이트되었습니다.' }
    }

    private mapSupabaseUser(user: {
        id: string
        email?: string
        user_metadata?: Record<string, string>
        created_at?: string
    }): User {
        return {
            id: user.id,
            email: user.email ?? '',
            name: user.user_metadata?.name ?? '',
            accessibilityType: user.user_metadata?.accessibilityType ?? '일반',
            createdAt: user.created_at ?? new Date().toISOString(),
        }
    }
}

export const authService = new AuthService()
