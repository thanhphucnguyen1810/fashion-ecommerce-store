import { useTheme } from '@mui/material/styles'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

const MobileDrawer = ({ navDrawerOpen, toggleNavDrawer }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div
      className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full shadow-xl transform transition-transform duration-300 z-50 ${
        navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleNavDrawer}>
          <IoMdClose
            className="w-6 h-6 transition"
            style={{
              color: isDark ? theme.palette.text.secondary : theme.palette.grey[700]
            }}
          />
        </button>
      </div>

      <div className="px-6 py-4">
        <h2
          className="text-lg font-Lobster mb-4"
          style={{ color: isDark ? theme.palette.info.light : theme.palette.primary.main }}
        >
          Menu
        </h2>
        <nav className="space-y-4">
          {['Men', 'Women', 'Top Wear', 'Bottom Wear'].map((label) => (
            <Link
              key={label}
              to="#"
              onClick={toggleNavDrawer}
              className="block font-Poppins transition"
              style={{
                color: isDark
                  ? theme.palette.text.secondary
                  : theme.palette.primary.light
              }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark
                  ? theme.palette.text.primary
                  : theme.palette.primary.dark
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark
                  ? theme.palette.text.secondary
                  : theme.palette.primary.light
              }}
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
