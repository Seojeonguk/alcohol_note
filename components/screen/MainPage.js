import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import mainPageImg from '../../assets/mainPageImg.png';
import { Color } from '../util';

export default function MainPage({ navigation }) {
  const handleLoginBtn = () => {
    navigation.navigate('login');
  };

  const handleRegistrationBtn = () => {
    navigation.navigate('registration');
  };

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
    backgroundColor: '#ABCEEA',
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
    backgroundColor: Color.BACKGROUND_COLOR,
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
