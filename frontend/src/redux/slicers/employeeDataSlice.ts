import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EmployeeBase, EmployeeWithoutId } from './type'
import { axiosInstance } from '../../axios'

//💡追加(post)
const addEmployeeData = createAsyncThunk(
  'employee/addEmployeeData',
  async (registerInfo: EmployeeWithoutId) => {
    //サーバー通信
    await axiosInstance.post(`/employees/post`, registerInfo)
  }
)

//日付が"YYYY-MM-DDTHH:mm:ss.sssZ"この形で返ってくるので
//Tで区切ってその配列の一つ目[0]を返す
const convertNumber = (res: any) => {
  return res.data.map((employee: any) => {
    if (employee.hire_date) {
      employee.hire_date = employee.hire_date.split('T')[0]
    }
    if (employee.birthday) {
      employee.birthday = employee.birthday.split('T')[0]
    }
    return employee
  })
}

//💡取得(get)
const fetchEmployeeData = createAsyncThunk(
  'employee/fetchEmployeeData',
  async () => {
    const employeeArr = await axiosInstance
      .get('/employees')
      .then((res) => convertNumber(res))
      .catch((err) => {
        console.log(err)
      })
    return { employeeArr }
  }
)

//💡検索
const fetchSearchedEmployee = createAsyncThunk(
  'employee/fetchSearchedEmployee',
  async (searchKeyword: string) => {
    const searchedEmployeeArr = await axiosInstance
      .get(`/employees/search?keyword=${searchKeyword}`)
      .then((res) => convertNumber(res))
      .catch((err) => {
        console.log(err)
      })
    return { searchedEmployeeArr }
  }
)

//💡削除（delete)
const deleteEmployeeData = createAsyncThunk(
  'employee/deleteEmployeeData',
  async (id: string) => {
    await axiosInstance.delete('/employees/delete', { data: { id } })
  }
)

//💡編集(put)
const editEmployeeData = createAsyncThunk<
  void,
  { updatedEmployeeData: EmployeeBase; id: string }
>('employee/editEmployeeData', async ({ updatedEmployeeData, id }) => {
  if (typeof id === 'undefined') return
  await axiosInstance.put(`/employees/put`, { updatedEmployeeData, id })
})

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
      //💡保存
      .addCase(addEmployeeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addEmployeeData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addEmployeeData.rejected, (state) => {
        state.isLoading = false
      })
      //💡取得
      .addCase(fetchEmployeeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.employeeData = action.payload.employeeArr
        state.isLoading = false
      })
      .addCase(fetchEmployeeData.rejected, (state) => {
        state.isLoading = false
      })
      //💡検索値を探す
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
      //💡編集
      .addCase(editEmployeeData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editEmployeeData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editEmployeeData.rejected, (state) => {
        state.isLoading = false
      })
      //💡削除
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
