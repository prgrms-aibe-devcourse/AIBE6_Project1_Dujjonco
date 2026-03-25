import { AuthProvider } from '../contexts/AuthContext'
import { Register } from './Register'

export function RegisterWrapper() {
    return (
        <AuthProvider>
            <Register />
        </AuthProvider>
    )
}
