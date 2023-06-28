import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  collection,
  query,
  where,
  getDocs,
  or,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import db from '../../fireStore/fireStoreConfig'
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

//💡取得(get)
const fetchEmployeeData = createAsyncThunk(
  'employee/fetchEmployeeData',
  async () => {
    const employeeArr = await axiosInstance
      .get('/employees')
      .then((res) => {
        return res.data.map((employee: any) => {
          //日付が"YYYY-MM-DDTHH:mm:ss.sssZ"この形で返ってくるので
          //Tで区切ってその配列の一つ目[0]を返す
          if (employee.hire_date) {
            employee.hire_date = employee.hire_date.split('T')[0]
          }
          if (employee.birthday) {
            employee.birthday = employee.birthday.split('T')[0]
          }
          return employee
        })
      })
      .catch((err) => {
        console.log(err)
      })
    return { employeeArr: employeeArr }
  }
)

//💡firebaseから検索値を探す
const fetchSearchedEmployee = createAsyncThunk(
  'employee/fetchSearchedEmployee',
  async (searchKeyword: string) => {
    //これはおそらく型を自動解決
    //searchKeywordに当てはまるやつだけ抽出
    const q = query(
      collection(db, 'employeeData'),
      or(
        where('first_name', '==', searchKeyword),
        where('last_name', '==', searchKeyword),
        where('first_furigana', '==', searchKeyword),
        where('last_furigana', '==', searchKeyword)
      )
    )
    //getDocsで取得
    const querySnapshot = await getDocs(q)
    //.docsで読めるように
    const searchedEmployeeArr = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as EmployeeBase),
      docId: doc.id,
    }))
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

// 💡firebaseの値を上書き（編集）

// const editEmployeeData = createAsyncThunk<
//   void,
//   { employee: EmployeeWithoutId; docId: string }
// >('employee/editEmployeeData', async ({ employee, docId }) => {
//   if (typeof docId === 'undefined') return
//   const ref = doc(db, 'employeeData', docId)
//   await updateDoc(ref, employee) //docIdを省いてupdate
// })

//💡上書き（編集）
const editEmployeeData = createAsyncThunk<
  void,
  { updatedEmployeeData: EmployeeBase; id: string }
>('employee/editEmployeeData', async ({ updatedEmployeeData, id }) => {
  if (typeof id === 'undefined') return
  await axiosInstance.put(`/employees/put`, { updatedEmployeeData, id })

  // const ref = doc(db, 'employeeData', docId)
  // await updateDoc(ref, employee) //docIdを省いてupdate
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
