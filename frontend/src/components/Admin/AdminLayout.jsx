import { useState } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  const theme = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Top bar for mobile */}
      <header
        className="flex md:hidden p-4 z-20 items-center"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.1)}`
        }}
      >
        <button onClick={handleToggleSidebar} aria-label="Toggle sidebar">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </header>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 md:hidden"
          onClick={handleToggleSidebar}
          style={{ backgroundColor: alpha(theme.palette.common.black, 0.5) }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 min-h-screen absolute md:relative transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`
        }}
      >
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <div
        className="flex-grow p-6 overflow-hidden"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
