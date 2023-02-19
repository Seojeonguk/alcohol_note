import BottomNavigation from './BottomNavigation';
import NoBottomNavigation from './NoBottomNavigation';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import { auth } from '../../firebaseConfig';
import { useEffect, useState } from 'react';

import { signOut } from '@firebase/auth';

import { sendEmailVerification } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

const Tab = createNativeStackNavigator();
const localStorageKeyName = 'confirmEmailExpireTime';

export default function Index() {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLogin(false);
        return;
      }
      const confirmEmailExpireTime = await AsyncStorage.getItem(localStorageKeyName);

      if (!user.emailVerified) {
        if (!confirmEmailExpireTime) {
          await sendEmailVerification(user);
          Toast.show({
            type: 'success',
            text1: '인증 메일을 발송하였습니다.',
            text2: '인증 메일 확인 후 이용할 수 있습니다.',
          });
          const now = new Date();
          now.setMinutes(now.getMinutes() + 30);

          const obj = {
            value: '1',
            expire: now,
          };

          const objStr = JSON.stringify(obj);

          await AsyncStorage.setItem(localStorageKeyName, objStr);
        } else {
          const obj = JSON.parse(confirmEmailExpireTime);
          const expireTime = new Date(obj.expire);
          if (Date.now() > expireTime) {
            Alert.alert(
              '재인증',
              '인증 메일을 재전송 하시겠습니까?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Send', onPress: async () => await sendEmailVerification(user) },
              ],
              { cancelable: true }
            );
          } else {
            Toast.show({
              type: 'success',
              text1: '이메일의 메일함을 확인바랍니다.',
              text2: `${expireTime.getHours()}시 ${expireTime.getMinutes()}분 ${expireTime.getSeconds()}초 까지 메일을 다시 보낼 수 없습니다.`,
            });
          }
        }
        await signOut(auth);
        setLogin(false);
        return;
      }

      if (confirmEmailExpireTime) {
        await AsyncStorage.removeItem(localStorageKeyName);
      }
      setLogin(true);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="nobottom" screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <Tab.Screen name="bottom" component={BottomNavigation} />
        ) : (
          <Tab.Screen name="nobottom" component={NoBottomNavigation} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
