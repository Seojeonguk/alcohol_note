import { AUTH_ERRORS } from '../../constants';

const getKorErrorMsg = (errorCode) => {
  const errorMsg = AUTH_ERRORS[errorCode];
  return errorMsg === undefined ? '오류가 발생하였습니다.' : errorMsg;
};

export { getKorErrorMsg };
