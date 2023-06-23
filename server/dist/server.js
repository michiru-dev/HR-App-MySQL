"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 8000;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: '*',
    contentType: 'Content-Type',
};
//ミドルウェア
//レスポンスヘッダーの中でクライアント側の要求を許可する
app.use(function (req, res, next) {
    //リクエスト元のオリジンを許可
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    //メソッドを許可。postとかdeleteとか
    res.header('Access-Control-Allow-Methods', corsOptions.methods);
    //リクエストヘッダーを許可。ここではcontent-type
    res.header('Access-Control-Allow-Headers', corsOptions.contentType);
    next();
});
//フォームからデータを受け取って実行できる形式に変換
//渡ってくるデータが文字列、配列のときはurlencoded、json objectのときはjson
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//最初のページ
app.get('/', (req, res) => {
    res.status(200).send('hello');
});
//ポートに繋ぐ
app.listen(port, () => {
    console.log('server running!');
});
//employeesデータ取得
app.get('/employees', (req, res) => {
    db_1.connection.query('SELECT * FROM employees', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
        //expressのres.jsonは特殊
        //res.jsonはres.sendの機能も持ってるため.sendいらない
        //レスポンスヘッダーの Content-Type を application/json に自動的に設定
        //引数として与えられたjsオブジェクトを自動的にJSON形式の文字列に変換
    });
});
//employeesデータ送信
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    //Object.keysはオブジェクトのすべてのキー（プロパティ名）を配列として返す、
    // newEmployeeが { name: 'John', email: 'asdfad' } の場合['name', 'email'] を返す
    //そしてjoinでこれらのキーをカンマで区切った文字列に変換→'name, email'
    const columns = Object.keys(newEmployee).join(', ');
    //これもほぼ同じ。キーを配列にしてそれを一つずつ?に変換してそれを文字列に
    const placeholders = Object.keys(newEmployee)
        .map(() => '?')
        .join(', ');
    //Object.valuesはオブジェクトの全てのプロパティ値を配列として返す、
    // newEmployeeが { name: 'John', email: 'asdfad' } の場合['John', 'asdfad'] を返す
    const values = Object.values(newEmployee);
    const query = `INSERT INTO employees (${columns}) VALUES (${placeholders})`;
    //connection.query；第一引数はSQLクエリ（必須）、第二引数はプレースホルダー？を使ってれば値、第三引数はコールバック（任意）
    //コールバックはSQLクエリが実行された後に呼び出される
    db_1.connection.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).send('Employee added successfully!');
    });
});
//contract取得
app.get('/contract', (req, res) => {
    db_1.connection.query('SELECT * FROM contract ORDER BY created_at DESC', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
        console.log(results);
    });
});
//departments取得
app.get('/departments', (req, res) => {
    db_1.connection.query('SELECT * FROM departments ORDER BY created_at DESC', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
    });
});
//rank取得
app.get('/rank', (req, res) => {
    db_1.connection.query('SELECT * FROM rank ORDER BY created_at DESC', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
    });
});
//positions取得
app.get('/positions', (req, res) => {
    db_1.connection.query('SELECT * FROM positions ORDER BY created_at DESC', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
    });
});
