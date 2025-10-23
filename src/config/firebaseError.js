export const firebaseErrorMessages = {
  // 이메일/비밀번호 로그인 관련
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/missing-password': '비밀번호를 입력하지 않았습니다.',
  'auth/user-disabled': '비활성화된 계정입니다.',
  'auth/user-not-found': '등록되지 않은 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/invalid-credential': '이메일 또는 비밀번호가 잘못되었습니다.',
  
  // 회원가입 관련
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
  'auth/operation-not-allowed': '허용되지 않은 작업입니다.',

  
  // 네트워크/시스템 관련
  'auth/network-request-failed': '네트워크 연결을 확인해주세요.',
  'auth/too-many-requests': '너무 많은 요청. 잠시 후 다시 시도해주세요.',
  'auth/timeout': '요청 시간이 초과되었습니다.',
  
  // 구글 로그인 관련
  'auth/popup-closed-by-user': '로그인 창이 닫혔습니다.',
  'auth/cancelled-popup-request': '로그인이 취소되었습니다.',
  'auth/account-exists-with-different-credential': '다른 로그인 방법으로 가입된 이메일입니다.',
}