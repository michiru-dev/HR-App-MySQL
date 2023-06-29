import axios from 'axios'

// デフォルトの設定を定義
export const axiosInstance = axios.create({
  //ベースのURLを設定
  baseURL: process.env.REACT_APP_PORT, // ベースURL（APIのエンドポイントに応じて変更）
  timeout: 5000, // タイムアウト時間（ミリ秒）
  //headers:ここでheadersの設定も可能
})
