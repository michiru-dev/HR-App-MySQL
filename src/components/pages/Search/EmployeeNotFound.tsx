import React from 'react'

function EmployeeNotFound() {
  return (
    <div className="employeeNotFoundBox">
      <h2>該当者がいません</h2>
      <p>完全一致での検索のため、苗字または名前を正しく入力してください。</p>
    </div>
  )
}

export default EmployeeNotFound
