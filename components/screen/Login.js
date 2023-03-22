import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from '../../firebaseConfig';
import { Color, getKorErrorMsg } from '../util';

import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSecurePassword, setSecurePassword] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleChangeEmail = (newEmail) => {
    setEmailError('');
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPasswordError('');
    setPassword(newPassword);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      const korErrorMsg = getKorErrorMsg(err.code);
      if (korErrorMsg.includes('이메일')) {
        setEmailError(korErrorMsg);
      } else {
        setPasswordError(korErrorMsg);
      }
    });
  };

  const handleForgotPasswordBtn = () => {
    navigation.navigate('forgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrap}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>이메일로 시작하기</Text>
        </View>

        <View style={styles.inputWrap}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>이메일 주소</Text>
            <TextInput
              inputMode="email"
              keyboardType="email-address"
              onChangeText={(newEmail) => handleChangeEmail(newEmail)}
              placeholder="이메일을 입력해 주세요"
              ref={emailRef}
              style={styles.input}
              value={email}
            />
            <Text style={styles.inputError}>{emailError}</Text>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>비밀번호</Text>
            <TextInput
              onChangeText={(newPassword) => handleChangePassword(newPassword)}
              onPressIn={() => setSecurePassword(false)}
              onPressOut={() => setSecurePassword(true)}
              placeholder="비밀번호를 입력해 주세요"
              ref={passwordRef}
              secureTextEntry={isSecurePassword}
              style={styles.input}
              value={password}
            />
            <Text style={styles.inputError}>{passwordError}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPasswordBtn} style={styles.forgotPasswordBtn}>
          <Text style={styles.forgotPasswordBtnText}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: Color.BACKGROUND_COLOR,
    flex: 1,
  },
  contentWrap: {
    flex: 1,
    paddingHorizontal: 40,
  },
  forgotPasswordBtn: {
    justifyContent: 'center',
  },
  forgotPasswordBtnText: {
    color: Color.BORDER_COLOR,
    fontSize: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  headers: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  input: {
    borderBottomColor: Color.BORDER_COLOR,
    borderBottomWidth: 1,
    borderRightColor: '#f6e8db',
    color: 'black',
    fontSize: 15,
  },
  inputBox: {
    marginVertical: 15,
  },
  inputError: {
    color: '#ff0000',
    fontSize: 10,
  },
  inputLabel: {
    color: Color.LABEL_COLOR,
    fontSize: 9,
  },
  inputWrap: {},
  loginBtn: {
    backgroundColor: Color.BUTTON_COLOR,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  loginBtnText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleWrap: {
    height: 35,
    marginVertical: 10,
  },
});
