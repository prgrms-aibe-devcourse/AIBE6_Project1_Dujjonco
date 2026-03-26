import { Accessibility, Calendar, Edit2, LogOut, Mail, Save, User, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function MyPage() {
    const { user, logout, updateProfile } = useAuth()
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user?.name || '')
    const [accessibilityType, setAccessibilityType] = useState(user?.accessibilityType || '일반')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [nickname, setNickname] = useState(user?.nickname || '')

    const accessibilityTypes = ['일반', '지체장애', '시각장애', '청각장애', '발달장애', '기타']

    if (!user) {
        navigate('/login')
        return null
    }

    const handleSave = async () => {
        setError('')
        setMessage('')
        //예외발생
        try {
            const result = await updateProfile({ name, nickname, accessibilityType })

            if (result.success) {
                setMessage(result.message)
                setIsEditing(false)
                setTimeout(() => setMessage(''), 3000)
            } else {
                setError(result.message)
            }
        } catch (err) {
            console.error(err)
            setError('저장 중 오류가 발생했습니다.')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-block rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
                        <User className="size-16 text-white" />
                    </div>
                    <h1 className="mb-2 text-3xl">마이페이지</h1>
                    <p className="text-gray-600">프로필 정보를 관리하세요</p>
                </div>

                {/* Success Message */}
                {message && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                        {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                        {error}
                    </div>
                )}

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="mb-1 text-2xl">프로필 정보</h2>
                                <p className="text-blue-100">회원님의 정보를 확인하세요</p>
                            </div>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
                                >
                                    <Edit2 className="size-4" />
                                    <span>수정</span>
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50"
                                    >
                                        <Save className="size-4" />
                                        <span>저장</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false)
                                            setName(user.name)
                                            setNickname(user.nickname)
                                            setAccessibilityType(user.accessibilityType)
                                        }}
                                        className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
                                    >
                                        <X className="size-4" />
                                        <span>취소</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 p-8">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block flex items-center gap-2 text-sm text-gray-700">
                                <User className="size-4 text-gray-500" />
                                이름
                            </label>
                            <div className="rounded-lg bg-gray-50 px-4 py-3">{user.name}</div>
                        </div>
                        {/* Nickname */}
                        <div>
                            <label className="mb-2 block flex items-center gap-2 text-sm text-gray-700">
                                <User className="size-4 text-gray-500" />
                                닉네임
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="한글 2~8자 또는 영문/숫자 2~14자"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <div className="rounded-lg bg-gray-50 px-4 py-3">{user.nickname}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block flex items-center gap-2 text-sm text-gray-700">
                                <Mail className="size-4 text-gray-500" />
                                이메일
                            </label>
                            <div className="rounded-lg bg-gray-50 px-4 py-3 text-gray-500">
                                {user.email}
                                <span className="ml-2 text-xs">(변경 불가)</span>
                            </div>
                        </div>

                        {/* Accessibility Type */}
                        <div>
                            <label className="mb-2 block flex items-center gap-2 text-sm text-gray-700">
                                <Accessibility className="size-4 text-gray-500" />
                                접근성 유형
                            </label>
                            {isEditing ? (
                                <select
                                    value={accessibilityType}
                                    onChange={(e) => setAccessibilityType(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    {accessibilityTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="rounded-lg bg-blue-50 px-4 py-3 font-semibold text-blue-700">
                                    {user.accessibilityType}
                                </div>
                            )}
                        </div>

                        {/* Created At */}
                        <div>
                            <label className="mb-2 block flex items-center gap-2 text-sm text-gray-700">
                                <Calendar className="size-4 text-gray-500" />
                                가입일
                            </label>
                            <div className="rounded-lg bg-gray-50 px-4 py-3 text-gray-500">
                                {formatDate(user.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-6 text-center shadow">
                        <div className="mb-2 text-3xl">0</div>
                        <div className="text-sm text-gray-600">작성한 리뷰</div>
                    </div>
                    <div className="rounded-xl bg-white p-6 text-center shadow">
                        <div className="mb-2 text-3xl">0</div>
                        <div className="text-sm text-gray-600">저장한 장소</div>
                    </div>
                    <div className="rounded-xl bg-white p-6 text-center shadow">
                        <div className="mb-2 text-3xl">0</div>
                        <div className="text-sm text-gray-600">도움이 된 리뷰</div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-red-200 px-6 py-3 text-red-600 transition-colors hover:bg-red-50"
                    >
                        <LogOut className="size-5" />
                        <span>로그아웃</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
