import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          onChangeText={(newEmail) => handleChangeEmail(newEmail)}
          placeholder="Email"
          value={email}
        />
        <TextInput
          onChangeText={(newPassword) => handleChangePassword(newPassword)}
          placeholder="Password"
          value={password}
        />
      </View>
    </SafeAreaView>
  );
}
