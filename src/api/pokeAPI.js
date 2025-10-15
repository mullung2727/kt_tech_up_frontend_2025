import axios from "axios";

export async function getPokemon(id) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;

    const result = {
      name: data.name,
      types: data.types.map(t=>t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
      moves: data.moves.map(m => m.move.name)
    };
    return result;

  } catch (err) {
    console.log(err);
  }
}