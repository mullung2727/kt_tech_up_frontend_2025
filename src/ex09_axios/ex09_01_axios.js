import axios from "axios";

// axios.get("https://pokeapi.co/api/v2/pokemon/1")
//   .then(res => console.log(res.data));



export async function getPokemon(id) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;

    const result = {
      name: data.name,
      types: data.types.map(t=>t.type.name),
      image: data.sprites.front_default,
      moves: data.moves.map(m => m.move.name)
    };
    return result;

  } catch (err) {
    console.log(err);
  }
}

const res = await getPokemon(1);
console.log(res);

// const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/150`)
// console.log(res2.data.name)