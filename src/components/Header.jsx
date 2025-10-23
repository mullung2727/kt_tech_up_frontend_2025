import { Box, Container, HStack } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const {user} = useContext(AuthContext)
  return (
    <Container 
      maxW={'container.xl'} 
      my={6}
      borderBottom={'2px solid'}
      pb={2}
    >
      <HStack justify={'space-between'} align={'center'}>
        <Box>
          <HStack fontSize={'2xl'} gap={8}>
            <Box
              as={Link}
              to="/"
              borderRadius={'xl'}
              p={2}
              transition="color 0.2s"
              _hover={{ color: 'blue.500', bgColor: { base: 'red.100', _dark: 'gray.700' } }}
            >
              포켓몬 도감
            </Box>
            <Box
              as={Link}
              to="/about"
              borderRadius={'xl'}
              p={2}
              transition="color 0.2s"
              _hover={{ color: 'blue.500', bgColor: 'gray.subtle' }}
            >
              About
            </Box>
          </HStack>
        </Box>
        <HStack align={'center'}>
          {!user && <SignUpModal />}
          
          <LoginModal />
          <ColorModeButton />
        </HStack>

      </HStack>
    </Container>
  )
}