import { useState } from "react"

const likes = {
    "리액트 잘하는 방법": 20,
    "map 연습": 30,
    "자바스크립트 스터디": 14
}

function Title({title, thumbsup}) {
    const [newThumbsup, setThumbsup] = useState(thumbsup);
    return (
        <div style={{height:100, padding:10, margin:10, border:"1px solid white"}}>
            <h3 >{title}</h3>
            <button onClick={()=>setThumbsup(newThumbsup+1)}>👍</button>
            <span>{newThumbsup} likes</span>
        </div>
    )
}

export default function TitleList() {
    return (
        <>
            {Object.entries(likes).map( ([title, thumbsup], index) => {
                return <Title key={index} title={title} thumbsup={thumbsup} />
            } )}
        </>
    )
}