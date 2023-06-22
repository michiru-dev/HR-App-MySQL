import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Setting from './components/pages/setting/Index'
import Register from './components/pages/register'
import { useAppDispatch } from './redux/hooks'
import { fetchHrOptionType } from './redux/slicers/optionsSlice'
import EmployeeList from './components/pages/employementsList'
import LandingPage from './components/pages/landing'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHrOptionType())
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employeeList" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
