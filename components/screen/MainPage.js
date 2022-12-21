import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mainPageImg from '../../assets/mainPageImg.png';

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
          <TouchableOpacity style={styles.loginBtnWrap} onPress={handleLoginBtn}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registrationBtnWrap} onPress={handleRegistrationBtn}>
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
    borderRadius: 5,
    height: 40,
    width: 250,
    backgroundColor: '#ABCEEA',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationBtnWrap: {
    borderRadius: 5,
    height: 40,
    width: 250,
    backgroundColor: '#A4AFC3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#F6E8DB',
    minHeight: '100%',
  },
  mainImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  mainImgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
});
