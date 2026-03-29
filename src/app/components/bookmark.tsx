import { fetchBookmarks } from '@/supabase/query/bookmark'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Bookmark() {
    const { user } = useAuth()

    const { data: bookmarks = [] } = useQuery({
        queryKey: ['bookmarks', user?.id ?? ''],
        queryFn: () => fetchBookmarks(user?.id ?? ''),
        enabled: !!user,
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold dark:text-white">저장한 장소</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bookmarks.length === 0 ? (
                    <p className="text-gray-400">저장한 장소가 없습니다.</p>
                ) : (
                    bookmarks.map((bookmark) => (
                        <Link key={bookmark.id} to={`/facility/${bookmark.place_id}`}>
                            <div className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
                                <img
                                    src={bookmark.places?.image_url ?? ''}
                                    alt={bookmark.places?.title ?? ''}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold dark:text-white">{bookmark.places?.title}</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {bookmark.places?.address}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
