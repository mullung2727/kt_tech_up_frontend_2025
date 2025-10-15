import { useEffect, useState } from "react";
import { getPokemon } from "../api/pokeAPI";
import { Box, Card, Heading, HStack, Image, Text } from "@chakra-ui/react";
import TypeBedge from "./TypeBedge";

export default function PokemonCard({id}) {
  const [pokemon, setPokemon] = useState(null);

  useEffect( () => {
    async function fetchData(){
      const data = await getPokemon(id)
      setPokemon(data);
    }
    fetchData();
  }, [])

  return (
      <Card.Root maxWidth="300px" border="1px solid black" borderRadius="md">
          <Card.Header>
            <Heading as='h2'>
              {pokemon?.name}
            </Heading>
          </Card.Header>
          <Card.Body>
            <HStack justify={'center'}>
              {pokemon?.types.map((t,i)=> <TypeBedge key={i} typeName={t}/>)}
            </HStack>
            <Image src={pokemon?.image} alt={pokemon?.name}/>
            <Text 
              textAlign="center" 
              fortWeight="bold" 
              paddingTop={4} 
              paddingBottom={2}
            >
              기술 목록
            </Text>
            <Box maxHeight="70px" overflowY="scroll">
              {pokemon?.moves.map( (move, idx) => {
                return <Text key={idx}>{move}</Text>
              })}
            </Box>
          </Card.Body>
      </Card.Root>
  )
}
