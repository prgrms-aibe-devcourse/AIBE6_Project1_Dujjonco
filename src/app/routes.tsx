import { createBrowserRouter } from 'react-router'
import { Community } from './components/Community'
import { FacilityDetail } from './components/FacilityDetail'
import { Home } from './components/Home'
import { LoginWrapper as Login } from './components/LoginWrapper'
import { MyPage } from './components/MyPage'
import { NotFound } from './components/NotFound'
import PostDetailPage from './components/PostDetailPage'
import { RegisterWrapper as Register } from './components/RegisterWrapper'
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
