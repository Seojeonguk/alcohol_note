import Login from '../screen/Login';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

export default function NoBottomNavigation() {
  return (
    <Tab.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="login" component={Login} />
    </Tab.Navigator>
  );
}
