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
import MessengerSkeleton from '../components/skeleton/Messenger'

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
    { path: '/test', component: MessengerSkeleton, layout: null },
    { path: '/notifications', component: Notifications, layout: 'header' },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/registerN', component: RegisterN, layout: null },
    { path: '/profile/:id', component: Personal, layout: 'header' },
    { path: '/status/:id', component: OnlyStatus, layout: 'header' },
    { path: '/friends', component: Friends, layout: 'headerandsidebarl' },
]

const privateRoutes: any[] = []

export { publicRoutes, privateRoutes }
