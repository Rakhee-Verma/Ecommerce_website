import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { FormTable } from './components/FormTable'
import { EditUserDetails } from './components/EditUserDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { useMemo, useState } from 'react'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { VeiwDetails } from './pages/VeiwDeatils'
import { AddCard } from './pages/Card'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

function App() {
  const storedToken = localStorage.getItem('accessToken')
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken)
  const [darkMode, setDarkMode] = useState(false)
  console.log('storedToken', storedToken);
  const theme =  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar userDetails={storedToken} darkMode={darkMode} setDarkMode={setDarkMode} />
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
          <Route path='/home' element={<ProtectedRoute isLoggedIn={storedToken}>
            <Home />
          </ProtectedRoute>} />
          <Route path='/veiwDetails/:id' element={<ProtectedRoute isLoggedIn={storedToken}>
            <VeiwDetails />
          </ProtectedRoute>} />
          <Route path='/card' element={<ProtectedRoute isLoggedIn={storedToken}>
            <AddCard />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
