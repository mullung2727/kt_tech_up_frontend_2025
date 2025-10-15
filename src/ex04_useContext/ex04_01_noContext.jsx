function FirstComponent({userName}) {
  return (
    <div>
      <h1>첫 번째 컴포넌트</h1>
      <SecondComponent userName={userName}/>
    </div>
  )
}

function SecondComponent({userName}) {
  return (
    <h1>{userName} 입니다.</h1>
  )
}

export default function TestContext() {
  const userName = "wj";
  return (
    <div>
      <h1>App</h1>
      <FirstComponent userName={userName}/>
    </div>
  )
}