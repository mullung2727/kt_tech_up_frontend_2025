function Info({name, age}) {
    return (
        <h1>{name}은 {age}살 입니다.</h1>
    )
}

export default function InfoList() {
    return (
        <>
            <Info name="Alice" age={27}/>
            <Info name="Bob" age={30}/>
            <Info name="정원준" age={25}/>
            <Info name="물렁이" age={25}/>
        </>
    )
}