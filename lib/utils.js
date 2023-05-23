import { AUTH_ERRORS } from '../constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

const getKorErrorMsg = (errorCode) => {
  const errorMsg = AUTH_ERRORS[errorCode];
  return errorMsg === undefined ? '오류가 발생하였습니다.' : errorMsg;
};

const emailRequestLimitKey = 'emailRequestLimit';

const setEmailRequestLimit = async () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);

  await AsyncStorage.setItem(emailRequestLimitKey, now.toString());
};

export { getKorErrorMsg, emailRequestLimitKey, setEmailRequestLimit };
