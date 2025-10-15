import { Heading, HStack, Container } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode.jsx';
import PokemonCards from './pages/PokemonCards.jsx';

export default function App() {
  return (
    <Container p={6}>
      <HStack justify={'space-between'}>
        <Heading size="md" mb={2}>Hello, Chakra</Heading>
        <ColorModeButton />
      </HStack>
      
      <PokemonCards/>
    </Container>
  );
}