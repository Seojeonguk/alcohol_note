import { AuthErrorCodes } from 'firebase/auth';

const AUTH_ERRORS = {
  [AuthErrorCodes.EMAIL_EXISTS]: '이미 사용 중인 이메일입니다.',
  [AuthErrorCodes.INVALID_EMAIL]: '이메일 형식에 맞지 않는 메일 주소입니다.',
  [AuthErrorCodes.WEAK_PASSWORD]: '비밀번호는 최소 6자 이상이어야 합니다.',
  [AuthErrorCodes.USER_DELETED]: '등록되지 않은 이메일입니다.',
  [AuthErrorCodes.INVALID_PASSWORD]: '이메일 또는 비밀번호를 잘못 입력했습니다.',
  'missing/email': '이메일을 입력해 주세요.',
  'missing/password': '비밀번호를 입력해 주세요.',
};

export { AUTH_ERRORS };
