import { useAuth } from '@/app/contexts/AuthContext'
import { Carousel, CarouselContent, CarouselItem } from '@/app/ui2/carousel2'
import { formatTimeAgo } from '@/app/util/time'
import defaultAvatar from '@/assets/default-avatar.png'
import { useUserNickname } from '@/hooks/queries/use-user-nickname'
import type { Post } from '@/types'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router'
import DeletePostButton from './delete-post-button'
import EditPostButton from './edit-post-button'
import LikePostButton from './like-post-button'

export default function PostItem(post: Post & { isDetail?: boolean }) {
    const { user } = useAuth()
    const { data: nickname } = useUserNickname(post.user_id) // ✅ 추가
    console.log('post.user_id:', post.user_id) // ✅ 여기에 추가
    console.log('nickname:', nickname) // ✅ 여기에 추가
    const isLiked = post.post_likes.some((like) => like.user_id === user?.id)

    return (
        <div className={`flex flex-col gap-4 pb-8 ${!post.isDetail && 'border-b'}`}>
            {/* 1. 유저 정보, 수정/삭제 버튼 */}
            <div className="flex justify-between">
                {/* 1-1. 유저 정보 */}
                <div className="flex items-start gap-4">
                    <img
                        src={defaultAvatar}
                        alt={`${nickname}의 프로필 이미지`}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold hover:underline">{nickname ?? '알 수 없음'}</div> {/* ✅ 수정 */}
                        <div className="text-muted-foreground text-sm">
                            {post.created_at ? formatTimeAgo(post.created_at) : ''}
                        </div>
                    </div>
                </div>

                {/* 1-2. 수정/삭제 버튼 */}
                {post.user_id === user?.id && (
                    <div className="text-muted-foreground flex text-sm">
                        <EditPostButton post={post} />
                        <DeletePostButton id={post.id} />
                    </div>
                )}
            </div>

            {/* 2. 컨텐츠, 이미지 캐러셀 */}
            <div className="flex cursor-pointer flex-col gap-5">
                {/* 2-1. 컨텐츠 */}
                <Link to={`/post/${post.id}`}>
                    <div className={`break-words whitespace-pre-wrap ${post.isDetail ? '' : 'line-clamp-2'}`}>
                        {post.content}
                    </div>
                </Link>
                {/* 2-2. 이미지 캐러셀 */}
                <Carousel>
                    <CarouselContent>
                        {post.post_images.map((image, index) =>
                            image.image_url?.map((url, urlIndex) => (
                                <CarouselItem className="basis-3/5" key={`${index}-${urlIndex}`}>
                                    <div className="overflow-hidden rounded-xl">
                                        <img src={url} className="h-full max-h-[350px] w-full object-cover" />
                                    </div>
                                </CarouselItem>
                            )),
                        )}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* 3. 좋아요, 댓글 버튼 */}
            <div className="flex gap-2">
                {/* 3-1. 좋아요 버튼 */}
                <LikePostButton id={post.id} likeCount={post.post_likes.length} isLiked={isLiked} />{' '}
                {/* 3-2. 댓글 버튼 */}
                {!post.isDetail && (
                    <Link to={`/post/${post.id}`}>
                        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
                            <MessageCircle className="h-4 w-4" />
                            <span>댓글 달기</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}
