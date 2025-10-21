import { Box, Button } from "@chakra-ui/react";
import GoogleIcon from "../assets/google-svgrepo-com.svg";
import { googleSignIn } from "../services/auth_google_sign_in";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const user = await googleSignIn()
      console.log('구글 로그인 처리', user);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button 
      width="100%"
      onClick={handleGoogleLogin}
      _hover={{ bg: "gray.400" }}
    >
      <Box 
        as="img" 
        src={GoogleIcon} 
        boxSize="20px"
        me={2}
      />
      Google로 계속하기
    </Button>
  )
}