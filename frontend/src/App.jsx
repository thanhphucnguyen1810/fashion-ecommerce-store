import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '~/index.css'
import UserLayout from '~/components/Layouts/UserLayout'
import SettingsProvider from '~/contexts/SettingsContext'

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            {/* User Layout */}
            {/* Home */}
            {/* Products */}
            {/* Cart */}
            {/* Checkout */}
          </Route>
          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
