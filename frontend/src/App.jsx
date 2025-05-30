import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import '~/index.css'
import UserLayout from '~/components/Layouts/UserLayout'
import SettingsProvider from '~/contexts/SettingsContext'

import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Profile from '~/pages/Profile'
import CollectionPage from '~/pages/CollectionPage'
import ProductDetails from '~/components/Products/ProductDetails'
import Contact from '~/pages/Contact'


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
            <Route path='contact' element={<Contact />} />

            {/* Collection Pages */}
            <Route path='collections/:collection' element={<CollectionPage />} />
            <Route path='collections/:category/:subcategory' element={<CollectionPage />} />

            {/* Product Details */}
            <Route path='product/:id' element={<ProductDetails />} />
          </Route>
          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
