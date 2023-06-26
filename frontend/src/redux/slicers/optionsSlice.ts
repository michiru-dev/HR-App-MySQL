import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchContract,
  fetchDepartments,
  fetchPositions,
  fetchLevel,
} from '../../fireStore/services/hrService'
import { collectionNameBase } from '../../hooks/useSettingInputs'
import { RootState } from '../store'
import { OptionBase } from './type'
import 'firebase/compat/firestore'
import { axiosInstance } from '../../axios'

//💡値を取得(get)
//reduxの中でapiの呼び出しは禁止のためcreateAsyncThunkを使う・下の方のextrareducersとセット
const fetchHrOptionType = createAsyncThunk<{
  //returnの型
  contractTypes: Array<OptionBase>
  departmentTypes: Array<OptionBase>
  positionTypes: Array<OptionBase>
  levelTypes: Array<OptionBase>
}>('hrOptions/fetchHrOptionType', async () => {
  const contractArr = await fetchContract()
  const departmentArr = await fetchDepartments()
  const positionArr = await fetchPositions()
  const levelArr = await fetchLevel()
  //promiseall使う！！

  //必ずobjectでreturn、リターンするものに名前をつける
  return {
    contractTypes: contractArr,
    departmentTypes: departmentArr,
    positionTypes: positionArr,
    levelTypes: levelArr,
  }
})

//💡追加(post)
const addHrOptionData = createAsyncThunk<
  { optionData: Array<OptionBase>; collectionName: collectionNameBase },
  {
    newItem: string
    collectionName: collectionNameBase
  }
>(
  'hrOptions/addHrOptionData',
  //createasyncは引数を一つしか渡せないためobjectにしている
  async ({ newItem, collectionName }) => {
    //サーバー通信
    await axiosInstance.post(`/${collectionName}/post`, { newItem })

    //新しく追加したところだけにfetchをかける
    let updatedList: Array<OptionBase> = []
    if (collectionName === 'contract') {
      updatedList = await fetchContract()
    }
    if (collectionName === 'departments') {
      updatedList = await fetchDepartments()
    }
    if (collectionName === 'positions') {
      updatedList = await fetchPositions()
    }
    if (collectionName === 'level') {
      updatedList = await fetchLevel()
    }
    return { optionData: updatedList, collectionName: collectionName }
  }
)

//💡削除(delete)
const deleteOptionData = createAsyncThunk<
  { newArr: Array<OptionBase>; collectionName: collectionNameBase },
  { id: string; collectionName: collectionNameBase },
  { state: RootState }
>('options/deleteOptionData', async ({ id, collectionName }, { getState }) => {
  //サーバー通信
  await axiosInstance.delete(`/${collectionName}/delete`, {
    data: { id },
  })

  //reduxに削除したやつ以外の最新の配列をいれる
  const state = getState()
  const newArr = state.option[collectionName].filter(
    (collection: OptionBase) => {
      return collection.id !== id
    }
  )
  return { newArr: newArr, collectionName: collectionName }
})

//💡値を編集
const editOption = createAsyncThunk(
  'option/editOption',
  async ({
    id,
    collectionName,
    newName,
  }: {
    id: string
    collectionName: collectionNameBase
    newName: string
  }) => {
    //サーバー通信
    await axiosInstance.put(`/${collectionName}/put`, { id, newName })

    //reduxの値を編集
    //編集したところだけにfetchをかける
    let updatedList: Array<OptionBase> = []
    if (collectionName === 'contract') {
      updatedList = await fetchContract()
    }
    if (collectionName === 'departments') {
      updatedList = await fetchDepartments()
    }
    if (collectionName === 'positions') {
      updatedList = await fetchPositions()
    }
    if (collectionName === 'level') {
      updatedList = await fetchLevel()
    }
    return { optionData: updatedList, collectionName: collectionName }
  }
)

type OptionsState = {
  contract: Array<OptionBase>
  departments: Array<OptionBase>
  level: Array<OptionBase>
  positions: Array<OptionBase>
  isLoading: boolean
}

//そのデータの初期値を定義（スライスを作る準備）
const initialState: OptionsState = {
  contract: [],
  departments: [],
  level: [],
  positions: [],
  isLoading: false,
}

export const optionsSlice = createSlice({
  name: 'hrOptions',
  initialState,
  reducers: {},
  //createAsyncThunkとセット。上でセットしたreturnが使える
  extraReducers: (builder) => {
    builder
      //項目の追加
      .addCase(addHrOptionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addHrOptionData.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.collectionName === 'contract') {
          state.contract = action.payload.optionData
          //配列を新しいのに置き換え
        }
        if (action.payload.collectionName === 'departments') {
          state.departments = action.payload.optionData
        }
        if (action.payload.collectionName === 'positions') {
          state.positions = action.payload.optionData
        }
        if (action.payload.collectionName === 'level') {
          state.level = action.payload.optionData
        }
      })
      .addCase(addHrOptionData.rejected, (state) => {
        state.isLoading = false
      })
      //項目の取得
      .addCase(fetchHrOptionType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHrOptionType.fulfilled, (state, action) => {
        state.isLoading = false
        state.contract = action.payload.contractTypes
        state.departments = action.payload.departmentTypes
        state.positions = action.payload.positionTypes
        state.level = action.payload.levelTypes
      })
      .addCase(fetchHrOptionType.rejected, (state) => {
        state.isLoading = false
      })
      //項目の削除
      .addCase(deleteOptionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOptionData.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.collectionName === 'contract') {
          state.contract = action.payload.newArr
          //配列を新しいのに置き換え
        }
        if (action.payload.collectionName === 'departments') {
          state.departments = action.payload.newArr
        }
        if (action.payload.collectionName === 'positions') {
          state.positions = action.payload.newArr
        }
        if (action.payload.collectionName === 'level') {
          state.level = action.payload.newArr
        }
      })
      .addCase(deleteOptionData.rejected, (state) => {
        state.isLoading = false
      })
      //項目の編集
      .addCase(editOption.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editOption.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.collectionName === 'contract') {
          state.contract = action.payload.optionData
          //配列を新しいのに置き換え
        }
        if (action.payload.collectionName === 'departments') {
          state.departments = action.payload.optionData
        }
        if (action.payload.collectionName === 'positions') {
          state.positions = action.payload.optionData
        }
        if (action.payload.collectionName === 'level') {
          state.level = action.payload.optionData
        }
      })
      .addCase(editOption.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export { fetchHrOptionType, addHrOptionData, deleteOptionData, editOption }

export default optionsSlice.reducer
