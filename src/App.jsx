import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { FormTable } from './components/FormTable'
import { EditUserDetails } from './components/EditUserDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { VeiwDetails } from './pages/VeiwDeatils'
import { AddCard } from './pages/Card'

function App() {
  const storedToken = localStorage.getItem('accessToken')
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken)
  console.log('storedToken', storedToken);

  return (
    <>
      <BrowserRouter>
      <Navbar userDetails={storedToken}/>
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
            <Route path='/home' element={ <ProtectedRoute isLoggedIn={storedToken}>
              <Home />
            </ProtectedRoute>}/>
            <Route path='/veiwDetails' element={ <ProtectedRoute isLoggedIn={storedToken}>
              <VeiwDetails />
            </ProtectedRoute>}/>
             <Route path='/card' element={ <ProtectedRoute isLoggedIn={storedToken}>
              <AddCard />
            </ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
