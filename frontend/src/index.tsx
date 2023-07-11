import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import '../src/components/common/UI/Button/button.scss'
import './components/common/UI/LinkButton/linkButton.scss'
import '../src/components/common/UI/LoadingSpinner/loadingspinner.scss'
import '../src/components/common/UI/Header/header.scss'
import '../src/components/common/UI/Footer/footer.scss'
import '../src/components/pages/landing/landing.scss'
import '../src/components/pages/register/register.scss'
import '../src/components/pages/setting/setting.scss'
import '../src/components/pages/employementsList/employementsList.scss'
import '../src/components/pages/login/login.scss'

import App from './App'
import { Provider } from 'react-redux'
import store from '../src/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* storeとアプリ自体を繋ぐ役目。囲ったやつでstoreにアクセスできるようになる */}
      <App />
    </Provider>
  </React.StrictMode>
)
