import React from 'react'
import Home from '../components/page/Home'
import Messenger from '../components/page/Messenger'
import Notifications from '../components/page/Notifications'
import Login from '../components/page/Login'
import Register from '../components/page/Register'
import RegisterN from '../components/page/RegisterN'
import Personal from '../components/page/Personal'
import OnlyStatus from '../components/page/OnlyStatus'
import Friends from '../components/page/Friends'
import Watch from '../components/page/Watch'
import NewFeed from '../components/page/NewFeed'
import StatusByAlbum from '../components/page/StatusByAlbum'

interface Public {
    path: string
    component: React.FC
    stt?: number
    layout?: any
}

const publicRoutes: Public[] = [
    { path: '/', component: Home },
    { path: '/messenger/:id', component: Messenger, layout: 'msg' },
    { path: '/messenger', component: Messenger, layout: 'msg' },
    { path: '/notifications', component: Notifications, layout: 'header' },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/registerN', component: RegisterN, layout: null },
    { path: '/profile/:id', component: Personal, layout: 'header' },
    { path: '/status/:id', component: OnlyStatus, layout: 'header' },
    { path: '/statusByAlbum/:id', component: StatusByAlbum, layout: 'header' },
    { path: '/friends', component: Friends, layout: 'headerandsidebarl' },
    { path: '/watch', component: Watch, layout: 'headerandsidebarl' },
    { path: '/newfeed', component: NewFeed, layout: 'headerandsidebarl' },
]

const privateRoutes: any[] = []

export { publicRoutes, privateRoutes }
