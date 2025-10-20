import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonDetail } from "../api/pokeAPI";
import { Box, Button, Card, Container, Heading, HStack, Icon, Image, SimpleGrid, Tabs, Tag, Text, VStack } from "@chakra-ui/react";
import TypeBadge from "../components/TypeBedge";
import { FaArrowLeft } from "react-icons/fa6";


export default function PokemonDetails() {
  const navigate = useNavigate();  // * 추가
  const {id} = useParams(); // 파라미터로 받은 id를 가져옴
  const [pokemon, setPokemon] = useState(null);

  useEffect(()=>{
    async function fetchData() {
      const data = await getPokemonDetail(id);
      setPokemon(data);
    }
    fetchData();
  }, []);

  if (!pokemon) {
    return <p>Loading...</p>;
  }
  return (
    <Container w="50%">
      <Card.Root>
        <Card.Body>
          <SimpleGrid columns={1} gap={4}>
            <Box textAlign="center">
              <Image
                src={pokemon?.image} 
                alt={pokemon?.name} 
                borderRadius="md"
                mb={4}
              />
            </Box>
            <VStack>
              <Heading size="lg" textTransform="capitalize">
                #{pokemon?.id} {pokemon?.name}
              </Heading>
              <HStack>
                {pokemon?.types.map((t) => (
                  <TypeBadge key={t} typeName={t} />
                ))}
              </HStack>
              <Text>키: {pokemon?.height ? (pokemon?.height / 10).toFixed(1) : "-"}m</Text>
              <Text>몸무게: {pokemon?.weight ? (pokemon?.weight / 10).toFixed(1) : "-"}kg</Text>
              <HStack>
                <Tabs.Root defaultValue="moves">
                  <Tabs.List>
                    <Tabs.Trigger value="moves">기술 목록</Tabs.Trigger>
                    <Tabs.Trigger value="abilities">특성</Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="moves">
                    <Box maxH="200px" overflowY="auto">
                      {pokemon?.moves.map((m) => (
                        <Text key={m} p={1}>{m}</Text>
                      ))}
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="abilities">
                    <Box maxH="200px" overflowY="auto">
                      {pokemon?.abilities.map((a) => (
                        <Text key={a} p={1}>{a}</Text>
                      ))}
                    </Box>
                  </Tabs.Content>
                </Tabs.Root>
              </HStack>
            </VStack>
            

          </SimpleGrid>
        </Card.Body>
        <Card.Footer display={'flex'} justifyContent={'right'}>
          <Button 
            onClick={()=> navigate("/")} 
            variant={'outline'}
          > <Icon as={FaArrowLeft} />홈으로 </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  )
}
