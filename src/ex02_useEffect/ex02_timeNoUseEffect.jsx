import { useEffect, useState } from "react";

export default function Timer() {
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [records, setRecord] = useState([])
    useEffect( () => {
        if (isRunning) {
            const id = setInterval( ()=> setSecond(prev=>prev+1), 1000)
            return (()=> {
                clearInterval(id);
                setSecond(0);
                setRecord([]);
            })
        }
    }, [isRunning])

    return (
        <>
            <h1>{second} 초</h1>
            <button onClick={()=>{
                setIsRunning(!isRunning);
            }}>
                {isRunning ? "정지" : "시작"}
            </button>
            <button onClick={()=>setRecord(prev => ([...prev, second]))}>기록</button>
            <h2>Records</h2>
            <ul style={{height:200, overflowY: "auto"}}>
                {records.map( (time, idx) => (
                    <li key={idx}>{time} 초</li>
                ))}
            </ul>
        </>
    )
}