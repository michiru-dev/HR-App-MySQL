export type EmployeeBase = {
  first_name: string | null
  last_name: string | null
  first_furigana: string | null
  last_furigana: string | null
  birthday: string | null
  phone_number: string | null
  education: string | null
  hire_date: string | null
  contract_id: string | null
  contract_name?: string | null
  department_id: string | null
  department_name?: string | null
  degree_id: string | null
  degree_name?: string | null
  position_id: string | null
  position_name?: string | null
  employee_id?: string
}

//omitでid以外のtypeを作成
export type EmployeeWithoutId = Omit<EmployeeBase, 'id'>

export type OptionBase = {
  id?: string
  name: string
  createdAt?: Date
}
