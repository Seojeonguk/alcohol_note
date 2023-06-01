import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import mainPageImg from '../assets/mainPageImg.png';
import { COLORS, NAVIGATOR } from '../constants';
import { auth } from '../firebaseConfig';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainPage({ navigation, route }) {
  const handleLoginBtn = () => {
    navigation.navigate(NAVIGATOR.LOGIN);
  };

  const handleRegistrationBtn = () => {
    navigation.navigate(NAVIGATOR.REGISTRATION_FORM);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user || !user.emailVerified) {
        return;
      }

      if (user.emailVerified) {
        navigation.reset({
          index: 0,
          routes: [{ name: NAVIGATOR.BOTTOM_TAB_NAV }],
        });
        return;
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.mainImgWrap}>
          <Image source={mainPageImg} style={styles.mainImg} />
        </View>

        <View style={styles.btnWrap}>
          <TouchableOpacity onPress={handleLoginBtn} style={styles.loginBtnWrap}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegistrationBtn} style={styles.registrationBtnWrap}>
            <Text style={styles.btnText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnWrap: {
    alignItems: 'center',
    flex: 1,
  },
  loginBtnWrap: {
    alignItems: 'center',
    backgroundColor: COLORS.BUTTON_COLOR,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
    width: 250,
  },
  registrationBtnWrap: {
    alignItems: 'center',
    backgroundColor: '#A4AFC3',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    width: 250,
  },
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
    minHeight: '100%',
  },
  mainImg: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  mainImgWrap: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
});
