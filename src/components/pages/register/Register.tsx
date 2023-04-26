import React from 'react'
import Button from '../../common/Button'

function Register() {
  return (
    <div>
      <label htmlFor="nameKanji">名前</label>
      <input id="nameKanji" type="text" placeholder="性" />
      <input type="text" placeholder="名" />
      <label htmlFor="nameKatakata">フリガナ</label>
      <input id="nameKataka" type="text" placeholder="セイ" />
      <input type="text" placeholder="メイ" />
      <label htmlFor="birthday">生年月日</label>
      <input id="birthday" type="date" />
      <label htmlFor="address">住所</label>
      <label htmlFor="postalCode">郵便番号</label>
      <input id="postalCode" type="number" />
      <label htmlFor="finalEducation">最終学歴</label>
      <input id="finalEducation" type="text" />
      <label htmlFor="enterDate">入社日</label>
      <input id="enterDate" type="date" />
      <label htmlFor="contract-type">契約形態</label>
      <select name="contract-type" id="contract-type">
        <option value=""></option>
        <option value="">正社員</option>
        <option value="">嘱託</option>
        <option value="">派遣</option>
        <option value="">パート</option>
      </select>
      <label htmlFor="department">部署</label>
      <select name="department" id="department">
        <option value=""></option>
        <option value="">人事部</option>
        <option value="">経理部</option>
        <option value="">情報システム部</option>
        <option value="">第一営業部</option>
        <option value="">第二営業部</option>
        <option value="">第三営業部</option>
      </select>
      <label htmlFor="rank">等級</label>
      <select name="rank" id="rank">
        <option value=""></option>
        <option value="">一級</option>
        <option value="">二級</option>
        <option value="">三級</option>
        <option value="">四級</option>
        <option value="">五級</option>
      </select>
      <label htmlFor="position">役職</label>
      <select name="position" id="position">
        <option value=""></option>
        <option value="">主査</option>
        <option value="">課長</option>
        <option value="">課長代理</option>
        <option value="">部長</option>
        <option value="">統括部長</option>
      </select>

      <Button text={'登録'} />
    </div>
  )
}

export default Register
