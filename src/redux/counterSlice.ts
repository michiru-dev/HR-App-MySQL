import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//これはstoreに置いとくデータとかそのデータの処理内容のワンセット slice!
type CounterState = {
  value: number
  name: string
  age: number
}

//そのデータの初期値を定義（スライスを作る準備）
const initialState: CounterState = {
  value: 0,
  name: '',
  age: 0,
}

//createsliceで本格的にsliceを作成していく
export const counterSlice = createSlice({
  name: 'counter', //スライスの名前
  initialState, //初期値initialState:initialStateと同義
  reducers: {
    //データを更新するロジック（計算式）がはいる
    increment: (state) => {
      state.value += 1
    },
    //名前:(文字はなんでもOK、中身はinitialstateのobject※値が更新されてればここも更新)=>{
    //stateを更新するための計算}

    decrement: (state) => {
      state.value -= 1
    },
    setName: (state, action: PayloadAction<string>) => {
      console.log(action)
      state.name = action.payload //引数がobjectに変換されてくるからそこにアクセスapp.tsxの図を参照
    },
  },
})

export const { increment, decrement, setName } = counterSlice.actions //actions=reducersだけどここでは必ずactions
export default counterSlice.reducer
