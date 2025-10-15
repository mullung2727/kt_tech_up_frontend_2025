import { useMemo, useState } from "react";

function slowSum(n) {
  console.log("계산 시작");
  let s = 0;
  for (let i=0; i<50_000_000; ++i) {
    s = (s+i) %100;
  }
  s = 1;
  return s + n
}

export default function UseMemoEx() {
  const [n, setN] = useState(0);
  const [label, setLabel] = useState("메모");

  const value = useMemo( ()=> {
    return slowSum(n);
  }, [n])
  
  return (
    <div>
      <h3>값: {value}</h3>
      <p>라벨: {label}</p>
      <button onClick={()=>setN(prev=>prev+1)}>숫자 + 1</button>
      <button onClick={()=>setLabel(prev=>prev+"!")}>라벨 변경</button>
    </div>
  )
}