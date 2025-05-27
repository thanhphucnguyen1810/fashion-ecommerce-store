import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'
import Home from '~/pages/Home'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main>

        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default UserLayout
