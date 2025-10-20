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

export async function getPokemonDetail(id) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;
    const result = {
      id: data.id, // 포켓몬 도감 번호
      name: data.name, // 포켓몬 영문 이름
      types: data.types.map(t => t.type.name), // 포켓몬 타입 목록 (예: grass, poison)
      image: data.sprites.other["official-artwork"].front_default, // 공식 일러스트 이미지 URL
      moves: data.moves.map(m => m.move.name), // 포켓몬이 배울 수 있는 기술 이름 전체 목록
      height: data.height, // 포켓몬 키 (단위: decimeter, 즉 1/10m)
      weight: data.weight, // 포켓몬 몸무게 (단위: hectogram, 즉 1/10kg)
      stats: data.stats.map(s => ({
        name: s.stat.name, // 능력치 이름 (예: hp, attack 등)
        base_stat: s.base_stat, // 능력치 기본값
      })),
      abilities: data.abilities.map(a => a.ability.name), // 포켓몬 특성 목록
    };
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}