import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";

// createContext 정의하기
const loginContext = createContext();

const userInfo = [
  {id:"id1", pw:"1234"},
  {id:"id2", pw:"4567"},
]

function LoginForm() {
  const [form, setForm] = useState({id:"", pw:""})
  const [error, setError] = useState("");
  const loginRef = useRef(null);
  const {setIsLoginOpen, setUser} = useContext(loginContext);

  function handleChange(e) {
    setForm( (prev) => ({...prev, [e.target.name]: e.target.value}))
    console.log(form)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = userInfo.some(
      (u) => u.id === form.id && u.pw === form.pw
    );
    if (ok) {
      setIsLoginOpen(false);
      setUser(form.id)
    } else {
      setError("아이디/비밀번호가 일치하지 않습니다.")
    }
  }

  useEffect(()=>{
    loginRef.current?.focus();
  }, [])
  return (
    <form 
      onSubmit={handleSubmit}
    >
      <label htmlFor="login_id">ID: </label>
      <input 
        id='login_id' 
        name='id' 
        type="text" 
        value={form.id} 
        onChange={handleChange}
        ref = {loginRef}
      />
      <label htmlFor="login_pw">PW: </label>
      <input 
        id='login_pw' 
        name='pw' 
        type="password" 
        value={form.pw} 
        onChange={handleChange}
      />
        <button type="button" onClick={()=>{
          setForm({id:"", pw:""});
          setIsLoginOpen(false)
        }}>
          취소
        </button>
        <button type="submit">전송</button>
          {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  )
}

function Header() {
  const {user, setIsLoginOpen, setUser} = useContext(loginContext);
  return (
    <header
      style={{
        width:"800px",
        borderBottom: "1px solid lightgray",
        display: "flex",
        alignItems: "center"
      }}
    >
      <h1 style={{flex:1, textAlign:"center"}}>리액트 연습</h1>
      {user ? (
        <div>
          <span>안녕하세요 {user} 님</span>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid gray",
              borderRadius: "9999px",
              cursor: "pointer"
            }}
            onClick={() => setUser(null)}
          >
            로그아웃
          </button>
        </div>
      ): (
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid gray",
            borderRadius: "9999px",
            cursor: "pointer"
          }}
          onClick={()=>setIsLoginOpen(true)}
        >
          로그인
        </button>
      )}
      
    </header>
  )
}

function cardReducer(state, action) {
  switch (action.type) {
    case "AddCard":
      return [...state, action.payload];
    case "DeleteCard":
      return state.filter( (_, i) => i !== action.payload);
    default:
      return state;
  }
}

function AddRemove() {
    // const [card, setCard] = useState(() => {
    //     const saved = localStorage.getItem('cards');
    //     return saved ? JSON.parse(saved) : [];
    // });
    const [card, dispatch] = useReducer(
      cardReducer, 
      [],
      () => {
        const saved = localStorage.getItem('cards');
        return saved ? JSON.parse(saved) : [];
    }

    )
    const [form, setForm] = useState({
        name:"",
        elementType:"",
        desc:""
    });
    const nameInputRef = useRef(null);

    function deleteCard(idx) {
        // setCard(prev => {
        //     const next = prev.filter( (_, i) => i !==idx)
        //     // localStorage.setItem("cards", JSON.stringify(next));
        //     return next;
        // });
        dispatch({type:"DeleteCard", payload:idx})
    }

    function changeHandler(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    function handleSubmit(e) {
        e.preventDefault();
        // setCard(prev => {
        //     const next = [...prev, form];
        //     return next
        // })
        dispatch({type:"AddCard", payload:form});
        setForm({
            name: '',
            elementType: '',
            desc:''
        })
    }

    useEffect( () => {
        localStorage.setItem("cards", JSON.stringify(card));
        nameInputRef.current?.focus();
    }, [card] );


    return (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 200px)",
              gap: "20px",
              justifyContent: "center"
          }}>
            {card.map((item, idx) => {
                return (
                    <div 
                        key={idx}
                        style={{
                            width: "200px",
                            border: "1px solid blue",
                            borderRadius: "12px",
                            padding: "20px",
                            margin: "10px",
                            background: "#eeee",
                            boxShadow: "0 2px 8px #eeee",
                            color: 'black',
                            boxSizing: "border-box"
                        }}
                    
                    >
                        <div>{item.name}</div>
                        <div>{item.elementType}</div>
                        <div>{item.desc}</div>
                        <button onClick={()=>{
                            deleteCard(idx)
                            
                        }}>
                        삭제</button>
                    </div>
                )
            })}
          </div>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름</label>
                    <input 
                      id="name" 
                      type="text" 
                      name='name' 
                      value={form.name} 
                      onChange={(e)=> {
                          changeHandler(e);
                      }}
                      ref={nameInputRef}
                    />
                </div>
                <div>
                    <label htmlFor="element-type">속성</label>
                    <input id="element-type" type="text" name='elementType' value={form.elementType} onChange={(e)=> {
                        changeHandler(e);
                    }}/>
                </div>
                <div>
                    <label htmlFor="desc">설명</label>
                    <input id="desc" type="text" name='desc' value={form.desc} onChange={(e)=> {
                        changeHandler(e);
                    }}/>
                </div>
                <button type="submit">추가</button>
            </form>
        </>
    )
}

export default function MyApp(){
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const value={user, setUser, isLoginOpen, setIsLoginOpen}
  return (
    <loginContext.Provider value={value}>
      <Header />
      {isLoginOpen && !user && (
        <LoginForm /> 
      )}
      <AddRemove />
    </loginContext.Provider>
  )
}