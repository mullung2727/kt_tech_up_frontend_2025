import { Box, Heading, Text, Input, Button, Field, Fieldset } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toaster } from "../components/ui/toaster";


// TODO: zod 스키마 정의하기
const practiceSchema = z.object({
  name: z.string().min(2, "이름은 두 글자 이상"),
  email: z.email("올바른 이메일 형식이 아닙니다.")
})

export default function About() {
  // TODO: useForm 훅 설정하기
  const {
    register,
    handleSubmit,
    formState:{errors, isValid},
    reset
  } = useForm({
    resolver: zodResolver(practiceSchema),
    mode: "onChange",
    defaultValues: {name:"", email:""}
  })

  // TODO: 제출 함수 만들기
  const onSubmit = (data) => {
    toaster.create({
      description:`이름: ${data.name}, 이메일: ${data.email}`,
      type:"success",
      duration: 5000
    })
    reset()
  }

  return (
    <Box p={6}>
      <Heading size="xl" mb={4}>About</Heading>
      <Text color="gray.600" mb={6}>
        React + Chakra UI + PokeAPI
      </Text>

      <Box mt={8} maxW="400px">
        <Heading size="lg" mb={4}>useForm 연습</Heading>

        {/* TODO: invalid 에러 처리 */}
        <Fieldset.Root invalid={!isValid}>
          <Fieldset.Content>
            
            {/* TODO: 이름 입력 필드 만들기 */}

            <Field.Root mb={4} invalid={!!errors.name}            > 
              <Field.Label>이름</Field.Label>
              <Input {...register("name")} placeholder="이름 입력" />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            {/* TODO: 이메일 입력 필드 만들기 */}
            <Field.Root mb={4} invalid={!!errors.email}>
              <Field.Label>이메일</Field.Label>
              <Input {...register("email")} type="email" placeholder="example@email.com" />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

          </Fieldset.Content>

          {/* TODO: 제출 버튼에 handleSubmit 연결하기 */}
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            mt={4}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            제출하기
          </Button>
        </Fieldset.Root>
      </Box>
    </Box>
  );
}