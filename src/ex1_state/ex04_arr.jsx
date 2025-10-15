import { useState } from "react";

export default function UseStateArr() {
    const [titleList, setTitleList] = useState(['진격의 거인', '기생충', '빅숏'])
    const [thumbsup, setThumbsup] = useState([0, 0, 0])
    
    function addThumbsup(idx) { //idx = 0
        // setThumbsup(thumbsup.map( (cnt, i) => {
        //     if( i===idx) { // cnt = 3 /i = 0
        //         return cnt +1 //cnt = 4
        //     }
        //     return cnt 
        // })) // [3, 10, 6] -> [4, 10, 6]
        setThumbsup( prev => (
            prev.map( (cnt, i) => (
                i===idx ? cnt+1 : cnt
             ) )
         ) )

    }
    return (
        <>
            {titleList.map( (title, idx) => {
                return <div key={idx}>
                    <h2>{title}</h2>
                    <button onClick={() => addThumbsup(idx)}>👍</button>
                    <span>{thumbsup[idx]}</span>
                </div>
            } )}
        </>
    )
}