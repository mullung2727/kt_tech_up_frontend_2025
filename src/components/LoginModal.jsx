// src/components/LoginModal.jsx
import { Button, Dialog, Field, Fieldset, HStack, Icon, Input, Portal, Separator, Text, useDisclosure } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { FaX } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import {AuthContext} from "../contexts/AuthContext";
import { login, logout, onAuthStateChange } from "../services/auth";
import GoogleLoginButton from "./GoogleLoginButton";
import MenuWithAvatar from "./MenuWithAvatar";
import { firebaseErrorMessages } from "../config/firebaseError";
import { toaster } from "./ui/toaster";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const {user, setUser} = useContext(AuthContext)
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await login(email, password)
      console.log(loginUser)
      setUser(loginUser)
      setOpen(false)
      setEmail("")
      setPassword("")
      setLoginError("")
      const userName = loginUser.displayName || loginUser.email
      toaster.create({
        description: `${userName}님 환영합니다~`,
        type: "success",
        duration: 5000,
        closable: true,
      })
    } catch (error) {
      const message = firebaseErrorMessages[error.code] || error.code
      setLoginError(message)
      toaster.create({
        description: "로그인에 실패했습니다.",
        type: "error",
        duration: 5000,
        closable: true,
      })
      console.log(loginError)
    }
  }

  // TODO 로그인상태 유지하기
  useEffect( () => {
    const unsubscribe = onAuthStateChange((firebaseUser)=> {
      setUser(firebaseUser)
    })
    return ()=>unsubscribe()
  }, [])

  useEffect(() => {
    console.log("useEffet", user)
  }, [user])
  
  

  if (user) {
    return (
      <MenuWithAvatar/>
    );
  }

  return (
  <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
    <Dialog.Trigger asChild>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        로그인
      </Button>
    </Dialog.Trigger>
    <Portal> {/* 최상단 표시 */}
      <Dialog.Backdrop /> {/* 뒤 배경 어두운 오버레이 */}
      <Dialog.Positioner> {/* 모달을 화면 중앙에 배치 */}
        <Dialog.Content> {/* 실제 모달 내용 컨테이너 */}
          <Dialog.Header>
            <Dialog.Title>로그인</Dialog.Title> {/* 모달 제목 */}
            <Dialog.CloseTrigger  
              size="lg" 
              fontSize={"2xl"} 
              m={3} 
              _hover={{opacity: 0.5}}
              cursor="pointer"
              variant="outline"
            >{/* X 닫기 버튼 */}
              <Icon as={FaX} />
            </Dialog.CloseTrigger> 
          </Dialog.Header>
          <Dialog.Body>
            <Fieldset.Root invalid={loginError}>
              <Fieldset.Content>
                <Field.Root mb={4}>
                  <Field.Label>아이디</Field.Label>
                  <Input
                    type="text" 
                    placeholder="아이디를 입력하세요" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Field.Root>
                <Field.Root mb={4}>
                  <Field.Label>비밀번호</Field.Label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    onKeyDown={(e)=> e.key === "Enter" && handleLogin(e)}
                  />
                </Field.Root>
              </Fieldset.Content>
              <Fieldset.ErrorText justifyContent="center">
                {loginError || "로그인에 실패했습니다." }
              </Fieldset.ErrorText>
              <Button type="submit" onClick={handleLogin} colorScheme="blue" width="100%" mt={4}>
                로그인
              </Button>
            </Fieldset.Root>
            <HStack my={4}>
              <Separator flex="1" />
              <Text flexShrink="0" px={2} color="gray.500" fontSize="sm">
                또는
              </Text>
              <Separator flex="1" />
            </HStack>
            <GoogleLoginButton onSuccess={()=>setOpen(false)}/>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
  )
}