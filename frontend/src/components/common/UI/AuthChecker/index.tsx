import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export function AuthChecker({ children }: { children: ReactNode }) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  // トークンの確認とリダイレクトの処理
  if (!token && location.pathname !== '/') {
    return <Navigate to="/" />
  }

  // トークンが存在する場合は子コンポーネントを表示
  return <>{children}</>
}
