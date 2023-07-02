import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

import { publicRoutes } from './routes'
import DefaultLayout from './components/layout/DefaultLayout'
import MessengerLayout from './components/layout/MessengerLayout'
import OnlyHeaderLayout from './components/layout/OnlyHeaderLayout'
import HeaderAndSideBarL from './components/layout/HeaderAndSideBarL'

const App = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [screenSize])
    return (
        <>
            {true ? (
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                let Layout: any = DefaultLayout
                                const Page = route.component
                                if (route.layout === null) {
                                    Layout = Fragment
                                } else if (route.layout === 'header') {
                                    Layout = OnlyHeaderLayout
                                } else if (route.layout === 'msg') {
                                    Layout = MessengerLayout
                                } else if (route.layout === 'headerandsidebarl') {
                                    Layout = HeaderAndSideBarL
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                )
                            })}
                        </Routes>
                    </div>
                </BrowserRouter>
            ) : (
                <h1>Website hiện chỉ dùng được trên pc, laptop</h1>
            )}
        </>
    )
}

export default App
