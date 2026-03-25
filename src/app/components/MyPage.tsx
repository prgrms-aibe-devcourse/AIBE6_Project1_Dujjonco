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

    const accessibilityTypes = ['일반', '지체장애', '시각장애', '청각장애', '발달장애', '기타']

    if (!user) {
        navigate('/login')
        return null
    }

    const handleSave = async () => {
        setError('')
        setMessage('')

        const result = await updateProfile({ name, accessibilityType })

        if (result.success) {
            setMessage(result.message)
            setIsEditing(false)
            setTimeout(() => setMessage(''), 3000)
        } else {
            setError(result.message)
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
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-full inline-block mb-4">
                        <User className="size-16 text-white" />
                    </div>
                    <h1 className="text-3xl mb-2">마이페이지</h1>
                    <p className="text-gray-600">프로필 정보를 관리하세요</p>
                </div>

                {/* Success Message */}
                {message && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                        {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl mb-1">프로필 정보</h2>
                                <p className="text-blue-100">회원님의 정보를 확인하세요</p>
                            </div>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                >
                                    <Edit2 className="size-4" />
                                    <span>수정</span>
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Save className="size-4" />
                                        <span>저장</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false)
                                            setName(user.name)
                                            setAccessibilityType(user.accessibilityType)
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        <X className="size-4" />
                                        <span>취소</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm mb-2 text-gray-700 flex items-center gap-2">
                                <User className="size-4 text-gray-500" />
                                이름
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.name}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm mb-2 text-gray-700 flex items-center gap-2">
                                <Mail className="size-4 text-gray-500" />
                                이메일
                            </label>
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-500">
                                {user.email}
                                <span className="text-xs ml-2">(변경 불가)</span>
                            </div>
                        </div>

                        {/* Accessibility Type */}
                        <div>
                            <label className="block text-sm mb-2 text-gray-700 flex items-center gap-2">
                                <Accessibility className="size-4 text-gray-500" />
                                접근성 유형
                            </label>
                            {isEditing ? (
                                <select
                                    value={accessibilityType}
                                    onChange={(e) => setAccessibilityType(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    {accessibilityTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-semibold">
                                    {user.accessibilityType}
                                </div>
                            )}
                        </div>

                        {/* Created At */}
                        <div>
                            <label className="block text-sm mb-2 text-gray-700 flex items-center gap-2">
                                <Calendar className="size-4 text-gray-500" />
                                가입일
                            </label>
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-500">
                                {formatDate(user.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <div className="text-3xl mb-2">0</div>
                        <div className="text-sm text-gray-600">작성한 리뷰</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <div className="text-3xl mb-2">0</div>
                        <div className="text-sm text-gray-600">저장한 장소</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <div className="text-3xl mb-2">0</div>
                        <div className="text-sm text-gray-600">도움이 된 리뷰</div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="size-5" />
                        <span>로그아웃</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
