import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  Container, 
  Field, 
  Flex, 
  Heading, 
  HStack, 
  Input, 
  Stack, 
  Text,
  Badge,
  VStack
} from "@chakra-ui/react";
import { LuLogIn, LuLogOut, LuTrash2, LuPlus, LuUser, LuLock } from "react-icons/lu";

// createContext 정의하기
const loginContext = createContext();

const userInfo = [
  {id:"id1", pw:"1234"},
  {id:"id2", pw:"4567"},
]

function LoginForm() {
  const [form, setForm] = useState({id:"", pw:""})
  const [error, setError] = useState("");
  const loginRef = useRef(null);
  const {setIsLoginOpen, setUser} = useContext(loginContext);

  function handleChange(e) {
    setForm( (prev) => ({...prev, [e.target.name]: e.target.value}))
    console.log(form)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = userInfo.some(
      (u) => u.id === form.id && u.pw === form.pw
    );
    if (ok) {
      setIsLoginOpen(false);
      setUser(form.id)
    } else {
      setError("아이디/비밀번호가 일치하지 않습니다.")
    }
  }

  useEffect(()=>{
    loginRef.current?.focus();
  }, [])
  
  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      bottom="0" 
      bg="blackAlpha.600" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      zIndex="1000"
    >
      <Card.Root 
        maxW="md" 
        width="400px"
        boxShadow="2xl"
      >
        <Card.Header>
          <Card.Title fontSize="2xl">로그인</Card.Title>
          <Card.Description>계정 정보를 입력해주세요</Card.Description>
        </Card.Header>
        
        <Card.Body>
          <Stack gap="4" as="form" onSubmit={handleSubmit}>
            <Field.Root>
              <Field.Label>아이디</Field.Label>
              <Input
                name="id"
                type="text"
                placeholder="아이디를 입력하세요"
                value={form.id}
                onChange={handleChange}
                ref={loginRef}
                size="lg"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>비밀번호</Field.Label>
              <Input
                name="pw"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={form.pw}
                onChange={handleChange}
                size="lg"
              />
            </Field.Root>

            {error && (
              <Box 
                bg="red.50" 
                color="red.600" 
                p="3" 
                borderRadius="md"
                fontSize="sm"
              >
                {error}
              </Box>
            )}

            <HStack gap="3" mt="2">
              <Button 
                type="button" 
                variant="outline" 
                flex="1"
                size="lg"
                onClick={()=>{
                  setForm({id:"", pw:""});
                  setIsLoginOpen(false)
                }}
              >
                취소
              </Button>
              <Button 
                type="submit" 
                colorPalette="blue"
                flex="1"
                size="lg"
              >
                <LuLogIn />
                로그인
              </Button>
            </HStack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  )
}

function Header() {
  const {user, setIsLoginOpen, setUser} = useContext(loginContext);
  return (
    <Box 
      as="header" 
      borderBottom="1px" 
      borderColor="gray.200"
      bg="white"
      boxShadow="sm"
    >
      <Container maxW="container.xl" py="4">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="2xl" color="blue.600" fontWeight="bold">
            리액트 연습
          </Heading>
          
          {user ? (
            <HStack gap="4">
              <HStack gap="2" bg="blue.50" px="4" py="2" borderRadius="full">
                <LuUser />
                <Text fontWeight="medium" color="blue.700">
                  {user}님 환영합니다
                </Text>
              </HStack>
              <Button
                colorPalette="red"
                variant="outline"
                onClick={() => setUser(null)}
              >
                <LuLogOut />
                로그아웃
              </Button>
            </HStack>
          ): (
            <Button
              colorPalette="blue"
              onClick={()=>setIsLoginOpen(true)}
            >
              <LuLogIn />
              로그인
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

function AddRemove() {
    const [card, setCard] = useState(() => {
        const saved = localStorage.getItem('cards');
        return saved ? JSON.parse(saved) : [];
    });
    const [form, setForm] = useState({
        name:"",
        elementType:"",
        desc:""
    });
    const nameInputRef = useRef(null);

    function deleteCard(idx) {
        setCard(prev => {
            const next = prev.filter( (_, i) => i !==idx)
            return next;
        });
    }

    function changeHandler(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setCard(prev => {
            const next = [...prev, form];
            return next
        })
        setForm({
            name: '',
            elementType: '',
            desc:''
        })
    }

    useEffect( () => {
        localStorage.setItem("cards", JSON.stringify(card));
        nameInputRef.current?.focus();
    }, [card] );

    return (
      <Container maxW="container.xl" py="8">
        <VStack gap="8" align="stretch">
          {/* 카드 추가 폼 */}
          <Card.Root>
            <Card.Header>
              <Card.Title fontSize="xl">새 카드 추가</Card.Title>
              <Card.Description>카드 정보를 입력하고 추가 버튼을 클릭하세요</Card.Description>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" as="form" onSubmit={handleSubmit}>
                <Field.Root>
                  <Field.Label>이름</Field.Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={form.name}
                    onChange={changeHandler}
                    ref={nameInputRef}
                    size="lg"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>속성</Field.Label>
                  <Input
                    name="elementType"
                    type="text"
                    placeholder="속성을 입력하세요"
                    value={form.elementType}
                    onChange={changeHandler}
                    size="lg"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>설명</Field.Label>
                  <Input
                    name="desc"
                    type="text"
                    placeholder="설명을 입력하세요"
                    value={form.desc}
                    onChange={changeHandler}
                    size="lg"
                  />
                </Field.Root>

                <Button 
                  type="submit" 
                  colorPalette="blue" 
                  size="lg"
                  alignSelf="flex-end"
                >
                  <LuPlus />
                  추가
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* 카드 리스트 */}
          <Box>
            <Heading size="xl" mb="6" color="gray.700">
              카드 목록 ({card.length})
            </Heading>
            
            {card.length === 0 ? (
              <Card.Root>
                <Card.Body>
                  <Text textAlign="center" color="gray.500" py="8">
                    아직 추가된 카드가 없습니다. 위에서 새 카드를 추가해보세요!
                  </Text>
                </Card.Body>
              </Card.Root>
            ) : (
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
                gap="6"
              >
                {card.map((item, idx) => (
                  <Card.Root 
                    key={idx}
                    variant="elevated"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "xl",
                      transition: "all 0.3s"
                    }}
                  >
                    <Card.Body gap="3">
                      <HStack justifyContent="space-between" alignItems="start">
                        <Heading size="md" color="blue.600">
                          {item.name}
                        </Heading>
                        <Badge colorPalette="purple" variant="subtle">
                          {item.elementType}
                        </Badge>
                      </HStack>
                      
                      <Text color="gray.600" fontSize="sm">
                        {item.desc}
                      </Text>
                    </Card.Body>
                    
                    <Card.Footer>
                      <Button
                        colorPalette="red"
                        variant="ghost"
                        size="sm"
                        width="full"
                        onClick={() => deleteCard(idx)}
                      >
                        <LuTrash2 />
                        삭제
                      </Button>
                    </Card.Footer>
                  </Card.Root>
                ))}
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    )
}

export default function MyApp(){
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const value={user, setUser, isLoginOpen, setIsLoginOpen}
  return (
    <loginContext.Provider value={value}>
      <Box minH="100vh" bg="gray.50">
        <Header />
        {isLoginOpen && !user && (
          <LoginForm /> 
        )}
        <AddRemove />
      </Box>
    </loginContext.Provider>
  )
}