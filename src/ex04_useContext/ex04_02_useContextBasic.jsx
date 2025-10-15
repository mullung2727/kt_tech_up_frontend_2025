import { createContext, useContext } from "react";

const UserContest = createContext();

function FirstComponent() {
  return (
    <div>
      <h1>첫 번째 컴포넌트</h1>
      <SecondComponent />
    </div>
  )
}

function SecondComponent() {
  const userName = useContext(UserContest);
  return (
    <div>
      <h1>{userName} 입니다.</h1>
    </div>

  )
}

export default function TestContext() {
  const userName = 'jwj';
  return (
    <UserContest.Provider value={userName}>
      <h1>App</h1>
      <FirstComponent/>
    </UserContest.Provider>
  )
}