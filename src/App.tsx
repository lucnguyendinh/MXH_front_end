import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'

import { publicRoutes } from './routes'
import DefaultLayout from './components/layout/DefaultLayout'
import MessengerLayout from './components/layout/MessengerLayout'
import OnlyHeaderLayout from './components/layout/OnlyHeaderLayout'
import HeaderAndSideBarL from './components/layout/HeaderAndSideBarL'

const App = () => {
    return (
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
    )
}

export default App
