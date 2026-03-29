import { Accessibility, LogIn, LogOut, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import ThemeButton from './header/theme-button'

export function Header() {
    const { user, logout } = useAuth()

    return (
        <header className="border-b border-blue-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-2">
                            <Accessibility className="size-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl text-gray-800 dark:text-white">FreeWay</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">모두를 위한 접근 가능한 공간</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeButton />
                        <Link
                            to="/community"
                            className="flex items-center gap-2 rounded-lg border-2 border-purple-500 px-4 py-2 text-purple-600 transition-colors hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                        >
                            <MessageSquare className="size-5" />
                            <span>자유게시판</span>
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/mypage"
                                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white transition-all hover:from-blue-600 hover:to-indigo-700"
                                >
                                    <User className="size-5" />
                                    <span>{user.name}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-gray-500 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    <LogOut className="size-5" />
                                    <span>로그아웃</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 rounded-lg border-2 border-blue-500 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
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
