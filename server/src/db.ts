import mysql from 'mysql2' //npm i mysql と　npm install @types/mysql
//mysql2もインポートしてる。mysqlだけだと接続のパスワード関係のエラーが出る。
//解決方法がmysql2をインストールするか↓これをmysqlでしないといけない
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
import dotenv from 'dotenv'

//nodejsの時はdotenvでenvファイル作る
dotenv.config()

// 環境変数からデータベース接続情報を取得
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}

//mySQLへ接続
export const connection = mysql.createConnection(dbConfig)

//.connectで接続を開く
connection.connect((error) => {
  if (error) {
    console.error(
      'An error occurred while connecting to the DB: ' + error.stack
    )
    return
  }
  console.log('Connected to the database as id ' + connection.threadId)
})

export default connection
