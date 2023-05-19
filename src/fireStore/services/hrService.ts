import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import db from '../../fireStore/fireStoreConfig'
import { OptionBase } from '../../redux/optionsSlice'

//contractTypeのデータを取得
export const fetchContractType = async () => {
  //Typeのデータを見てqueryとorderByで並び替え
  const getContractType = query(
    collection(db, 'contractType'),
    orderBy('createdAt')
  )

  //データを取得
  const snapShot = await getDocs(getContractType)

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
  const contractArr = snapShot.docs.map((doc) => ({
    //docsはもともとあるやつ
    ...(doc.data() as OptionBase),
    docId: doc.id, //objectにdocIdを追加。これはfirebase上のID
    createdAt: doc.data().createdAt.seconds, //reduxがsecondsじゃないと理解してくれないため
    //createdAtの値を上書き
    //スプレッドは以下をしてるのと同じ。.idと.nameが勝手にプロパティ名になる
    //  id: doc.data().id,
    // name: doc.data().name,
  }))
  return contractArr
}

//Department Typeのデータを取得
export const fetchDepartmentType = async () => {
  const getDepartmentType = query(
    collection(db, 'departmentType'),
    orderBy('createdAt')
  )
  const snapShot = await getDocs(getDepartmentType)
  const departmentArr = snapShot.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
    createdAt: doc.data().createdAt.seconds,
  }))
  return departmentArr
}

//positionTypeのデータを取得
export const fetchPositionType = async () => {
  const getPositionType = query(
    collection(db, 'positionType'),
    orderBy('createdAt')
  )
  const snapShot = await getDocs(getPositionType)
  const positionArr = snapShot.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
    createdAt: doc.data().createdAt.seconds,
  }))
  return positionArr
}

//rankTypeのデータを取得
export const fetchRankType = async () => {
  const getRankType = query(collection(db, 'rankType'), orderBy('createdAt'))
  const snapShot = await getDocs(getRankType)
  const rankArr = snapShot.docs.map((doc) => ({
    ...(doc.data() as OptionBase),
    docId: doc.id,
    createdAt: doc.data().createdAt.seconds,
  }))
  return rankArr
}
