import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight
} from 'react-icons/hi2'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@mui/material/styles'

import SearchBar from './SearchBar'
import CartDrawer from '~/components/Layouts/CartDrawer'
import MobileDrawer from '~/components/Common/MobileDrawer'
import useSettings from '~/hooks/useSettings'
import DesktopNav from './DesktopNav'

const Navbar = () => {

  const theme = useTheme()
  const { onToggleMode } = useSettings()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navDrawerOpen, setNavDrawerOpen] = useState(false)

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen)
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen)

  const primaryColor = theme.palette.primary.main

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 relative z-40">
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-2xl font-bold font-Lobster tracking-wide"
          style={{ color: primaryColor }}
        >
          Rabbit
        </Link>

        {/* Nav Links - Desktop */}
        <DesktopNav />


        {/* Right - Icons & Search */}
        <div className="flex items-center space-x-4">
          {/* Dark/Light */}
          <button
            onClick={onToggleMode}
            className="text-xl p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-400 transition"
            title="Toggle theme"
          >
            {theme.palette.mode === 'light' ? (
              <FiMoon style={{ color: primaryColor }} />
            ) : (
              <FiSun style={{ color: theme.palette.warning.light }} />
            )}
          </button>

          <button className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-400 transition">
            <Link
              to='/admin'
              className='block bg-gray-500 px-2 rounded text-sm text-white'
            >
              Admin
            </Link>
          </button>

          {/* Profile */}
          <button className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-400 transition">
            <Link to="/profile" title="Profile">
              <HiOutlineUser
                className="w-6 h-6 transition"
                style={{ color: primaryColor }}
              />
            </Link>
          </button>

          {/* Cart */}
          <button onClick={toggleCartDrawer} className="relative text-xl p-2 transition">
            <HiOutlineShoppingBag
              className="w-6 h-6 transition"
              style={{ color: primaryColor }}
            />
            <span className="absolute top-1 right-1 translate-x-[40%] -translate-y-[40%] bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-md">
              4
            </span>
          </button>


          {/* Search */}
          <div className="flex-1 flex justify-center text-center">
            <SearchBar />
          </div>

          {/* Mobile Nav Toggle */}
          <button onClick={toggleNavDrawer} className="md:hidden" title="Menu">
            <HiBars3BottomRight className="w-6 h-6" style={{ color: primaryColor }} />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer navDrawerOpen={navDrawerOpen} toggleNavDrawer={toggleNavDrawer} />
    </>
  )
}

export default Navbar
