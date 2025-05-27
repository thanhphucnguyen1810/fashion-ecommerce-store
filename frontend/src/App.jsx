import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '~/index.css'
import UserLayout from '~/components/Layouts/UserLayout'
import SettingsProvider from '~/contexts/SettingsContext'
import Home from './pages/Home'

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          {/* User Layout */}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
