import express from 'express'
import { connection } from './db'

const app = express()
const port = 8000

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: '*',
  contentType: 'Content-Type',
}

//ミドルウェア
//レスポンスヘッダーの中でクライアント側の要求を許可する
app.use(function (req, res, next) {
  //リクエスト元のオリジンを許可
  res.header('Access-Control-Allow-Origin', corsOptions.origin)
  //メソッドを許可。postとかdeleteとか
  res.header('Access-Control-Allow-Methods', corsOptions.methods)
  //リクエストヘッダーを許可。ここではcontent-type
  res.header('Access-Control-Allow-Headers', corsOptions.contentType)
  next()
})

//フォームからデータを受け取って実行できる形式に変換
//渡ってくるデータが文字列、配列のときはurlencoded、json objectのときはjson
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

app.listen(port, () => {
  console.log('server running!')
})

app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (error, results) => {
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

// app.post('/employees', (req, res) => {
//     const newEmployee = req.body;
//     connection.query('INSERT INTO employees (name, email) VALUES (?, ?)', [name, email], (error, results) => {
//       if (error) {
//         return res.status(500).send(error);
//       }
//       res.status(201).send('Employee added successfully!');
//     });
//   });
