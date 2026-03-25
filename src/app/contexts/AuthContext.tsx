import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
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
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
    }, [])

    const login = async (email: string, password: string) => {
        const result = authService.login(email, password)
        if (result.success && result.user) {
            setUser(result.user)
        }
        return result
    }

    const register = async (email: string, password: string, name: string, accessibilityType: string) => {
        const result = authService.register(email, password, name, accessibilityType)
        return result
    }

    const logout = () => {
        authService.logout()
        setUser(null)
    }

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) {
            return { success: false, message: '로그인이 필요합니다.' }
        }
        const result = authService.updateUser(user.id, updates)
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
