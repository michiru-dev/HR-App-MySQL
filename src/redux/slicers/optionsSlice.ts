import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import db from '../../fireStore/fireStoreConfig'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import {
  fetchContractType,
  fetchDepartmentType,
  fetchPositionType,
  fetchRankType,
} from '../../fireStore/services/hrService'
import { collectionNameBase } from '../../hooks/useSettingInputs'
import { RootState } from '../store'

//💡firebaseから値を取得
//reduxの中でapiの呼び出しは禁止のためcreateAsyncThunkを使う・下の方のextrareducersとセット
const fetchHrOptionType = createAsyncThunk<{
  //returnの型
  contractTypes: Array<OptionBase>
  departmentTypes: Array<OptionBase>
  positionTypes: Array<OptionBase>
  rankTypes: Array<OptionBase>
}>('hrOptions/fetchHrOptionType', async () => {
  const contractArr = await fetchContractType()
  const departmentArr = await fetchDepartmentType()
  const positionArr = await fetchPositionType()
  const rankArr = await fetchRankType()

  //必ずobjectでreturn、リターンするものに名前をつける
  return {
    contractTypes: contractArr,
    departmentTypes: departmentArr,
    positionTypes: positionArr,
    rankTypes: rankArr,
  }
})

//💡firebaseに保存（追加）
const addHrOptionData = createAsyncThunk<
  { optionData: Array<OptionBase>; collectionName: collectionNameBase },
  {
    optionData: OptionBase
    collectionName: collectionNameBase
  }
>(
  'hrOptions/addHrOptionData',
  //createasyncは引数を一つしか渡せないためobjectにしている
  async ({ optionData, collectionName }) => {
    // state.option.contractType.push(optionData)
    //pushしたいけどgetStateの時はできないぽい
    await addDoc(collection(db, collectionName), {
      ...optionData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), //firebaseの時間を追加
    })
    //新しく追加したところだけにfetchをかける
    let updatedList: Array<OptionBase> = []
    if (collectionName === 'contractType') {
      updatedList = await fetchContractType()
    }
    if (collectionName === 'departmentType') {
      updatedList = await fetchDepartmentType()
    }
    if (collectionName === 'positionType') {
      updatedList = await fetchPositionType()
    }
    if (collectionName === 'rankType') {
      updatedList = await fetchRankType()
    }
    return { optionData: updatedList, collectionName }
  }
)

//💡firebaseから削除
const deleteOptionData = createAsyncThunk<
  { newArr: Array<OptionBase>; collectionName: collectionNameBase },
  { docId: string; collectionName: collectionNameBase },
  { state: RootState }
>(
  'options/deleteOptionData',
  async ({ docId, collectionName }, { getState }) => {
    //firebaseから削除
    await deleteDoc(doc(db, collectionName, docId))

    //reduxに削除したやつ以外の最新の配列をいれる
    const state = getState()
    const newArr = state.option[collectionName].filter(
      (collection: OptionBase) => {
        return collection.docId !== docId
      }
    )
    return { newArr: newArr, collectionName: collectionName }
  }
)

//💡firebaseの値を編集
const editOption = createAsyncThunk(
  'option/editOption',
  async ({
    docId,
    collectionName,
    newName,
  }: {
    docId: string
    collectionName: collectionNameBase
    newName: string
  }) => {
    //firebaseの値を編集
    const ref = doc(db, collectionName, docId)
    await updateDoc(ref, { name: newName }) //これの第二引数はオブジェクト！

    //reduxの値を編集
    //編集したところだけにfetchをかける
    let updatedList: Array<OptionBase> = []
    if (collectionName === 'contractType') {
      updatedList = await fetchContractType()
    }
    if (collectionName === 'departmentType') {
      updatedList = await fetchDepartmentType()
    }
    if (collectionName === 'positionType') {
      updatedList = await fetchPositionType()
    }
    if (collectionName === 'rankType') {
      updatedList = await fetchRankType()
    }
    return { optionData: updatedList, collectionName }
  }
)

export type OptionBase = {
  id: string
  name: string
  docId?: string
  createdAt?: firebase.firestore.FieldValue
}

type OptionsState = {
  contractType: Array<OptionBase>
  departmentType: Array<OptionBase>
  rankType: Array<OptionBase>
  positionType: Array<OptionBase>
  isLoading: boolean
}

//そのデータの初期値を定義（スライスを作る準備）
const initialState: OptionsState = {
  contractType: [],
  departmentType: [],
  rankType: [],
  positionType: [],
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
        if (action.payload.collectionName === 'contractType') {
          state.contractType = action.payload.optionData
          //配列を新しいのに置き換え
        }
        if (action.payload.collectionName === 'departmentType') {
          state.departmentType = action.payload.optionData
        }
        if (action.payload.collectionName === 'positionType') {
          state.positionType = action.payload.optionData
        }
        if (action.payload.collectionName === 'rankType') {
          state.rankType = action.payload.optionData
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
        state.contractType = action.payload.contractTypes
        state.departmentType = action.payload.departmentTypes
        state.positionType = action.payload.positionTypes
        state.rankType = action.payload.rankTypes
      })
      .addCase(fetchHrOptionType.rejected, (state) => {
        state.isLoading = false
      })
      //項目の削除
      .addCase(deleteOptionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOptionData.fulfilled, (state, action) => {
        if (action.payload.collectionName === 'contractType') {
          state.contractType = action.payload.newArr
          //配列を新しいのに置き換え
        }
        if (action.payload.collectionName === 'departmentType') {
          state.departmentType = action.payload.newArr
        }
        if (action.payload.collectionName === 'positionType') {
          state.positionType = action.payload.newArr
        }
        if (action.payload.collectionName === 'rankType') {
          state.rankType = action.payload.newArr
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
        if (action.payload.collectionName === 'contractType') {
          state.contractType = action.payload.optionData
          //配列を新しいのに置き換え
        }
        if (action.payload.collectionName === 'departmentType') {
          state.departmentType = action.payload.optionData
        }
        if (action.payload.collectionName === 'positionType') {
          state.positionType = action.payload.optionData
        }
        if (action.payload.collectionName === 'rankType') {
          state.rankType = action.payload.optionData
        }
      })
      .addCase(editOption.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export { fetchHrOptionType, addHrOptionData, deleteOptionData, editOption }

export default optionsSlice.reducer
