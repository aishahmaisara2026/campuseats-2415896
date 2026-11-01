import { Outlet } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
    return (
        <div className = "app-layout">
            <Header />
            <main className="container">
            <Outlet />
            </main>
            <Footer />
        </div>
    )
}