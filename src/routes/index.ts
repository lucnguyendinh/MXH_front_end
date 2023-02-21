import React from 'react'
import Home from '../components/page/Home'
import Messenger from '../components/page/Messenger'
import Notifications from '../components/page/Notifications'
import Login from '../components/page/Login'
import Register from '../components/page/Register'
import RegisterN from '../components/page/RegisterN'

interface Public {
    path: string
    component: React.FC
    stt?: number
    layout?: any
}

const publicRoutes: Public[] = [
    { path: '/', component: Home },
    { path: '/messenger', component: Messenger, layout: 'msg' },
    { path: '/notifications', component: Notifications },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/registerN', component: RegisterN, layout: null },
]

const privateRoutes: any[] = []

export { publicRoutes, privateRoutes }
