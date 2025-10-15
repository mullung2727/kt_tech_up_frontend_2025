import { useState } from "react";

export default function UseStateEx() {
    const [text, setText] = useState("아래에 글씨를 입력하세요")
    const [color, setColor] = useState('')

    return (
        <>
            <button onClick={()=>setColor("red")}>빨강색</button>
            <button onClick={()=>setColor("blue")}>파랑색</button>
            <h2 style={{color:color}}>{text}</h2>
            <input type="text" onChange={(e)=>{
                setText(e.target.value)
            }}/>
        </>
    )
}