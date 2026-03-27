import ModalProvider from '@/provider/modal-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { AuthProvider } from '../contexts/AuthContext'
import { Header } from './Header'

const queryClient = new QueryClient()

export function Root() {
    useEffect(() => {
        const saved = localStorage.getItem('theme')
        const htmlTag = document.documentElement
        htmlTag.classList.remove('dark', 'light')

        if (!saved || saved === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            htmlTag.classList.add(isDark ? 'dark' : 'light')
        } else {
            htmlTag.classList.add(saved)
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ModalProvider>
                    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                        <Header />
                        <main className="container mx-auto px-4 py-8">
                            <Outlet />
                        </main>
                    </div>
                </ModalProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
