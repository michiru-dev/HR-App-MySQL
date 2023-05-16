import React, { useEffect } from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Setting from './components/pages/setting/Setting'
import LandingPage from './components/pages/landing/LandingPage'
import Register from './components/pages/register/Register'
import { useAppDispatch } from './redux/hooks'
import { fetchHrOptionType } from './redux/optionsSlice'
import EmployeeList from './components/pages/employementsList/EmployeeList'

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

  // const [posts, setPosts] = useState<any>([])
  // useEffect(() => {
  //   //データ取得
  //   const postData = collection(db, 'posts') //collectionでpostの中のデータを見る
  //   getDocs(postData).then((snapShot) => {
  //     //getDocsでデータを取得
  //     // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })))
  //     //doc.data()はjson.stringfy的な感じ。データを読めるようにする
  //     setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })))
  //   })
  // }, [])

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHrOptionType())
  }, [])

  return (
    <div>
      {/* <div>
        <h1>Counter:{counter}</h1>
        <h2>{counterObj.name}</h2>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(setName('test'))}>NAME</button>
      </div> */}
      {/* {posts.map((post: any) => (
        <h1 key={1}>{post.title}</h1>
      ))} */}
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
