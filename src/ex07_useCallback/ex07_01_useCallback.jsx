import { memo, useCallback, useMemo, useState } from "react";

function Child({onClick}) {
  console.log("Child 렌더링");
  return <button onClick={onClick}>+1</button>
}

const MemoChild = memo(Child);

export default function UseCallbackEx() {
  const [n, setN] = useState(0);
  const [label, setLabel] = useState("메모");

  const handeAdd = useCallback(
    () => setN( (prev)=>prev+1),
    []
  );

  return (
    <div>
      <h3>값: {n}</h3>
      <p>라벨: {label}</p>
      <MemoChild onClick={handeAdd}/>
      <button onClick={()=>setLabel(prev=>prev+"!")}>라벨 변경</button>
    </div>
  )
}