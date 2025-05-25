import { useTheme } from '@mui/material/styles'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

const MobileDrawer = ({ navDrawerOpen, toggleNavDrawer }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div
      className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-white text-[#042956]'
      } shadow-xl transform transition-transform duration-300 z-50 ${
        navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleNavDrawer}>
          <IoMdClose
            className={`w-6 h-6 transition ${
              isDark ? 'text-slate-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      <div className="px-6 py-4">
        <h2
          className={`text-lg font-Lobster mb-4 ${
            isDark ? 'text-blue-300' : 'text-[#0F4C81]'
          }`}
        >
          Menu
        </h2>
        <nav className="space-y-4">
          {['Men', 'Women', 'Top Wear', 'Bottom Wear'].map((label) => (
            <Link
              key={label}
              to="#"
              onClick={toggleNavDrawer}
              className={`block font-Poppins transition ${
                isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-[#236899] hover:text-[#042956]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileDrawer
