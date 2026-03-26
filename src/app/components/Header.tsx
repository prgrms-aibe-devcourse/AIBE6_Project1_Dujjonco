import { Accessibility, LogIn, MessageSquare, SunIcon, User } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Header() {
    const { user } = useAuth()

    return (
        <header className="border-b border-blue-100 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-2">
                            <Accessibility className="size-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl text-gray-800">배리어플레이스</h1>
                            <p className="text-sm text-gray-600">모두를 위한 접근 가능한 공간</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
                            <SunIcon />
                        </div>
                        <Link
                            to="/community"
                            className="flex items-center gap-2 rounded-lg border-2 border-purple-500 px-4 py-2 text-purple-600 transition-colors hover:bg-purple-50"
                        >
                            <MessageSquare className="size-5" />
                            <span>자유게시판</span>
                        </Link>

                        {user ? (
                            <Link
                                to="/mypage"
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white transition-all hover:from-blue-600 hover:to-indigo-700"
                            >
                                <User className="size-5" />
                                <span>{user.name}</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 rounded-lg border-2 border-blue-500 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50"
                                >
                                    <LogIn className="size-5" />
                                    <span>로그인</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white transition-all hover:from-blue-600 hover:to-indigo-700"
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
