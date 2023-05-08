import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  contractType: [],
  department: [],
  rank: [],
  position: [],
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
