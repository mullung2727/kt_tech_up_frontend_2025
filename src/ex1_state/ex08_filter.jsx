import { useState } from "react";

export default function Filter() {
    const products = [
        { name: "노트북", price: 1200000, description: "고성능 업무용 노트북" },
        { name: "키보드", price: 35000, description: "기계식 키보드" },
        { name: "마우스", price: 9000, description: "무선 마우스" },
        { name: "이어폰", price: 9000, description: "가성비 좋은 유선 이어폰" },
        { name: "모니터", price: 210000, description: "27인치 FHD 모니터" },
    ];

    const [inputMinPrice, setInputminPrice] = useState(10000);
    const [inputMaxPrice, setInputMaxPrice] = useState(10000);
    const [filterMinPrice, setFilterMinPrice] = useState(10000);
    const [filterMaxPrice, setFilterMaxPrice] = useState(10000);

    function handleApply() {
        setFilterMinPrice(parseInt(inputMinPrice))
        setFilterMaxPrice(parseInt(inputMaxPrice))
    }
    return (
        <div>
            <h2>{filterMinPrice}~{filterMaxPrice}원 상품 목록</h2>
            <input 
                type="number" 
                value={inputMinPrice} 
                onChange={ (e)=>setInputminPrice(e.target.value) } 
            />
            <span>~</span>
            <input 
                type="number" 
                value={inputMaxPrice} 
                onChange={ (e)=>setInputMaxPrice(e.target.value) } 
            />
            <button onClick={handleApply}>적용</button>
            {
                products.filter( (item) => item.price < filterMaxPrice && item.price > filterMinPrice).map( (item, idx) => (
                   <div key={idx} style={{
                        border: "1px solid gray",
                        padding: "12px",
                        marginBottom: "10px",
                   }}>
                        <h4>{item.name}</h4>
                        <p>가격: {item.price}원</p>
                        <p>{item.description}</p>
                   </div>

                ) )
            }
        </div>
    )
}