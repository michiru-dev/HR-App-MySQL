import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  collection,
  query,
  where,
  getDocs,
  or,
  updateDoc,
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
      .then((res) => res.data) //ここで日付を変換
      .catch((err) => {
        console.log(err)
      })
    console.log(employeeArr)
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
// createAsyncThunkの型定義は二つの引数形式
// 一つ目の引数は返り値の型、二つ目はasyncの後にくる引数の型
// 今回はその型の定義の仕方はしていない
const editEmployeeData = createAsyncThunk<
  void,
  { employee: EmployeeWithoutId; docId: string }
>('employee/editEmployeeData', async ({ employee, docId }) => {
  if (typeof docId === 'undefined') return
  const ref = doc(db, 'employeeData', docId)
  await updateDoc(ref, employee) //docIdを省いてupdate
})

// //💡上書き（編集）
// const editEmployeeData = createAsyncThunk<
//   void,
//   { employee: EmployeeWithoutId; docId: string }
// >('employee/editEmployeeData', async ({ employee, docId }) => {
//   if (typeof docId === 'undefined') return

//   await axiosInstance.put(`/${collectionName}/put`, { newItem })

//   // const ref = doc(db, 'employeeData', docId)
//   // await updateDoc(ref, employee) //docIdを省いてupdate
// })

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
        console.log(action.payload.employeeArr)
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

// Connected to the database as id 134
// {
//   last_name: 'asdfawe',
//   first_name: '',
//   last_furigana: '',
//   first_furigana: '',
//   birthday: '',
//   phone_number: '',
//   education: '',
//   hire_date: '',
//   contract: '',
//   department: '',
//   degree: '',
//   position: ''
// }
// last_name, first_name, last_furigana, first_furigana, birthday, phone_number, education, hire_date, contract, department, degree, position
// ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
// [ 'asdfawe', '', '', '', '', '', '', '', '', '', '', '' ]
// Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'degree, position) VALUES ('asdfawe', '', '', '', '', '', '', '', '', '', '', '')' at line 1
//     at Packet.asError (/Users/MICHIRU/Desktop/code_folder/typescript/HR-app-with-mySQL/server/node_modules/mysql2/lib/packets/packet.js:728:17)
//     at Query.execute (/Users/MICHIRU/Desktop/code_folder/typescript/HR-app-with-mySQL/server/node_modules/mysql2/lib/commands/command.js:29:26)
//     at Connection.handlePacket (/Users/MICHIRU/Desktop/code_folder/typescript/HR-app-with-mySQL/server/node_modules/mysql2/lib/connection.js:492:32)
//     at PacketParser.onPacket (/Users/MICHIRU/Desktop/code_folder/typescript/HR-app-with-mySQL/server/node_modules/mysql2/lib/connection.js:97:12)
//     at PacketParser.executeStart (/Users/MICHIRU/Desktop/code_folder/typescript/HR-app-with-mySQL/server/node_modules/mysql2/lib/packet_parser.js:75:16)
//     at Socket.<anonymous> (/Users/MICHIRU/Desktop/code_folder/typescript/HR-app-with-mySQL/server/node_modules/mysql2/lib/connection.js:104:25)
//     at Socket.emit (node:events:378:20)
//     at Socket.EventEmitter.emit (node:domain:470:12)
//     at addChunk (node:internal/streams/readable:313:12)
//     at readableAddChunk (node:internal/streams/readable:288:9) {
//   code: 'ER_PARSE_ERROR',
//   errno: 1064,
//   sqlState: '42000',
//   sqlMessage: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'degree, position) VALUES ('asdfawe', '', '', '', '', '', '', '', '', '', '', '')' at line 1",
//   sql: "INSERT INTO employees (last_name, first_name, last_furigana, first_furigana, birthday, phone_number, education, hire_date, contract, department, degree, position) VALUES ('asdfawe', '', '', '', '', '', '', '', '', '', '', '')"
// }
