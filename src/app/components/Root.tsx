import ModalProvider from '@/provider/modal-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router'
import { AuthProvider } from '../contexts/AuthContext'
import { Header } from './Header'

const queryClient = new QueryClient()
export function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ModalProvider>
                    <div className="bg-liner-to-b min-h-screen from-blue-50 to-white">
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
