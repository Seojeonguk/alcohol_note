import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from '../../firebaseConfig';
import { getKorErrorMsg } from '../util';

import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const showPassword = () => {
    setPasswordVisible(true);
  };

  const hidePassword = () => {
    setPasswordVisible(false);
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
        <View style={styles.passWrap}>
          <TextInput
            onChangeText={(newPassword) => handleChangePassword(newPassword)}
            placeholder="비밀번호를 입력해 주세요"
            ref={passwordRef}
            secureTextEntry={!passwordVisible}
            style={[styles.input, { flex: 1 }]}
            value={password}
          />

          <Pressable onPressIn={showPassword} onPressOut={hidePassword} style={styles.passIcon}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
          </Pressable>
        </View>

        <Text style={styles.errMsg}>{errorMessage}</Text>

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.otherBox}>
          <Text style={styles.registrationBtn} onPress={moveRegistration}>
            회원가입
          </Text>
        </View>
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
    marginVertical: 15,
  },
  passIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 9,
  },
  passWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registrationBtn: {
    fontSize: 20,
    color: '#eeeeee',
  },
});
