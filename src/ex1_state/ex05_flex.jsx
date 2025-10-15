import { useState } from "react"
import "./ex05_flex.css"

export default function FlexEx() {
    const [borderRadius, setBorderRadius] = useState(0);
    return (
        <div className="box" style={{borderRadius: `${borderRadius}px`}}>
            <h2>Bit Short</h2>
            <div>아주 재미있어요!</div>
            <span>👍</span>
            <button onClick={()=> {
                setBorderRadius(borderRadius+10)
            }}>둥글게</button>
            <button onClick={()=>{
                setBorderRadius(0)
            }}>리셋</button>
        </div>
    )
} 