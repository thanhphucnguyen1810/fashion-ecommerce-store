import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }
  // const isMobile = true

  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
      {/* Top bar for mobile */}
      <header className="flex md:hidden p-4 bg-gray-900 text-white z-20 items-center">
        <button onClick={handleToggleSidebar} aria-label='Toggle sidebar' >
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </header>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={handleToggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
