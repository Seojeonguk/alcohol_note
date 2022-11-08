import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth } from '../../firebaseConfig';
import { getKorErrorMsg } from '../util';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegistrationForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeEmail = (newEmail) => {
    setErrorMessage('');
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setErrorMessage('');
    setPassword(newPassword);
  };

  const handleCancelBtn = () => {
    navigation.goBack();
  };

  const RegistUser = () => {
    if (email === '' || password === '') {
      setErrorMessage('이메일 또는 비밀번호를 입력해주세요.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // To do list
        // 1. Showing the success modal
        // 2. To go to the login screen
      })
      .catch((err) => {
        let errorCode = err.code;
        setErrorMessage(getKorErrorMsg(errorCode));
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={(newEmail) => handleChangeEmail(newEmail)}
          placeholder="이메일을 입력해 주세요"
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={(newPassword) => handleChangePassword(newPassword)}
          placeholder="비밀번호를 입력해 주세요"
          style={styles.input}
          value={password}
        />

        <Text style={styles.error}>{errorMessage}</Text>
      </View>

      <View style={styles.bottomBtnWrapper}>
        <TouchableOpacity onPress={handleCancelBtn} style={styles.bottomBtn}>
          <Text style={styles.bottomText}>취소</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={RegistUser} style={styles.bottomBtn}>
          <Text style={styles.bottomText}>가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  bottomBtnWrapper: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bottomText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 5,
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
});
