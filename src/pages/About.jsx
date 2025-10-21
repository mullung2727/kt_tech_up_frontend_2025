import { Box, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { onAuthStateChange } from "../services/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function About() {
  const {user, setUser} = useContext(AuthContext)
  

  return (
    <Box p={6}>
      <Heading size="xl" mb={4}>
        About
      </Heading>
      <Text color="gray.600" mb={2}>
        포켓몬 도감 프로젝트입니다.
      </Text>
      <Text color="gray.600">
        React + Chakra UI + PokeAPI
      </Text>
    </Box>
  );
}