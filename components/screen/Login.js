import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from '../../firebaseConfig';
import { getKorErrorMsg } from '../util';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  const moveRegistration = () => {
    navigation.navigate('registration');
  };

  const handleLogin = () => {
    if (email === '') {
      setErrorMessage(getKorErrorMsg('missing/email'));
      emailRef.current.focus();
      return;
    }
    if (password === '') {
      setErrorMessage(getKorErrorMsg('missing/password'));
      passwordRef.current.focus();
      return;
    }
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      let errCode = err.code;
      setErrorMessage(getKorErrorMsg(errCode));
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={(newEmail) => handleChangeEmail(newEmail)}
          placeholder="이메일을 입력해 주세요"
          ref={emailRef}
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={(newPassword) => handleChangePassword(newPassword)}
          placeholder="비밀번호를 입력해 주세요"
          ref={passwordRef}
          style={styles.input}
          value={password}
        />

        <Text style={styles.errMsg}>{errorMessage}</Text>

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otherBox}>
        <Text style={styles.registrationBtn} onPress={moveRegistration}>
          회원가입
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  errMsg: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#eeeeee',
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputBox: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  loginBtn: {
    borderRadius: 5,
    backgroundColor: 'tomato',
    alignItems: 'center',
    padding: 5,
  },
  loginBtnText: {
    fontSize: 20,
  },
  otherBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registrationBtn: {
    fontSize: 20,
    color: '#eeeeee',
  },
});
