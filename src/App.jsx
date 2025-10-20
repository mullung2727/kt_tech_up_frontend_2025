import { Heading, HStack, Container } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode.jsx';
import PokemonCards from './pages/PokemonCards.jsx';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import About from './pages/About.jsx';
import PokemonDetails from './pages/PokemonDetails.jsx';

export default function App() {
  return (
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<PokemonCards/>} /> // index: 루트 경로
            <Route path='about' element={<About/>} />
            <Route path='pokemon/:id' element={<PokemonDetails/>} />
          </Route>      
        </Routes>
  );
}