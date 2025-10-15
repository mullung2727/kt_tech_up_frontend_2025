import "./ex06_grid.css"

export default function GridEx() {
    const item=[1,2,3,4,5,6];
    return (
        <div className="container">
            {item.map( (num) => {
                return <div key={num} className="card">
                    아이템 {num}
                </div>
            })}
        </div>
    )
}