import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './redux/hooks'
import { fetchHrOptionType } from './redux/slicers/optionsSlice'
import { Login } from './components/pages/login'
import { AuthChecker } from './components/common/UI/AuthChecker'
import { routes } from './routes'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHrOptionType())
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* ここから下で他のページのRouteを表示 */}
          {routes.map(({ path, Component }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  // トークンがローカルに存在するかの確認
                  <AuthChecker>
                    <Component />
                  </AuthChecker>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
