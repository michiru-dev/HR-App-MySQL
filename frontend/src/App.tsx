import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Setting from './components/pages/setting/Index'
import Register from './components/pages/register'
import { useAppDispatch } from './redux/hooks'
import { fetchHrOptionType } from './redux/slicers/optionsSlice'
import EmployeeList from './components/pages/employementsList'
import LandingPage from './components/pages/landing'

function App() {
  // const counter = useAppSelector((state) => state.counter.value)
  // //見てる値(counter.value)が変わった時にcounterの値も自動で更新される
  // const counterObj = useAppSelector((state) => state.counter)
  // // storeにアクセスしてstateをとってくるためにuseselectorが必要
  // //引数の書き方は上を参照。取ってきたいデータにアクセスしてる
  // //これはstoreからデータを取得！
  // const dispatch = useAppDispatch()
  // //storeのreducersの計算式を実行させるのがusedispatch

  // // dispatch(setName('test'))
  // //        ⇩
  // //      store 'test' => action = { payload: 'test', type: '...' }
  // //        ⇩
  // // setName('test') => setName(state, action)

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
