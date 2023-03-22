import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from '../../firebaseConfig';
import { Color, getKorErrorMsg } from '../util';

import { Ionicons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef();

  const handleChangeEmail = (newEmail) => {
    setEmailError('');
    setEmail(newEmail);
  };

  const handleSendEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        const korErrorMsg = getKorErrorMsg(err.code);
        console.log(err.code);
        setEmailError(korErrorMsg);
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
          <Text style={styles.title}>비밀번호를 잊으셨나요?</Text>
        </View>

        <View style={styles.inputWrap}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>이메일 주소</Text>
            <TextInput
              onChangeText={(newEmail) => handleChangeEmail(newEmail)}
              placeholder="이메일을 입력해 주세요"
              ref={emailRef}
              style={styles.input}
              value={email}
            />
            <Text style={styles.inputError}>{emailError}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSendEmail} style={styles.sendEmailBtn}>
          <Text style={styles.sendEmailBtnText}>이메일 전송</Text>
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
    color: Color.BORDER_COLOR,
    fontSize: 9,
  },
  inputWrap: {},
  sendEmailBtn: {
    backgroundColor: '#abceea',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  sendEmailBtnText: {
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
