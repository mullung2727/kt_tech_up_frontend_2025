// /src/services/auth_google_sign_in.js
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { app } from "../config/firebase";

export async function googleSignIn() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const cred = GoogleAuthProvider.credentialFromResult(result);
    console.log("팝업",result)
    return { user: result?.user?.email, token: cred?.accessToken };
    
  } catch (err) {
    // COOP/팝업 차단 등 환경 문제 시 리다이렉트로 폴백
    await signInWithRedirect(auth, provider);
    // 리다이렉트 복귀 후 이곳이 아니라 아래 getRedirectResult로 수신
    console.log("리다이렉트",err)
    return null;
  }
}

export async function handleRedirectResult() {
  const auth = getAuth(app);
  const result = await getRedirectResult(auth);
  if (!result) return null;
  const cred = GoogleAuthProvider.credentialFromResult(result);
  return { user: result.user, token: cred?.accessToken };
}