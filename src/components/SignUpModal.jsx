// src/components/SignUpModal.jsx
import { Button, Dialog, Field, Fieldset, Icon, Input, Portal } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { useState } from "react";
import { signUp } from "../services/auth_sign_up"; 
import { FaX } from "react-icons/fa6";

export default function SignUpModal() {
  // TODO: 이메일, 비밀번호, 비밀번호 확인, 에러 상태 생성
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSignUp = async (e) => {
    e.preventDefault();

    // TODO: 비밀번호와 비밀번호 확인이 일치하는지 검증

    // TODO: try-catch로 signUp 함수 호출

  };

  function handlePasswordConfirm(value) {
    setPasswordConfirm(value);
    // TODO: 비밀번호 확인 값이 비밀번호와 다르면 에러 메시지 표시

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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} /> 
                  </Field.Root>
                  
                  <Field.Root mb={4}>
                    <Field.Label>비밀번호 확인</Field.Label>
                    <PasswordInput 
                      value={passwordConfirm}
                      onChange={(e) => handlePasswordConfirm(e.target.value)} />
                  </Field.Root>
                </Fieldset.Content>
                
                <Fieldset.ErrorText>{error}</Fieldset.ErrorText>
                
                <Button 
                  type="submit" 
                  onClick={handleSignUp} 
                  colorScheme="blue"
                  width="100%" 
                  mt={4}
                >
                  회원가입
                </Button>
              </Fieldset.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}