import { useUserPostsData } from '@/hooks/queries/use-user-posts-data'
import { usePostsData } from '@/hooks/queries/use-posts-data'
import Fallback from '../common/ErrorFallback'
import Loader from '../common/LoadingSpinner'
import PostItem from './post-item'

export default function PostFeed({ userId }: { userId?: string }) {
    const allPosts = usePostsData()
    const userPosts = useUserPostsData(userId ?? '')

    // userId가 있으면 내 게시글만, 없으면 전체 게시글 표시
    const { data, error, isPending } = userId ? userPosts : allPosts

    if (error) return <Fallback />
    if (isPending) return <Loader />

    return (
        <div className="flex flex-col gap-10">
            {data.map((post) => (
                <PostItem key={post.id} {...post} />
            ))}
        </div>
    )
}
