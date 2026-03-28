'use client'

import { useUserNickname } from '@/hooks/queries/use-user-nickname'

interface UserNicknameProps {
    userId: string
    fallback?: string
    className?: string
}

// 전역 유저 닉네임을 조회하여 표시하는 컴포넌트
export default function UserNickname({ userId, fallback = '사용자', className }: UserNicknameProps) {
    const { data: nickname, isLoading } = useUserNickname(userId)

    // 로딩 중이거나 데이터가 없을 경우 기본 표시 형식 제공
    if (isLoading) {
        return (
            <span className={className}>
                {fallback} {userId.slice(0, 4)}
            </span>
        )
    }

    return (
        <span className={className}>
            {nickname && nickname !== '알 수 없음' ? nickname : `${fallback} ${userId.slice(0, 4)}`}
        </span>
    )
}
