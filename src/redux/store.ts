import { configureStore } from '@reduxjs/toolkit'
import counterSlicer from './counterSlice'

//いろんなスライサーを置くstore,大元

//configurestoreでstoreにreducer(スライサー)を登録
const store = configureStore({
  reducer: {
    //ここは名前決まってる
    counter: counterSlicer, //counterは自分でつけた
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppGetState = typeof store.getState
export type AppDispatch = typeof store.dispatch
