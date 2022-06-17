import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Secret from './pages/Secret'
import 'react-toastify/dist/ReactToastify.css';
import Administration from './pages/Administration'
import InvitedUser from './pages/InvitedUser'
import Security from './pages/Security'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/' element={<Secret />} />
        <Route exact path='/admin' element={<Administration />} />
        {/* <Route exact path='/login/invited-users' element={<InvitedUser />} /> */}
        <Route exact path='security' element={<Security />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App