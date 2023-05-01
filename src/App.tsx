import React from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Setting from './components/pages/setting/Setting'
import LandingPage from './components/pages/landing/LandingPage'
import Register from './components/pages/register/Register'
import { increment, decrement, setName } from '../src/redux/counterSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'

function App() {
  const counter = useAppSelector((state) => state.counter.value)
  //見てる値(counter.value)が変わった時にcounterの値も自動で更新される
  const counterObj = useAppSelector((state) => state.counter)
  // storeにアクセスしてstateをとってくるためにuseselectorが必要
  //引数の書き方は上を参照。取ってきたいデータにアクセスしてる
  //これはstoreからデータを取得！
  const dispatch = useAppDispatch()
  //storeのreducersの計算式を実行させるのがusedispatch
  console.log(counterObj)

  // dispatch(setName('test'))
  //        ⇩
  //      store 'test' => action = { payload: 'test', type: '...' }
  //        ⇩
  // setName('test') => setName(state, action)

  return (
    <div>
      <div>
        <h1>Counter:{counter}</h1>
        <h2>{counterObj.name}</h2>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(setName('test'))}>NAME</button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
