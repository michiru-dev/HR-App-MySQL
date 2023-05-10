import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
      state.employeeData.push({ ...action.payload, id }) //展開してidを追加して新しいobjectを作成している
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
