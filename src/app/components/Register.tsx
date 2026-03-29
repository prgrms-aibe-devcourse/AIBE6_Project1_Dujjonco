import { Accessibility, Lock, Mail, User } from 'lucide-react'
import type { SubmitEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [nickname, setNickname] = useState('')
    const [accessibilityType, setAccessibilityType] = useState('일반')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const accessibilityTypes = ['일반', '지체장애', '시각장애', '청각장애', '발달장애', '기타']

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
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

        const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/
        if (!nicknameRegex.test(nickname)) {
            setError('닉네임은 한글, 숫자, 영문 혼합 10자이내로 입력해주세요.')
            return
        }

        setLoading(true)

        const result = await register(email, password, name, nickname, accessibilityType)

        if (result.success) {
            navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } })
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 dark:bg-gray-900 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-block">
                        <div className="mb-4 inline-block rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
                            <Accessibility className="size-12 text-white" />
                        </div>
                    </Link>
                    <h1 className="mb-2 text-3xl dark:text-white">배리어플레이스</h1>
                    <p className="text-gray-600 dark:text-gray-400">모두를 위한 접근 가능한 공간</p>
                </div>

                {/* Register Form */}
                <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
                    <h2 className="mb-6 text-center text-2xl dark:text-white">회원가입</h2>

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-gray-700 dark:text-gray-400">이름</label>
                            <div className="relative">
                                <User className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                    placeholder="홍길동"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-700 dark:text-gray-400">닉네임</label>
                            <div className="relative">
                                <User className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                    placeholder="한글 2~8자 또는 영문/숫자 2~14자"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-700 dark:text-gray-400">이메일</label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-700 dark:text-gray-400">비밀번호</label>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                    placeholder="최소 6자 이상"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-700 dark:text-gray-400">비밀번호 확인</label>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                    placeholder="비밀번호 재입력"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-700 dark:text-gray-400">접근성 유형</label>
                            <div className="relative">
                                <Accessibility className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={accessibilityType}
                                    onChange={(e) => setAccessibilityType(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-11 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                                    required
                                >
                                    {accessibilityTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">맞춤형 추천을 위해 선택해주세요 (선택사항)</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-white transition-all hover:from-blue-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? '가입 중...' : '회원가입'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            이미 계정이 있으신가요?{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                                로그인
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
