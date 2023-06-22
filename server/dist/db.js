"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = __importDefault(require("mysql2")); //npm i mysql と　npm install @types/mysql
//mysql2もインポートしてる。mysqlだけだと接続のパスワード関係のエラーが出る。
//解決方法がmysql2をインストールするか↓これをmysqlでしないといけない
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
const dotenv_1 = __importDefault(require("dotenv"));
//nodejsの時はdotenvでenvファイル作る
dotenv_1.default.config();
// 環境変数からデータベース接続情報を取得
const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};
//mySQLへ接続
exports.connection = mysql2_1.default.createConnection(dbConfig);
//.connectで接続を開く
exports.connection.connect((error) => {
    if (error) {
        console.error('An error occurred while connecting to the DB: ' + error.stack);
        return;
    }
    console.log('Connected to the database as id ' + exports.connection.threadId);
});
exports.default = exports.connection;
