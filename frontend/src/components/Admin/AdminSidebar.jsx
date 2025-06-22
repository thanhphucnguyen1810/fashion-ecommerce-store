import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
  FaStar,
  FaCog,
  FaTags,
  FaWarehouse,
  FaBell
} from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme, alpha } from '@mui/material/styles'

// Menu items definition
const menuItems = [
  { to: '/admin/users', label: 'Users', icon: <FaUser /> },
  { to: '/admin/products', label: 'Products', icon: <FaBoxOpen /> },
  { to: '/admin/stock', label: 'Stock Manage', icon: <FaWarehouse /> },
  { to: '/admin/orders', label: 'Orders', icon: <FaClipboardList /> },
  { to: '/admin/reviews', label: 'Reviews', icon: <FaStar /> },
  { to: '/admin/coupons', label: 'Coupons', icon: <FaTags /> },
  { to: '/admin/notifications', label: 'Notifications', icon: <FaBell /> },
  { to: '/admin/settings', label: 'Settings', icon: <FaCog /> },
  { to: '/', label: 'Shop', icon: <FaStore /> }
]

const AdminSidebar = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const handleLogout = () => {
    // TODO: Add auth logic (clear token, etc.)
    navigate('/')
  }

  return (
    <aside
      className="p-6"
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        borderRight: `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Logo */}
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium" style={{ color: theme.palette.primary.main }}>
          Rabbit
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-xl font-medium mb-6 text-center" style={{ color: theme.palette.text.primary }}>
        Admin Dashboard
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => {
              const baseStyle = {
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isActive
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.secondary,
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : 'transparent',
                textDecoration: 'none'
              }

              const hoverStyle = {
                backgroundColor: !isActive
                  ? alpha(theme.palette.action.hover, 0.1)
                  : baseStyle.backgroundColor,
                color: !isActive ? theme.palette.text.primary : baseStyle.color
              }

              return {
                ...baseStyle,
                ':hover': hoverStyle
              }
            }}
            style={({ isActive }) => ({
              padding: '0.75rem 1rem',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: isActive
                ? theme.palette.primary.contrastText
                : theme.palette.text.secondary,
              backgroundColor: isActive
                ? theme.palette.primary.main
                : 'transparent',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              fontWeight: isActive ? 500 : 400
            })}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 rounded flex items-center justify-center gap-2"
          style={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = theme.palette.error.dark)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = theme.palette.error.main)
          }
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
