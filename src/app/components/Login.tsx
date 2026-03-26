import { Accessibility, Lock, Mail } from 'lucide-react'
import type { SubmitEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(email, password)

        if (result.success) {
            navigate('/')
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-block">
                        <div className="mb-4 inline-block rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
                            <Accessibility className="size-12 text-white" />
                        </div>
                    </Link>
                    <h1 className="mb-2 text-3xl">배리어플레이스</h1>
                    <p className="text-gray-600">모두를 위한 접근 가능한 공간</p>
                </div>

                {/* Login Form */}
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    <h2 className="mb-6 text-center text-2xl">로그인</h2>

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-gray-700">이메일</label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-700">비밀번호</label>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-white transition-all hover:from-blue-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            계정이 없으신가요?{' '}
                            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                                회원가입
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Account Info */}
                <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-center text-sm text-blue-800">💡 테스트 계정: test@example.com / password123</p>
                </div>
            </div>
        </div>
    )
}
