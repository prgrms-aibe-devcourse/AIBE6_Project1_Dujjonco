import { createBrowserRouter } from 'react-router'
import { LoginWrapper as Login } from './components/auth/LoginWrapper'
import { RegisterWrapper as Register } from './components/auth/RegisterWrapper'
import { Root } from './components/common/Root'
import { NotFound } from './components/common/NotFound'
import { Home } from './components/home/Home'
import { FacilityDetail } from './components/place/FacilityDetail'
import { PostListPage } from './components/post/PostListPage'
import PostDetailPage from './components/post/PostDetailPage'
import { MyPage } from './components/user/MyPage'
import { ReviewPage } from './components/user/ReviewPage'
import { Bookmark } from './components/user/Bookmark'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: 'facility/:id', Component: FacilityDetail },
            { path: 'mypage', Component: MyPage },
            { path: 'community', Component: PostListPage },
            { path: 'post/:id', Component: PostDetailPage },
            { path: 'bookmark', Component: Bookmark },
            { path: 'reviews', Component: ReviewPage },
            { path: '*', Component: NotFound },
        ],
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
])
