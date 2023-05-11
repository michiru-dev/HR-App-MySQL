import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import db from '../fireStore/fireStoreConfig'

//firebaseに保存
const addOpionData = async (optionData: OptionBase, collectionName: string) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), optionData)

    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

//reduxの中でapiの呼び出しは禁止のためcreateAsyncThunkを使う
const fetchContractType = createAsyncThunk<{
  contractTypes: Array<OptionBase>
}>('options/fetchContractType', async () => {
  //名前をつける
  const getData = collection(db, 'contractType')
  //contractTypeのデータを見る
  const snapShot = await getDocs(getData)
  //データを取得
  const arr = snapShot.docs.map((doc) => ({
    //docsはもともとあるやつ
    ...(doc.data() as OptionBase),
  }))
  return { contractTypes: arr }
  //必ずobjectでreturn、リターンするものに名前をつける
})

export type OptionBase = {
  id: string
  name: string
}

type OptionsState = {
  contractType: Array<OptionBase>
  department: Array<OptionBase>
  rank: Array<OptionBase>
  position: Array<OptionBase>
  isLoading: boolean
}

//そのデータの初期値を定義（スライスを作る準備）
const initialState: OptionsState = {
  contractType: [
    // { id: uuidv4(), name: '正社員' },
    // { id: uuidv4(), name: '再雇用' },
    // { id: uuidv4(), name: '嘱託' },
    // { id: uuidv4(), name: '派遣' },
  ],
  department: [
    { id: uuidv4(), name: '人事部' },
    { id: uuidv4(), name: '経理部' },
    { id: uuidv4(), name: '情報システム部' },
    { id: uuidv4(), name: '第一営業部' },
    { id: uuidv4(), name: '第二営業部' },
    { id: uuidv4(), name: '第三営業部' },
  ],
  rank: [
    { id: uuidv4(), name: '1級' },
    { id: uuidv4(), name: '2級' },
    { id: uuidv4(), name: '3級' },
    { id: uuidv4(), name: '4級' },
    { id: uuidv4(), name: '5級' },
  ],
  position: [
    { id: uuidv4(), name: '社長' },
    { id: uuidv4(), name: '専務' },
    { id: uuidv4(), name: '統括部長' },
    { id: uuidv4(), name: '部長' },
    { id: uuidv4(), name: '課長' },
  ],
  isLoading: false,
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    //契約形態
    addContractType: (state, action: PayloadAction<OptionBase>) => {
      state.contractType.push(action.payload)
      addOpionData(action.payload, 'contractType') //firebase
    },
    deleteContractType: (state, action: PayloadAction<string>) => {
      const newContractArray = state.contractType.filter((contract) => {
        return contract.id !== action.payload
      })
      state.contractType = newContractArray
    },
    editContractType: (state, action: PayloadAction<OptionBase>) => {
      //contractypeの中身をmapして渡ってきたIDと一緒だったらnameを置き換える
      state.contractType.map((contract) => {
        if (contract.id === action.payload.id) {
          contract.name = action.payload.name
        }
      })
    },
    //部署
    addDepartmentType: (state, action: PayloadAction<OptionBase>) => {
      state.department.push(action.payload)
      addOpionData(action.payload, 'departmentType')
    },
    deleteDepartmentType: (state, action: PayloadAction<string>) => {
      const newDepartmentArray = state.department.filter((department) => {
        return department.id !== action.payload
      })
      state.department = newDepartmentArray
    },
    editDepartmentType: (state, action: PayloadAction<OptionBase>) => {
      state.department.map((department) => {
        if (department.id === action.payload.id) {
          department.name = action.payload.name
        }
      })
    },
    //等級
    addRankType: (state, action: PayloadAction<OptionBase>) => {
      state.rank.push(action.payload)
      addOpionData(action.payload, 'rankType')
    },
    deleteRankType: (state, action: PayloadAction<string>) => {
      const newRankArray = state.rank.filter((rank) => {
        return rank.id !== action.payload
      })
      state.rank = newRankArray
    },
    editRankType: (state, action: PayloadAction<OptionBase>) => {
      state.rank.map((rank) => {
        if (rank.id === action.payload.id) {
          rank.name = action.payload.name
        }
      })
    },
    //役職
    addPositionType: (state, action: PayloadAction<OptionBase>) => {
      state.position.push(action.payload)
      addOpionData(action.payload, 'positionType')
    },
    deletePositionType: (state, action: PayloadAction<string>) => {
      const newPositionArray = state.contractType.filter((position) => {
        return position.id !== action.payload
      })
      state.position = newPositionArray
    },
    editPositionType: (state, action: PayloadAction<OptionBase>) => {
      state.position.map((position) => {
        if (position.id === action.payload.id) {
          position.name = action.payload.name
        }
      })
    },
  },
  //createAsyncThunkとセット。上でセットしたreturnが使える
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchContractType.fulfilled, (state, action) => {
        state.isLoading = false
        state.contractType = action.payload.contractTypes
      })
      .addCase(fetchContractType.rejected, (state) => {
        state.isLoading = false
        // state.error = action.error
      })
  },
})

export const {
  addContractType,
  deleteContractType,
  editContractType,
  addDepartmentType,
  deleteDepartmentType,
  editDepartmentType,
  addRankType,
  deleteRankType,
  editRankType,
  addPositionType,
  deletePositionType,
  editPositionType,
} = optionsSlice.actions

export { fetchContractType }

export default optionsSlice.reducer
