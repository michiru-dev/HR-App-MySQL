import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { collection, addDoc } from 'firebase/firestore'
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
    searchEmployee: (state, action: PayloadAction<string>) => {
      state.searchedEmployeeData = state.employeeData.filter((data) => {
        return (
          data.firstName.includes(action.payload) ||
          data.lastName.includes(action.payload) ||
          data.firstFurigana.includes(action.payload) ||
          data.lastFurigana.includes(action.payload)
        )
      })
    },
  },
})

export const { addEmployee, searchEmployee } = employeeDataSlice.actions
export default employeeDataSlice.reducer
