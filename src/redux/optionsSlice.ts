import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { QueryDocumentSnapshot, DocumentData } from '@firebase/firestore-types'
import db from '../fireStore/fireStoreConfig'

//firebaseに保存
const addOpionData = async (optionData: OptionBase, collectionName: string) => {
  try {
    await addDoc(collection(db, collectionName), optionData)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

//firebaseから削除
const deleteOptionData = async (docId: string, collectionName: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// const querySnapshot = getDocs(collection(db, 'contractType'))
// querySnapshot.forEach((doc) => {
//   if (doc.id === action.payload) {
//     deleteOptionData(doc.id, 'contractType')
//   }
// })

//reduxの中でapiの呼び出しは禁止のためcreateAsyncThunkを使う
//下の方のextrareducersとセット
const fetchHrOptionType = createAsyncThunk<{
  contractTypes: Array<OptionBase>
  departmentTypes: Array<OptionBase>
  positionTypes: Array<OptionBase>
  rankTypes: Array<OptionBase>
  //名前をつける
}>('options/fetchHrOptionType', async () => {
  //contractTypeのデータを見る
  const getContractType = collection(db, 'contractType')
  const getDepartmentType = collection(db, 'departmentType')
  const getPositionType = collection(db, 'positionType')
  const getRankType = collection(db, 'rankType')

  //データを取得
  const snapShotContract = await getDocs(getContractType)
  const snapShotDepartment = await getDocs(getDepartmentType)
  const snapShotPosition = await getDocs(getPositionType)
  const snapShotRank = await getDocs(getRankType)

  //doc.data()はjson.stringfy的な感じ。データを読めるようにする
  //↓こんな感じのが返ってくる
  // const obj = {
  //   id: 'sadds',
  //   name: 'sdffd',
  // }

  // const convertFbData = (doc: QueryDocumentSnapshot<DocumentData>) => ({
  //   ...(doc.data() as OptionBase),
  //   docId: doc.id,
  // })

  const contractArr = snapShotContract.docs.map((doc) => ({
    //docsはもともとあるやつ
    ...(doc.data() as OptionBase),
    docId: doc.id, //objectにdocIdを追加。これはfirebase上のID
    //スプレッドは以下をしてるのと同じ。.idと.nameが勝手にプロパティ名になる
    //  id: doc.data().id,
    // name: doc.data().name,
  }))

  const departmentArr = snapShotDepartment.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
  }))
  const positionArr = snapShotPosition.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
  }))
  const rankArr = snapShotRank.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
  }))

  //必ずobjectでreturn、リターンするものに名前をつける
  return {
    contractTypes: contractArr,
    departmentTypes: departmentArr,
    positionTypes: positionArr,
    rankTypes: rankArr,
  }
})

export type OptionBase = {
  id: string
  name: string
  docId?: string
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
  contractType: [],
  department: [],
  rank: [],
  position: [],
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
      //firebaseから削除
      const target = state.contractType.find(
        //一致した最初の要素を返す（ここではオブジェクト）
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'contractType')

      //見た目から削除
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
      const target = state.contractType.find(
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'contractType')

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
      const target = state.contractType.find(
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'contractType')

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
      const target = state.contractType.find(
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'contractType')

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
      .addCase(fetchHrOptionType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHrOptionType.fulfilled, (state, action) => {
        state.isLoading = false
        state.contractType = action.payload.contractTypes
        state.department = action.payload.departmentTypes
        state.position = action.payload.positionTypes
        state.rank = action.payload.rankTypes
      })
      .addCase(fetchHrOptionType.rejected, (state) => {
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

export { fetchHrOptionType }

export default optionsSlice.reducer
