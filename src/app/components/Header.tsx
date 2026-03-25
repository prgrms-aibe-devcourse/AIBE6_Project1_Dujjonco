import { Accessibility, LogIn, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Header() {
    const { user } = useAuth()

    return (
        <header className="bg-white shadow-sm border-b border-blue-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
                            <Accessibility className="size-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl text-gray-800">배리어플레이스</h1>
                            <p className="text-sm text-gray-600">모두를 위한 접근 가능한 공간</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/community"
                            className="flex items-center gap-2 px-4 py-2 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                            <MessageSquare className="size-5" />
                            <span>자유게시판</span>
                        </Link>

                        {user ? (
                            <Link
                                to="/mypage"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                            >
                                <User className="size-5" />
                                <span>{user.name}</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    <LogIn className="size-5" />
                                    <span>로그인</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                                >
                                    <User className="size-5" />
                                    <span>회원가입</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
