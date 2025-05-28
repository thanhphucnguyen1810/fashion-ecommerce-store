import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import '~/index.css'
import UserLayout from '~/components/Layouts/UserLayout'
import SettingsProvider from '~/contexts/SettingsContext'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Profile from '~/pages/Profile'

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes>
          {/* User Layout */}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
