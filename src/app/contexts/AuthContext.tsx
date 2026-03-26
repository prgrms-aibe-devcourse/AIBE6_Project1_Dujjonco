import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../services/auth'
import { authService } from '../services/auth'

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    register: (
        email: string,
        password: string,
        name: string,
        accessibilityType: string,
    ) => Promise<{ success: boolean; message: string }>
    logout: () => void
    updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const initUser = async () => {
            const currentUser = await authService.getCurrentUser()
            setUser(currentUser)
        }
        initUser()
    }, [])

    const login = async (email: string, password: string) => {
        const result = await authService.login(email, password)
        if (result.success && result.user) {
            setUser(result.user)
        }
        return result
    }

    const register = async (email: string, password: string, name: string, accessibilityType: string) => {
        const result = await authService.register(email, password, name, accessibilityType)
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
        const result = await authService.updateUser(updates)
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
