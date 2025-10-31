import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { FormTable } from './components/FormTable'
import { EditUserDetails } from './components/EditUserDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'

function App() {
  const storedToken = localStorage.getItem('accessToken')
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken)
  console.log('storedToken', storedToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/formTable' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FormTable />
            </ProtectedRoute>

          } />
          <Route path='/editUserDetails' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditUserDetails />
            </ProtectedRoute>
            
            } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
