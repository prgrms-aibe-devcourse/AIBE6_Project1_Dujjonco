import CreatePostButton from './create-post-button'
import PostFeed from './post-feed'

export function PostListPage() {
    return (
        <div className="flex flex-col gap-10">
            <CreatePostButton />
            <PostFeed />
        </div>
    )
}
