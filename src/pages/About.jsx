import { Box, Heading, Text } from "@chakra-ui/react";

export default function About() {

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