import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Setting from './components/pages/setting/Index'
import Register from './components/pages/register'
import { useAppDispatch } from './redux/hooks'
import { fetchHrOptionType } from './redux/slicers/optionsSlice'
import EmployeeList from './components/pages/employementsList'
import LandingPage from './components/pages/landing'
import { Login } from './components/pages/login'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHrOptionType())
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/home/setting" element={<Setting />} />
          <Route path="/home/register" element={<Register />} />
          <Route path="/home/employeeList" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
