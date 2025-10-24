// src/components/SignUpModal.jsx
import { Box, Button, Dialog, Field, Fieldset, FileUpload, HStack, Icon, Input, Portal, Separator, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { useState } from "react";
import { signUp } from "../services/auth_sign_up"; 
import { FaX } from "react-icons/fa6";
import { firebaseErrorMessages } from "../config/firebaseError";
import GoogleLoginButton from "./GoogleLoginButton";
import { uploadAvatar } from "../services/storage";
import { updateProfile } from "firebase/auth";
import { LuUpload } from "react-icons/lu";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// TODO : zod 스키마 정의
const signUpSchema = z.object({
  email: z.email("이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
                      .regex(/[!@#$%^&*]/, "특수문자를 포함해야 합니다.")
                      .regex(/[0-9]/, "숫자를 포함해야 합니다.")
                      .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다."),
  passwordConfirm: z.string()
}).refine((data)=>data.password===data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"]
});

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  // TODO : 기존 state 주석처리(email, password, passwordConfirm)
  // TODO : error -> firebaseError로 수정(가독성을 위해)
  const [firebaseError, setFirebaseError] = useState(""); 
  const [avatarFile, setAvatarFile] = useState(null); 


  // TODO : useForm 추가하기
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {email:"", password:"", passwordConfirm:""}
  })

  // TODO : 함수 수정 - 파라미터 포함
  const onSubmit = async (data) => {
    setFirebaseError("")
    // try-catch로 signUp 함수 호출
    try {
      const user = await signUp(data.email, data.password)
      console.log("회원가입 성공:", user)
      if (avatarFile) { 
        const photoURL = await uploadAvatar(user.uid, avatarFile)
        await  updateProfile(user, {photoURL})
      }
      setOpen(false)
      reset();
      setAvatarFile(null)
    } catch (error) {
      console.log("회원가입 실패: ", error)
      const message = firebaseErrorMessages[error.code] || error.code;
      setFirebaseError(message)
    }
    

  };

  // TODO : 삭제 - useForm에서 처리

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline">회원가입</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>회원가입</Dialog.Title>
              <Dialog.CloseTrigger 
                size="lg" 
                fontSize={"2xl"} 
                m={3} 
                _hover={{opacity: 0.5}}
                cursor="pointer"
                variant="outline" >
                <Icon as={FaX}/>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root invalid={!isValid || !!firebaseError}> 
                <Fieldset.Content>
                  <Field.Root mb={4} invalid={!!errors.email}>
                    <Field.Label>이메일</Field.Label>
                    <Input 
                    // TODO register로 프롭 추가 + 불필요한 프롭 제거 + ErrorText 추가
                      type="email" 
                      // required
                      placeholder="이메일을 입력하세요" 
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)} 
                      {...register("email")}
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>
                  
                  <Field.Root mb={4} invalid={!!errors.password}>
                    <Field.Label>비밀번호</Field.Label>
                    <PasswordInput 
                    // TODO register로 프롭 추가 + 불필요한 프롭 제거 + ErrorText 추가
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)} 
                      {...register("password")}
                    /> 
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                  </Field.Root>
                  
                  <Field.Root mb={4} invalid={!!errors.passwordConfirm}>
                    <Field.Label>비밀번호 확인</Field.Label>
                    <PasswordInput 
                    // TODO register로 프롭 추가 + 불필요한 프롭 제거 + ErrorText 추가
                      // value={passwordConfirm}
                      // onChange={(e) => handlePasswordConfirm(e.target.value)} 
                      {...register("passwordConfirm")}
                    />
                    <Field.ErrorText>{errors.passwordConfirm?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root mb={4}>
                    <Field.Label>프로필 이미지 (선택)</Field.Label>
                  </Field.Root>
                  <FileUpload.Root
                    maxFiles={1}
                    accept="image/*"
                  >
                    <FileUpload.HiddenInput
                      onChange={(e)=> {
                        console.log("input change:", e.target.files[0])
                        setAvatarFile(e.target.files[0] || null)
                      }}
                    />
                    {!avatarFile && (
                      <FileUpload.Dropzone p={3} minH="80px">
                        <Icon as={LuUpload} />
                        <FileUpload.DropzoneContent pointerEvents="none">
                          <Box>드래그 또는 클릭하여 이미지 선택</Box>
                        </FileUpload.DropzoneContent>
                      </FileUpload.Dropzone>
                    )}
                    <FileUpload.List showSize clearable />

                  </FileUpload.Root>
                </Fieldset.Content>
                
                <Fieldset.ErrorText>{firebaseError}</Fieldset.ErrorText>
                
                <Button 
                  type="submit" 
                  // TODO onClick 수정
                  onClick={handleSubmit(onSubmit)} 
                  colorScheme="blue"
                  width="100%" 
                  mt={4}
                  // TODO disabled 수정
                  disabled={ !isValid }
                >
                  회원가입
                </Button>
                <HStack my={4}>
                  <Separator flex="1" />
                  <Text flexShrink="0" px={2} color="gray.500" fontSize="sm">
                    또는
                  </Text>
                  <Separator flex="1" />
                </HStack>
                <GoogleLoginButton onSuccess={()=>setOpen(false)}/>
              </Fieldset.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}