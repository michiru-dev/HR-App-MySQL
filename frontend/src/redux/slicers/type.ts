import firebase from 'firebase/compat/app'

export type EmployeeBase = {
  first_name: string
  last_name: string
  first_furigana: string
  last_furigana: string
  birthday: string
  phone_number: string
  education: string
  hire_date: string
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
