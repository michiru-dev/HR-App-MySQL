import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore'
// import { QueryDocumentSnapshot, DocumentData } from '@firebase/firestore-types'
import db from '../fireStore/fireStoreConfig'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

//firebaseに保存（追加）
const addOptionData = async (
  optionData: OptionBase,
  collectionName: string
) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...optionData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), //firebaseの時間を追加
    })
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

//firebaseの値を編集
const editOption = async (
  docId: string,
  collectionName: string,
  newName: string
) => {
  try {
    const ref = doc(db, collectionName, docId)
    await updateDoc(ref, { name: newName }) //これの第二引数はオブジェクト！
  } catch (e) {
    console.error('Error editting document: ', e)
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
  //Typeのデータを見てqueryとorderByで並び替え
  const getContractType = query(
    collection(db, 'contractType'),
    orderBy('createdAt')
  )
  const getDepartmentType = query(
    collection(db, 'departmentType'),
    orderBy('createdAt')
  )
  const getPositionType = query(
    collection(db, 'positionType'),
    orderBy('createdAt')
  )
  const getRankType = query(collection(db, 'rankType'), orderBy('createdAt'))

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

  //docIdの追加とcreatedIdの値の変換を行う
  const contractArr = snapShotContract.docs.map((doc) => ({
    //docsはもともとあるやつ
    ...(doc.data() as OptionBase),
    docId: doc.id, //objectにdocIdを追加。これはfirebase上のID
    createdAt: doc.data().createdAt.seconds, //reduxがsecondsじゃないと理解してくれないため
    //createdAtの値を上書き
    //スプレッドは以下をしてるのと同じ。.idと.nameが勝手にプロパティ名になる
    //  id: doc.data().id,
    // name: doc.data().name,
  }))

  const departmentArr = snapShotDepartment.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
    createdAt: doc.data().createdAt.seconds,
  }))
  const positionArr = snapShotPosition.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
    createdAt: doc.data().createdAt.seconds,
  }))
  const rankArr = snapShotRank.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
    createdAt: doc.data().createdAt.seconds,
  }))

  console.log(contractArr)

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
  createdAt?: firebase.firestore.FieldValue
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
      addOptionData(action.payload, 'contractType') //firebase
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
          if (contract.docId) {
            //このif文はtsのため。
            //contract.idの型をstring or undefinedにしてるためundefinedだとeditoptionに渡せないからundefinedでないことをチェックしている
            editOption(contract.docId, 'contractType', action.payload.name)
          }
        }
      })
    },
    //部署
    addDepartmentType: (state, action: PayloadAction<OptionBase>) => {
      state.department.push(action.payload)
      addOptionData(action.payload, 'departmentType')
    },
    deleteDepartmentType: (state, action: PayloadAction<string>) => {
      const target = state.department.find(
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'departmentType')

      const newDepartmentArray = state.department.filter((department) => {
        return department.id !== action.payload
      })
      state.department = newDepartmentArray
    },
    editDepartmentType: (state, action: PayloadAction<OptionBase>) => {
      state.department.map((department) => {
        if (department.id === action.payload.id) {
          department.name = action.payload.name
          if (department.docId) {
            editOption(department.docId, 'departmentType', action.payload.name)
          }
        }
      })
    },
    //等級
    addRankType: (state, action: PayloadAction<OptionBase>) => {
      state.rank.push(action.payload)
      addOptionData(action.payload, 'rankType')
    },
    deleteRankType: (state, action: PayloadAction<string>) => {
      const target = state.rank.find(
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'rankType')

      const newRankArray = state.rank.filter((rank) => {
        return rank.id !== action.payload
      })
      state.rank = newRankArray
    },
    editRankType: (state, action: PayloadAction<OptionBase>) => {
      state.rank.map((rank) => {
        if (rank.id === action.payload.id) {
          rank.name = action.payload.name
          if (rank.docId) {
            editOption(rank.docId, 'rankType', action.payload.name)
          }
        }
      })
    },
    //役職
    addPositionType: (state, action: PayloadAction<OptionBase>) => {
      state.position.push(action.payload)
      addOptionData(action.payload, 'positionType')
    },
    deletePositionType: (state, action: PayloadAction<string>) => {
      const target = state.position.find(
        (contract) => contract.id === action.payload
      )
      if (typeof target === 'undefined' || typeof target.docId === 'undefined')
        return
      deleteOptionData(target.docId, 'positionType')

      const newPositionArray = state.position.filter((position) => {
        return position.id !== action.payload
      })
      state.position = newPositionArray
    },
    editPositionType: (state, action: PayloadAction<OptionBase>) => {
      state.position.map((position) => {
        if (position.id === action.payload.id) {
          position.name = action.payload.name
          if (position.docId) {
            editOption(position.docId, 'positionType', action.payload.name)
          }
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
