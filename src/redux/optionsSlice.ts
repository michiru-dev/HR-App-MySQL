import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type OptionBase = {
  id: string
  name: string
}

type OptionsState = {
  contractType: Array<OptionBase>
  department: Array<OptionBase>
  rank: Array<OptionBase>
  position: Array<OptionBase>
}

//そのデータの初期値を定義（スライスを作る準備）
const initialState: OptionsState = {
  contractType: [
    { id: uuidv4(), name: '正社員' },
    { id: uuidv4(), name: '再雇用' },
    { id: uuidv4(), name: '嘱託' },
    { id: uuidv4(), name: '派遣' },
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
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    //契約形態
    addContractType: (state, action: PayloadAction<OptionBase>) => {
      state.contractType.push(action.payload)
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
export default optionsSlice.reducer
