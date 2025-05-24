import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '~/index.css'
import UserLayout from '~/components/Layouts/UserLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <UserLayout />} >{/* User Layout */}</Route>
        <Route>{/* Admin Layout */}</Route>
      </Routes>

    </BrowserRouter>

  )
}

export default App
