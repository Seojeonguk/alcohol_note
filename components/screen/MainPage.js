import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainPage({ navigation }) {
  const handleLoginBtn = () => {
    navigation.navigate('login');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.mainImgWrap}>
          <Image
            source={{
              uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDZfMjUx%2FMDAxNjYyNDM3ODk4NTQ3.FDaxfffFN1iNSBH_t8yTmgw3l30r-1OZIBSyhESQLtYg.wvXYUDZtmsdL1of59htugexzGLe9tBd5VLuqjZqQ9mog.JPEG.janet_hwang%2FIMG_1365.jpg&type=a340',
            }}
            style={styles.mainImg}
          />
        </View>

        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.loginBtnWrap} onPress={handleLoginBtn}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registrationBtnWrap}>
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
