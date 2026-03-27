import { usePostData } from '@/hooks/queries/use-post-data'
import { Navigate, useParams } from 'react-router'
import CommentEditor from './comment/comment-editor'
import CommentList from './comment/comment-list'
import Fallback from './fallback'
import Loader from './loader'
import PostItem from './post/post-item'

export default function PostDetailPage() {
    const { id } = useParams()

    if (!id) return <Navigate to="/" />

    const { data: post, isPending, error } = usePostData(id)

    if (isPending) return <Loader />
    if (error || !post) return <Fallback />

    return (
        <div className="flex flex-col gap-8">
            <PostItem {...post} isDetail={true} />
            <CommentEditor postId={id} />
            <CommentList postId={id} />
        </div>
    )
}
