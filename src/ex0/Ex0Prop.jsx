function Child({name="Guest"}) {
    return (
        <h1>
            Hello, {name}!
        </h1>
    )
}

export default function Parent() {
    const name = "정원준";
    return (
        <div>
            <Child  />
        </div>
    )
}