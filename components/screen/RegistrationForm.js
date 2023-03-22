import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from '../../firebaseConfig';
import { Color, getKorErrorMsg } from '../util';

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegistrationForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSecurePassword, setSecurePassword] = useState(true);
  const [isSecurePasswordConfirm, setIsSecurePasswordConfirm] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleChangeEmail = (newEmail) => {
    setEmailError('');
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPasswordError('');
    setPassword(newPassword);
  };

  const handleChangeConfirmPassword = (confirmPassword) => {
    setConfirmPasswordError('');
    setConfirmPassword(confirmPassword);
  };

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      confirmPasswordRef.current.focus();
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('mainPage');
      })
      .catch((err) => {
        const korErrorMsg = getKorErrorMsg(err.code);
        if (korErrorMsg.includes('이메일')) {
          setEmailError(korErrorMsg);
        } else {
          setPasswordError(korErrorMsg);
        }
      });
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
          <Text style={styles.title}>이메일로 회원가입</Text>
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

          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>비밀번호 확인</Text>
            <TextInput
              onChangeText={(newConfirmPassword) => handleChangeConfirmPassword(newConfirmPassword)}
              onPressIn={() => setIsSecurePasswordConfirm(false)}
              onPressOut={() => setIsSecurePasswordConfirm(true)}
              placeholder="비밀번호(확인)를 입력해 주세요"
              ref={confirmPasswordRef}
              secureTextEntry={isSecurePasswordConfirm}
              style={styles.input}
              value={confirmPassword}
            />
            <Text style={styles.inputError}>{confirmPasswordError}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleRegistration} style={styles.registrationBtn}>
          <Text style={styles.registrationBtnText}>회원가입</Text>
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
    color: '#888888',
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
    borderBottomColor: '#888888',
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
    color: '#888888',
    fontSize: 9,
  },
  inputWrap: {},
  registrationBtn: {
    backgroundColor: '#abceea',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  registrationBtnText: {
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
