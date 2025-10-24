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

// TODO : zod 스키마 정의

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  // TODO : 기존 state 주석처리(email, password, passwordConfirm)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); 
  // TODO : error -> firebaseError로 수정(가독성을 위해)
  const [error, setError] = useState(""); 
  const [avatarFile, setAvatarFile] = useState(null); 


  // TODO : useForm 추가하기
  

  // TODO : 함수 수정 - 파라미터 포함
  const handleSignUp = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if( password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.")
      return ;
    }
    // try-catch로 signUp 함수 호출
    try {
      const user = await signUp(email, password)
      console.log("회원가입 성공:", user)
      if (avatarFile) { 
        const photoURL = await uploadAvatar(user.uid, avatarFile)
        await  updateProfile(user, {photoURL})
      }
      setOpen(false)
      setEmail("")
      setPassword("")
      setPasswordConfirm("")
    } catch (error) {
      console.log("회원가입 실패: ", error)
      const message = firebaseErrorMessages[error.code] || error.code;
      setError(message)
    }
    

  };

  // TODO : 삭제 - useForm에서 처리
  function handlePasswordConfirm(value) {
    setPasswordConfirm(value);
    if (value && password !== value) {
      setError("비밀번호가 일치하지 않습니다.")
    } else {
      setError("");
    }
  }

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
              <Fieldset.Root invalid={!!error}> 
                <Fieldset.Content>
                  <Field.Root mb={4}>
                    <Field.Label>이메일</Field.Label>
                    <Input 
                    // TODO register로 프롭 추가 + 불필요한 프롭 제거 + ErrorText 추가
                      type="email" 
                      required
                      placeholder="이메일을 입력하세요" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </Field.Root>
                  
                  <Field.Root mb={4}>
                    <Field.Label>비밀번호</Field.Label>
                    <PasswordInput 
                    // TODO register로 프롭 추가 + 불필요한 프롭 제거 + ErrorText 추가
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} /> 
                  </Field.Root>
                  
                  <Field.Root mb={4}>
                    <Field.Label>비밀번호 확인</Field.Label>
                    <PasswordInput 
                    // TODO register로 프롭 추가 + 불필요한 프롭 제거 + ErrorText 추가
                      value={passwordConfirm}
                      onChange={(e) => handlePasswordConfirm(e.target.value)} />
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
                
                <Fieldset.ErrorText>{error}</Fieldset.ErrorText>
                
                <Button 
                  type="submit" 
                  // TODO onClick 수정
                  onClick={handleSignUp} 
                  colorScheme="blue"
                  width="100%" 
                  mt={4}
                  // TODO disabled 수정
                  disabled={ (!!error) || (!email || !password || !passwordConfirm) }
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