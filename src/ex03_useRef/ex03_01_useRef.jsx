import { useEffect, useRef, useState } from "react";

export default function AddRemove() {
    const [card, setCard] = useState(() => {
        const saved = localStorage.getItem('cards');
        return saved ? JSON.parse(saved) : [];
    });
    const [form, setForm] = useState({
        name:"",
        elementType:"",
        desc:""
    });
    const nameInputRef = useRef(null);

    function deleteCard(idx) {
        setCard(prev => {
            const next = prev.filter( (_, i) => i !==idx)
            // localStorage.setItem("cards", JSON.stringify(next));
            return next;
        });
    }

    function changeHandler(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    function handleSubmit(e) {
        e.preventDefault();
        setCard(prev => {
            const next = [...prev, form];
            return next
        })
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
            {card.map((item, idx) => {
                return (
                    <div 
                        key={idx}
                        style={{
                            border: "1px solid blue",
                            borderRadius: "12px",
                            padding: "20px",
                            margin: "10px",
                            background: "#eeee",
                            boxShadow: "0 2px 8px #eeee",
                            color: 'black'
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