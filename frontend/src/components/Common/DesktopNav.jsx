import { useState, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'

const NavItem = ({ nav, isOpen, onMouseEnter, onMouseLeave, onClose, primaryColor, secondaryColor }) => {
  // Kiểm tra xem mục này có submenu không
  const hasSubmenu = Array.isArray(nav.submenu)

  return (
    <div
      className="relative"
      onMouseEnter={() => onMouseEnter(nav.label)}
      onMouseLeave={onMouseLeave}
    >
      {/* Hiển thị tên Menu, nếu có submenu thì hiển thị ChevronDown */}
      <Link
        to={nav.path || '#'}
        className="text-sm font-Poppins uppercase flex items-center space-x-1 transition-colors duration-200"
        style={{ color: isOpen ? secondaryColor : primaryColor }}
        aria-haspopup={hasSubmenu}
        aria-expanded={isOpen}
      >
        <span>{nav.label}</span>
        {hasSubmenu && (
          <FaChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </Link>

      {/* Hiển thị submenu con */}
      {hasSubmenu && (
        <div
          className={`absolute left-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-200 z-10 transform transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {nav.submenu.map((sub) => (
            <Link
              key={sub.label}
              to={sub.path}
              className="block px-5 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded transition-all duration-200"
              onClick={onClose}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const DesktopNav = () => {
  const [openMenu, setOpenMenu] = useState(null)
  const timeoutRef = useRef(null)

  const theme = useTheme()
  const primaryColor = theme.palette.primary.main
  const secondaryColor = theme.palette.primary.dark

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals', path: '/collections/new' },
    { label: 'Men', path: '/collections/men' },
    { label: 'Women', path: '/collections/women' },
    { label: 'Accessories', path: '/collections/accessories' },
    { label: 'Sale', path: '/collections/sale' },
    { label: 'Contact', path: '/contact' }
  ]

  // Khi chuột vào menu, nó mở submenu = setOpenMenu(label)
  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current)
    setOpenMenu(label)
  }

  // Khi chuột rời khỏi, sau 200 ms, submenu sẽ ẩn.
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 200)
  }

  return (
    <div className="hidden md:flex space-x-6">
      {navLinks.map((nav) => (
        <NavItem
          key={nav.label}
          nav={nav}
          isOpen={openMenu === nav.label}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClose={() => setOpenMenu(null)}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </div>
  )
}

export default DesktopNav
