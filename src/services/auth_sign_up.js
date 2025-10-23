import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase";

// *회원가입 함수 - async/await 패턴으로 변경
export async function signUp(email, password) {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // *회원가입 성공
    const user = userCredential.user;
    console.log("회원가입 성공:", user);
    
    return user; // *사용자 정보 반환
  } catch (error) {
    // *회원가입 실패 - 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
    console.error("회원가입 실패:", error);
    throw error;
  }
}