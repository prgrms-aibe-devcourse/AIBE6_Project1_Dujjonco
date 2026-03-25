import { Accessibility } from 'lucide-react'
import { Link } from 'react-router'

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <Accessibility className="size-24 text-gray-300 mb-6" />
            <h1 className="text-4xl mb-3">404</h1>
            <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
            <Link
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
                홈으로 돌아가기
            </Link>
        </div>
    )
}
