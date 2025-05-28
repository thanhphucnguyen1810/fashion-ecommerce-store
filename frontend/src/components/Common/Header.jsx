import Topbar from '~/components/Layouts/Topbar'
import Navbar from './Navbar'
import { useTheme } from '@mui/material/styles'

const Header = () => {
  const theme = useTheme()
  return (
    <header style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      {/* Topbar */}
      <Topbar />
      {/* navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </header>
  )
}

export default Header
