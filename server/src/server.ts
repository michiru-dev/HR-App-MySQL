import express from 'express'
import { connection } from './db'
const cors = require('cors')

const app = express()
const port = 8000

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: '*',
  contentType: 'Content-Type',
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    // methods: '*',
    // contentType: 'Content-Type',
  })
)

//ミドルウェア
//レスポンスヘッダーの中でクライアント側の要求を許可する
// app.use(function (req, res, next) {
//   //リクエスト元のオリジンを許可
//   res.header('Access-Control-Allow-Origin', corsOptions.origin)
//   //メソッドを許可。postとかdeleteとか
//   res.header('Access-Control-Allow-Methods', corsOptions.methods)
//   //リクエストヘッダーを許可。ここではcontent-type
//   res.header('Access-Control-Allow-Headers', corsOptions.contentType)
//   next()
// })

//フォームからデータを受け取って実行できる形式に変換
//渡ってくるデータが文字列、配列のときはurlencoded、json objectのときはjson
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//最初のページ
app.get('/', (req, res) => {
  res.status(200).send('hello')
})

//ポートに繋ぐ
app.listen(port, () => {
  console.log(`server running on ${port}!`)
})

//app.getはページがロードされたときに全てのapp.getが実行される
//第二引数のコールバックは定義がされるだけで、第一引数のエンドポイントにアクセスがあったときに実行される

//employeesデータ取得
app.get('/employees', (req, res) => {
  //FROMのあとはemployeesに合体させたテーブル
  //その大きいテーブルからSELECT以降を選択
  const query = `SELECT
    employees.*,
    positions.name AS position_name,
    departments.name AS department_name,
    degree.name AS degree_name,
    contract.name AS contract_name
  FROM
    employees
    JOIN positions ON employees.position_id = positions.id
    JOIN departments ON employees.department_id = departments.id
    JOIN degree ON employees.degree_id = degree.id
    JOIN contract ON employees.contract_id = contract.id`

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    res.status(200).json(results)
    //expressのres.jsonは特殊
    //res.jsonはres.sendの機能も持ってるため.sendいらない
    //レスポンスヘッダーの Content-Type を application/json に自動的に設定
    //引数として与えられたjsオブジェクトを自動的にJSON形式の文字列に変換
  })
})

//employeesデータ送信
app.post('/employees/post', (req, res) => {
  const newEmployee = req.body
  console.log(req.body)

  //Object.keysはオブジェクトのすべてのキー（プロパティ名）を配列として返す、
  // newEmployeeが { name: 'John', email: 'asdfad' } の場合['name', 'email'] を返す
  //そしてjoinでこれらのキーをカンマで区切った文字列に変換→'name, email'
  const columns = Object.keys(newEmployee).join(', ')
  console.log(columns)

  //これもほぼ同じ。キーを配列にしてそれを一つずつ?に変換してそれを文字列に
  const placeholders = Object.keys(newEmployee)
    .map(() => '?')
    .join(', ')
  console.log(placeholders)

  //Object.valuesはオブジェクトの全てのプロパティ値を配列として返す、
  // newEmployeeが { name: 'John', email: 'asdfad' } の場合['John', 'asdfad'] を返す
  const values = Object.values(newEmployee)
  console.log(values)

  const query = `INSERT INTO employees (${columns}) VALUES (${placeholders})`

  //connection.query；第一引数はSQLクエリ（必須）、第二引数はプレースホルダー？を使ってれば値、第三引数はコールバック（任意）
  //コールバックはSQLクエリが実行された後に呼び出される
  connection.query(query, values, (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).send(error)
    }
    res.status(201).send('Employee added successfully!')
  })
})

//🍎各種設定 取得（get）関数
const generateGetHandler = (tableName: string) => {
  return (req: any, res: any) => {
    //無名関数
    connection.query(
      `SELECT * FROM ${tableName} ORDER BY created_at`,
      (error, results) => {
        if (error) {
          console.error(error)
          //早期リターンのreturn
          return res.status(500).send(error)
        }
        res.status(200).json(results)
      }
    )
  }
}

//各種設定 取得 実行
app.get('/contract', generateGetHandler('contract'))
app.get('/departments', generateGetHandler('departments'))
app.get('/degree', generateGetHandler('degree'))
app.get('/positions', generateGetHandler('positions'))

// //上の二つを合わせたのがこれ
// app.get('/contract', (req, res) => {
//   connection.query( 'SELECT * FROM contract ORDER BY created_at',
//     (error, results) => { if (error) { return res.status(500).send(error)}
//       res.status(200).json(results)} ) })

//🍎各種設定　追加（post）関数
const generatePostHandler = (tableName: string) => {
  return (req: any, res: any) => {
    const newItemObj = req.body
    const newItem = Object.values(newItemObj)
    const query = `INSERT INTO ${tableName}(name) VALUES (?)`
    connection.query(query, newItem, (error, results) => {
      if (error) {
        return res.status(500).send(error)
      }
      res.status(201).send('item added successfully!')
    })
  }
}
//各種設定　追加　実行
app.post('/contract/post', generatePostHandler('contract'))
app.post('/departments/post', generatePostHandler('departments'))
app.post('/degree/post', generatePostHandler('degree'))
app.post('/positions/post', generatePostHandler('positions'))

//🍎各種設定　削除（delete）関数
const generateDeleteHandler = (tableName: string) => {
  return (req: any, res: any) => {
    const { id } = req.body
    const query = `DELETE FROM ${tableName} WHERE id = ?`
    connection.query(query, id, (error, result) => {
      if (error) {
        return res.status(404).send(error)
      }
      res.status(204).send('item deleted successfully')
    })
  }
}

//各種設定　削除　実行
app.delete('/contract/delete', generateDeleteHandler('contract'))
app.delete('/departments/delete', generateDeleteHandler('departments'))
app.delete('/degree/delete', generateDeleteHandler('degree'))
app.delete('/positions/delete', generateDeleteHandler('positions'))

//🍎各種設定　編集（put）関数
const generatePutHandler = (tableName: string) => {
  return (req: any, res: any) => {
    const { id, newName } = req.body
    console.log(id, newName)
    const query = `UPDATE ${tableName} SET name=? WHERE id=?`
    connection.query(query, [newName, id], (error, result) => {
      if (error) {
        return res.status(404).send(error)
      }
      res.status(204).send('item updated successfully!')
    })
  }
}

//各種設定　編集　実行
app.put('/contract/put', generatePutHandler('contract'))
app.put('/departments/put', generatePutHandler('departments'))
app.put('/degree/put', generatePutHandler('degree'))
app.put('/positions/put', generatePutHandler('positions'))
