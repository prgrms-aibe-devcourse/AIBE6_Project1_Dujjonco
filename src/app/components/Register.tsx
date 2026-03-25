import { Accessibility, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [accessibilityType, setAccessibilityType] = useState('일반')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const accessibilityTypes = ['일반', '지체장애', '시각장애', '청각장애', '발달장애', '기타']

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.')
            return
        }

        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.')
            return
        }

        setLoading(true)

        const result = await register(email, password, name, accessibilityType)

        if (result.success) {
            navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } })
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl inline-block mb-4">
                            <Accessibility className="size-12 text-white" />
                        </div>
                    </Link>
                    <h1 className="text-3xl mb-2">배리어플레이스</h1>
                    <p className="text-gray-600">모두를 위한 접근 가능한 공간</p>
                </div>

                {/* Register Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl mb-6 text-center">회원가입</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm mb-2 text-gray-700">이름</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="홍길동"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-gray-700">이메일</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-gray-700">비밀번호</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="최소 6자 이상"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-gray-700">비밀번호 확인</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="비밀번호 재입력"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-gray-700">접근성 유형</label>
                            <div className="relative">
                                <Accessibility className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <select
                                    value={accessibilityType}
                                    onChange={(e) => setAccessibilityType(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    required
                                >
                                    {accessibilityTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">맞춤형 추천을 위해 선택해주세요 (선택사항)</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '가입 중...' : '회원가입'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            이미 계정이 있으신가요?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                로그인
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
