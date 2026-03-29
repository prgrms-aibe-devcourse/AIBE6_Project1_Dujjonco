import { createBrowserRouter } from 'react-router'
import { Bookmark } from './components/bookmark'
import { FacilityDetail } from './components/FacilityDetail'
import { Home } from './components/Home'
import { LoginWrapper as Login } from './components/LoginWrapper'
import { MyPage } from './components/MyPage'
import { NotFound } from './components/NotFound'
import { Community } from './components/post/Community'
import PostDetailPage from './components/post/PostDetailPage'
import { RegisterWrapper as Register } from './components/RegisterWrapper'
import { ReviewPage } from './components/ReviewPage'
import { Root } from './components/Root'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: 'facility/:id', Component: FacilityDetail },
            { path: 'mypage', Component: MyPage },
            { path: 'community', Component: Community },
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
