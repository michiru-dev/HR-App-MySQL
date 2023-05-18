import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
import db from '../fireStore/fireStoreConfig'

//💡firebaseに保存
const addEmployeeData = async (employeeData: EmployeeBase) => {
  try {
    const docRef = await addDoc(collection(db, 'employeeData'), employeeData)
    //'employeeData'というコレクションに引数employeeDataを格納、たぶん、、
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

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
const editEmployeeData = createAsyncThunk<
  void, //returnがなにもないからvoid
  { newData: EmployeeBase }
>('employee/editEmployeeData', async ({ newData }) => {
  if (typeof newData.docId === 'undefined') return
  const ref = doc(db, 'employeeData', newData.docId)
  await updateDoc(ref, newData)
})

export type EmployeeBase = {
  id: string
  firstName: string
  lastName: string
  firstFurigana: string
  lastFurigana: string
  birthday: string
  postalCode: string
  education: string
  hireDate: string
  contractType: string
  department: string
  rank: string
  position: string
  docId?: string
}

//omitでid以外のtypeを作成
export type EmployeeWithoutId = Omit<EmployeeBase, 'id'>

type InitialBase = {
  employeeData: Array<EmployeeBase>
  searchedEmployeeData: Array<EmployeeBase>
}

const initialState: InitialBase = {
  employeeData: [],
  searchedEmployeeData: [],
}

export const employeeDataSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeWithoutId>) => {
      const id = (state.employeeData.length + 1).toString()
      const newEmployee = { ...action.payload, id } //展開してidを追加して新しいobjectを作成している
      state.employeeData.push(newEmployee)
      addEmployeeData(newEmployee)
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(fetchSearchedEmployee.pending, (state) => {
      //     state
      //   })
      .addCase(fetchSearchedEmployee.fulfilled, (state, action) => {
        state.searchedEmployeeData = action.payload.searchedEmployeeArr
      })
      //   .addCase(fetchSearchedEmployee.rejected, (state) => {
      //     state
      //   })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.employeeData = action.payload.employeeArr
      })
  },
})

export const { addEmployee } = employeeDataSlice.actions
export {
  fetchSearchedEmployee,
  fetchEmployeeData,
  editEmployeeData,
  deleteEmployeeData,
}

export default employeeDataSlice.reducer
