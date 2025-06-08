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

  const handleLogout = () => {
    // TODO: Add auth logic (clear token, etc.)
    navigate('/')
  }

  return (
    <aside className="p-6">
      {/* Logo */}
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `py-3 px-4 rounded flex items-center space-x-2 ${
                isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
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
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
