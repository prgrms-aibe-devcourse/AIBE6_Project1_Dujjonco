import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '../services/auth'
import { authService } from '../services/auth'

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    register: (
        email: string,
        password: string,
        name: string,
        nickname: string,
        accessibilityType: string,
    ) => Promise<{ success: boolean; message: string }>
    logout: () => void
    updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // onAuthStateChange: 앱 시작(INITIAL_SESSION), 로그인, 로그아웃 등
        // 인증 상태가 바뀔 때마다 자동으로 실행됨
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // USER_UPDATED는 updateProfile에서 직접 setUser로 처리하므로 여기서는 건너뜀
            // 처리하면 auth lock 충돌로 무한 대기 발생
            if (event === 'USER_UPDATED') return

            if (session?.user) {
                // session.user에 user_metadata(name, nickname 등)가 포함되어 있어
                // 별도 서버 요청 없이 바로 User 타입으로 변환해서 상태 저장
                setUser(authService.mapUser(session.user))
            } else {
                // 세션 없음 = 로그아웃 상태
                setUser(null)
            }
        })

        // 컴포넌트 언마운트 시 구독 해제 (메모리 누수 방지)
        return () => subscription.unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        const result = await authService.login(email, password)
        if (result.success && result.user) {
            setUser(result.user)
        }
        return result
    }

    const register = async (
        email: string,
        password: string,
        name: string,
        nickname: string,
        accessibilityType: string,
    ) => {
        const result = await authService.register(email, password, name, nickname, accessibilityType)
        return result
    }

    const logout = async () => {
        await authService.logout()
        setUser(null)
    }

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) {
            return { success: false, message: '로그인이 필요합니다.' }
        }
        const result = await authService.updateUser(user.id, updates)
        if (result.success) {
            setUser({ ...user, ...updates })
        }
        return result
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
