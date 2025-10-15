import { useEffect, useState } from "react";
import { getPokemon } from "./ex09_01_axios";

function PokemonCard({id}) {
  const [pokemon, setPokemon] = useState(null);

  useEffect( () => {
    async function fetchData(){
      const data = await getPokemon(id)
      setPokemon(data);
    }
    fetchData();
  }, [])

  return (
    <div style={{border: "1px solid gray", padding:"16px", maxWidth: "300px"}}>
      <h2>{pokemon?.name}</h2>
      <img src={pokemon?.image} alt={pokemon?.name} />
      <p>타입: {pokemon?.types?.join(", ")}</p>
      <h4>기술 목록</h4>
      <ul style={{maxHeight: "70px", overflowY: "scroll"}}>
        {pokemon?.moves.map( (move, idx) => {
          return <li key={idx}>{move}</li>
        })}
      </ul>
    </div>
  )
}

export default function PCards() {
  const pokelist = [1,2,3,400,5,100];
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px"
    }}>
      {pokelist.map( (id)=> {
        return <PokemonCard key={id} id={id}/>
      })}
    </div>
  )
}