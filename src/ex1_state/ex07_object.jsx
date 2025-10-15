import { useState } from "react";

export default function ObjectEx() {
    const [form, setForm] = useState({
        name:"",
        text:"",
        rating:"",
    })
    const changeHandler = (e) => {
        const newForm = {...form, [e.target.name]: e.target.value}
        setForm(newForm)
    }
    return (
        <>
            <h2>제목: {form.name}</h2>
            <input type="text" name="name" value={form.name} onChange={changeHandler}/>
            <h3>내용 : {form.text}</h3>
            <input type="text" name="text" value={form.text} onChange={changeHandler}/>
            <h3>평점 : {form.rating ? `${form.rating}점` : "(선택안함)"}</h3>
            <select name="rating" value={form.rating} onChange={changeHandler}>
                <option value="">평점 선택</option>
                <option value="1">1점</option>
                <option value="2">2점</option>
                <option value="3">3점</option>
                <option value="4">4점</option>
                <option value="5">5점</option>
            </select>
        </>
    )
}