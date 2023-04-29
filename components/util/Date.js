import AsyncStorage from '@react-native-async-storage/async-storage';

const emailRequestLimitKey = 'emailRequestLimit';

const setEmailRequestLimit = async () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);

  await AsyncStorage.setItem(emailRequestLimitKey, now.toString());
};

export { emailRequestLimitKey, setEmailRequestLimit };
