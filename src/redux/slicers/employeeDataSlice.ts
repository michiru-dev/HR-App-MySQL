import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  or,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import db from '../../fireStore/fireStoreConfig'
import { RootState } from '../store'
import { EmployeeBase, EmployeeWithoutDocId } from './type'

//💡firebaseに保存
const addEmployeeData = createAsyncThunk<
  void,
  EmployeeWithoutDocId,
  {
    state: RootState //これはgetStateの型の書き方
  }
>('employee/addEmployeeData', async (registerInfo, { getState }) => {
  const state = getState()
  const id = (state.employee.employeeData.length + 1).toString()
  const newEmployee = { ...registerInfo, id }
  await addDoc(collection(db, 'employeeData'), newEmployee)
  //'employeeData'というコレクションに引数newEmployeeを格納
})

//💡firebaseからデータを取得
const fetchEmployeeData = createAsyncThunk(
  'employee/fetchEmployeeData',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'employeeData'))
    const employeeArr = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as EmployeeBase),
      docId: doc.id,
    }))
    return { employeeArr: employeeArr }
  }
)

//💡firebaseから検索値を探す
const fetchSearchedEmployee = createAsyncThunk(
  'employee/fetchSearchedEmployee',
  async (searchKeyword: string) => {
    //これはおそらく型を自動解決
    const q = query(
      collection(db, 'employeeData'),
      or(
        where('firstName', '==', searchKeyword),
        where('lastName', '==', searchKeyword),
        where('firstFurigana', '==', searchKeyword),
        where('lastFurigana', '==', searchKeyword)
      )
    )
    const querySnapshot = await getDocs(q)
    const searchedEmployeeArr = querySnapshot.docs.map((doc) => {
      return doc.data() as EmployeeBase
    })
    return { searchedEmployeeArr: searchedEmployeeArr }
  }
)

//💡firebaseから削除
const deleteEmployeeData = createAsyncThunk(
  'employee/deleteEmployeeData',
  async (docId: string) => {
    await deleteDoc(doc(db, 'employeeData', docId))
  }
)

//ジェネリック
// type Sample<T> = {
//   name: string
//   moreInfoObj: T
// }

// const user: Sample<{
//   age: number
//   lastname: string
// }> = {
//   name: 'sss',
//   moreInfoObj: {
//     age: 1,
//     lastname: 'test'
//   },
// }

//💡firebaseの値を上書き（編集）
//createAsyncThunkの型定義は二つの引数形式
//一つ目の引数は返り値の型、二つ目はasyncの後にくる引数の型
//今回はその型の定義の仕方はしていない
const editEmployeeData = createAsyncThunk(
  'employee/editEmployeeData',
  async ({ newData }: { newData: EmployeeBase }) => {
    if (typeof newData.docId === 'undefined') return
    const ref = doc(db, 'employeeData', newData.docId)
    await updateDoc(ref, newData)
  }
)

type InitialBase = {
  employeeData: Array<EmployeeBase>
  searchedEmployeeData: Array<EmployeeBase>
  isLoading: boolean
}

const initialState: InitialBase = {
  employeeData: [],
  searchedEmployeeData: [],
  isLoading: false,
}

export const employeeDataSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {}, //asyncを含むapi通信はreducersの中でやるべきではない
  extraReducers: (builder) => {
    builder
      //firebaseに保存
      .addCase(addEmployeeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addEmployeeData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addEmployeeData.rejected, (state) => {
        state.isLoading = false
      })
      //💡firebaseからデータを取得
      .addCase(fetchEmployeeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.employeeData = action.payload.employeeArr
      })
      .addCase(fetchEmployeeData.rejected, (state) => {
        state.isLoading = false
      })
      //firebaseから検索値を探す
      .addCase(fetchSearchedEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSearchedEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchedEmployeeData = action.payload.searchedEmployeeArr
      })
      .addCase(fetchSearchedEmployee.rejected, (state) => {
        state.isLoading = false
      })
      //💡firebaseから削除
      .addCase(deleteEmployeeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEmployeeData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(deleteEmployeeData.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export {
  fetchSearchedEmployee,
  fetchEmployeeData,
  editEmployeeData,
  deleteEmployeeData,
  addEmployeeData,
}

export default employeeDataSlice.reducer
