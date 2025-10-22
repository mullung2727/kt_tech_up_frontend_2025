import { Box, Heading, Text, Input, Button, Field, Fieldset } from "@chakra-ui/react";


// TODO: zod 스키마 정의하기


export default function About() {
  // TODO: useForm 훅 설정하기


  // TODO: 제출 함수 만들기

  return (
    <Box p={6}>
      <Heading size="xl" mb={4}>About</Heading>
      <Text color="gray.600" mb={6}>
        React + Chakra UI + PokeAPI
      </Text>

      <Box mt={8} maxW="400px">
        <Heading size="lg" mb={4}>useForm 연습</Heading>

        {/* TODO: invalid 에러 처리 */}
        <Fieldset.Root>
          <Fieldset.Content>
            
            {/* TODO: 이름 입력 필드 만들기 */}
            <Field.Root mb={4}>
              <Field.Label>이름</Field.Label>
              <Input placeholder="이름 입력" />
              <Field.ErrorText>{/* TODO: 에러 메시지 표시 */}</Field.ErrorText>
            </Field.Root>

            {/* TODO: 이메일 입력 필드 만들기 */}
            <Field.Root mb={4}>
              <Field.Label>이메일</Field.Label>
              <Input type="email" placeholder="example@email.com" />
              <Field.ErrorText>{/* TODO: 에러 메시지 표시 */}</Field.ErrorText>
            </Field.Root>

          </Fieldset.Content>

          {/* TODO: 제출 버튼에 handleSubmit 연결하기 */}
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            mt={4}
          >
            제출하기
          </Button>
        </Fieldset.Root>
      </Box>
    </Box>
  );
}