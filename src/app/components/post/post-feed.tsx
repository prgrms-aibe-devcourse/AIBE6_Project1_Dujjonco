import { usePostsData } from '@/hooks/queries/use-posts-data'
import Fallback from '../common/ErrorFallback'
import Loader from '../common/LoadingSpinner'
import PostItem from './post-item'

export default function PostFeed() {
    const { data, error, isPending } = usePostsData()

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
