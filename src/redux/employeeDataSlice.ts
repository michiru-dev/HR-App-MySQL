import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  or,
} from 'firebase/firestore'
import db from '../fireStore/fireStoreConfig'

//firebaseに保存
const addEmployeeData = async (employeeData: EmployeeBase) => {
  try {
    const docRef = await addDoc(collection(db, 'employeeData'), employeeData)
    //'employeeData'というコレクションに引数employeeDataを格納、たぶん、、
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

//firebaseから検索値を探す
const fetchSearchedEmployee = createAsyncThunk(
  'employee/fetchSearchedEmployee',
  async (searchKeyword: string) => {
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
      .addCase(fetchSearchedEmployee.pending, (state) => {
        state
      })
      .addCase(fetchSearchedEmployee.fulfilled, (state, action) => {
        state.searchedEmployeeData = action.payload.searchedEmployeeArr
      })
      .addCase(fetchSearchedEmployee.rejected, (state) => {
        state
      })
  },
})

export const { addEmployee } = employeeDataSlice.actions
export { fetchSearchedEmployee }
export default employeeDataSlice.reducer
