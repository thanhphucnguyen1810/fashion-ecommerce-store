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
import Checkout from '~/components/Cart/Checkout'
import OrderConfirmationPage from '~/pages/OrderConfirmationPage'
import OrderDetailsPage from '~/pages/OrderDetailsPage'
import MyOrdersPage from '~/pages/MyOrdersPage'

import AdminLayout from '~/components/Admin/AdminLayout'
import AdminHomePage from '~/pages/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'
import AdminDiscountCodes from './components/Admin/AdminDiscountCodes'
import AdminReviews from './components/Admin/AdminReviews'
import SystemSettings from './components/Admin/SystemSettings'
// import StockManagement from './components/Admin/StockManagement'
// import Notifications from './components/Admin/Notifications'


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
            <Route path='checkout' element={<Checkout />} />
            <Route path='order-confirmation' element={<OrderConfirmationPage />} />
            <Route path='order/:id' element={<OrderDetailsPage />} />
            <Route path='my-orders' element={<MyOrdersPage />} />

          </Route>
          {/* Admin Layout */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='products/:id/edit' element={<EditProductPage />} />
            <Route path='orders' element={<OrderManagement />} />
            <Route path='coupons' element={<AdminDiscountCodes />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path='settings' element={<SystemSettings />} />
            {/* <Route path='stock' element={<StockManagement />} /> */}
            {/* <Route path="notifications" element={<Notifications />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
