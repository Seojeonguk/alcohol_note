import { AuthErrorCodes } from 'firebase/auth';

const errorMap = {
  [AuthErrorCodes.EMAIL_EXISTS]: '이미 사용 중인 아이디입니다.',
  [AuthErrorCodes.INVALID_EMAIL]: '이메일 형식에 맞지 않는 메일 주소입니다.',
  [AuthErrorCodes.WEAK_PASSWORD]: '비밀번호는 최소 6자 이상이어야 합니다.',
  'missing/email': '이메일을 입력해 주세요.',
  'missing/password': '비밀번호를 입력해 주세요.',
};

const getKorErrorMsg = (errorCode) => {
  let errorMsg = errorMap[errorCode];
  return errorMsg === undefined ? '오류가 발생하였습니다.' : errorMsg;
};

export { getKorErrorMsg };
