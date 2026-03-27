import { getUserNickname } from '@/app/services/user'
import { useQuery } from '@tanstack/react-query'

export function useUserNickname(userId: string) {
    return useQuery({
        queryKey: ['nickname', userId],
        queryFn: () => getUserNickname(userId),
        enabled: !!userId,
    })
}
