import { useSearchParams } from 'react-router'
import CreatePostButton from './create-post-button'
import PostFeed from './post-feed'

export function PostListPage() {
    // 마이페이지에서 ?userId=... 파라미터로 진입 시 해당 유저의 게시글만 표시
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId') ?? undefined

    return (
        <div className="flex flex-col gap-10">
            <CreatePostButton />
            <PostFeed userId={userId} />
        </div>
    )
}
