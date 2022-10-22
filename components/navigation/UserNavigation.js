import User from '../user/User';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserStack = createNativeStackNavigator();
export default function UserNavigation() {
  return (
    <UserStack.Navigator initialRouteName="user" screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="user" component={User} />
    </UserStack.Navigator>
  );
}
