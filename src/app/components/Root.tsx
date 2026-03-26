import ModalProvider from '@/provider/modal-provider'
import { Outlet } from 'react-router'
import { AuthProvider } from '../contexts/AuthContext'
import { Header } from './Header'

export function Root() {
    return (
        <AuthProvider>
            <ModalProvider>
                <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                    <Header />
                    <main className="container mx-auto px-4 py-8">
                        <Outlet />
                    </main>
                </div>
            </ModalProvider>
        </AuthProvider>
    )
}
