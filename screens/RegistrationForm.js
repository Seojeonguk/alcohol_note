import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Header } from '../components';
import { COLORS, NAVIGATOR } from '../constants';
import { createUserInfo } from '../firebase';
import { auth } from '../firebaseConfig';
import { getKorErrorMsg, setEmailRequestLimit, showToast } from '../lib';

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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

  const showSuccessToastForEmailSending = () => {
    showToast(
      'success',
      '이메일의 메일함을 확인바랍니다',
      `${email}로 인증 메일을 발송하였습니다.`,
      'top'
    );
  };

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      confirmPasswordRef.current.focus();
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      await setEmailRequestLimit();
      await createUserInfo(email);
      showSuccessToastForEmailSending();
      navigation.replace(NAVIGATOR.LOGIN);
    } catch (e) {
      const korErrorMsg = getKorErrorMsg(e.code);
      if (korErrorMsg.includes('이메일')) {
        setEmailError(korErrorMsg);
      } else {
        setPasswordError(korErrorMsg);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        visibleLeftIcon={true}
        visibleRightIcon={false}
        leftIconName={'arrow-back'}
        onPressLeft={() => navigation.goBack()}
        iconSize={24}
      />

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
              onChangeText={handleChangeEmail}
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
              onChangeText={handleChangePassword}
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
              onChangeText={handleChangeConfirmPassword}
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
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
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
    color: COLORS.BORDER_COLOR,
    fontSize: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  input: {
    borderBottomColor: COLORS.BORDER_COLOR,
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
    color: COLORS.LABEL_COLOR,
    fontSize: 9,
  },
  inputWrap: {},
  registrationBtn: {
    backgroundColor: COLORS.BUTTON_COLOR,
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
