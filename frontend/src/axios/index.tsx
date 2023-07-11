import axios, { AxiosError } from 'axios'

// デフォルトの設定を定義
const createAxiosInstance = () => {
  const instance = axios.create({
    //ベースのURLを設定
    baseURL: process.env.REACT_APP_PORT, // ベースURL（APIのエンドポイントに応じて変更）
    timeout: 5000, // タイムアウト時間（ミリ秒）
    //headers:ここでheadersの設定も可能
  })

  //これはaxios.createしたやつにさらに設定を加えてる
  //axiosInstanceを使ってfetch等が行われたときにそれの成功、失敗に応じてthen,catchに
  //はいるけど、その入る前の段階で結果が渡ってくるところ。
  //今回はリダイレクトがcatchの中でできないからここでする
  //axiosInstance使われれてるところだったら勝手ににここに入るから、別で呼び出すは不要
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      console.log(error)
      if (error.response?.status === 401) {
        window.location.href = '/'
        window.localStorage.removeItem('token')
        return error
      }
      return error
    }
  )
  return instance
}

export const axiosInstance = createAxiosInstance()
