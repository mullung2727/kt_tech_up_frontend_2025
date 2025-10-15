import { useReducer } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state+1;
    case "DECREMENT":
      return state-1;
    case "RESET":
      return 0;
    default:
      return state;
  }
  // To Do : switch로 INCREMENT, DECREMENT, RESET 구현해보기
}

export default function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h2>예시 1: 카운터</h2>
      <p>카운트: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>리셋</button>
    </div>
  );
}