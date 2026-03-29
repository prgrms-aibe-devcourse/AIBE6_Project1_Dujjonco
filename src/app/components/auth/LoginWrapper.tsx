import { AuthProvider } from '../../contexts/AuthContext'
import { Login } from './Login'

export function LoginWrapper() {
    return (
        <AuthProvider>
            <Login />
        </AuthProvider>
    )
}
