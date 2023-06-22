import firebase from 'firebase/compat/app'

export type EmployeeBase = {
  firstName: string
  lastName: string
  firstFurigana: string
  lastFurigana: string
  birthday: string
  phoneNumber: string
  education: string
  hireDate: string
  contractType: string
  department: string
  rank: string
  position: string
  docId: string
}

//omitでid以外のtypeを作成
export type EmployeeWithoutDocId = Omit<EmployeeBase, 'docId'>

export type OptionBase = {
  id: string
  name: string
  docId?: string
  createdAt?: firebase.firestore.FieldValue
}
