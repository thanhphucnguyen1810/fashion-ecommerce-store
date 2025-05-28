import { useTheme } from '@mui/material/styles'
import MyOrdersPage from './MyOrdersPage'

const Profile = () => {
  const theme = useTheme()

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
          {/* Left Section */}
          <div
            className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg px-6'
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary
            }}
          >
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>
              John Doe
            </h1>
            <p
              className='text-lg mb-4'
              style={{ color: theme.palette.text.secondary }}
            >
              John@example.com
            </p>
            <button
              className='w-full py-2 px-4 rounded'
              style={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.getContrastText(theme.palette.error.main)
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  theme.palette.error.dark)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  theme.palette.error.main)
              }
            >
              Logout
            </button>
          </div>

          {/* Right Section: Orders table */}
          <div className='w-full md:w-2/3 lg:w-3/4'>
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
