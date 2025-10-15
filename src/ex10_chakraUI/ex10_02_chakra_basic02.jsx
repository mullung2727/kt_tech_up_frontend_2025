import { Box, Button, HStack, Stack, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

export default function Ex01_02() {
  const boxBg = useColorModeValue('white', 'gray.800');
  const btnBg = useColorModeValue('blue.500', 'gray.200')

  return (
    <Box p={6} bg={boxBg} rounded={"md"}>
      <HStack gap={3}>
        <Button bg={btnBg}>기본 버튼</Button>
        <Button variant="outline">아웃라인</Button>
      </HStack>
    </Box>
  )
} 