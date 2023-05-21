import React from 'react'
import Home from '../components/page/Home'
import Messenger from '../components/page/Messenger'
import Notifications from '../components/page/Notifications'
import Login from '../components/page/Login'
import Register from '../components/page/Register'
import RegisterN from '../components/page/RegisterN'
import Personal from '../components/page/Personal'

interface Public {
    path: string
    component: React.FC
    stt?: number
    layout?: any
}

const publicRoutes: Public[] = [
    { path: '/', component: Home },
    { path: '/messenger', component: Messenger, layout: 'msg' },
    { path: '/notifications', component: Notifications, layout: 'header' },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/registerN', component: RegisterN, layout: null },
    { path: '/profile/:id', component: Personal, layout: 'header' },
]

const privateRoutes: any[] = []

export { publicRoutes, privateRoutes }
