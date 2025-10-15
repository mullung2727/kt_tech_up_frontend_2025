import { Box, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

export default function Ex01_01() {
  const cardBg = useColorModeValue('blue.100', 'blue.500');
  return (
    <>
      <Box p={6} bg={cardBg} rounded="md">
        <Text>Box는 가장 기본 컨테이너</Text>
      </Box>
      <Box p={6} rounded="md" bg="white">
        <Text>Box는 기본 컨테이너</Text>
      </Box>
    </>
  )
}