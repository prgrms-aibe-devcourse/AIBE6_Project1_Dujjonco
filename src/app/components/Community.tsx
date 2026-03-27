import CreatePostButton from './post/create-post-button'
import PostFeed from './post/post-feed'

export function Community() {
    return (
        <div className="flex flex-col gap-10">
            <CreatePostButton />
            <PostFeed />
        </div>
    )
}
