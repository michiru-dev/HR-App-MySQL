import EmployeeList from '../components/pages/employementsList'
import LandingPage from '../components/pages/landing'
import Register from '../components/pages/register'
import Setting from '../components/pages/setting/Index'

export const routes = [
  {
    path: '/home',
    Component: LandingPage, //Landingコンポーネントを呼び出してるけど実行はしていない
    //名前をLandingPageからComponentに変えてる
  },
  {
    path: '/home/setting',
    Component: Setting,
  },
  {
    path: '/home/register',
    Component: Register,
  },
  {
    path: '/home/employeeList',
    Component: EmployeeList,
  },
]
