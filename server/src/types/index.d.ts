import { Express } from 'express-serve-static-core'
import { JwtPayload } from 'jsonwebtoken'

//Requestの元の型にuser_idを追加
declare module 'express-serve-static-core' {
  export interface Request {
    user_id: string | JwtPayload
  }
}

//tscofigにtypeRootsの指定が必要！！
