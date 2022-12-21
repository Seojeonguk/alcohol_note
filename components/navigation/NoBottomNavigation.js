import Login from '../screen/Login';
import MainPage from '../screen/MainPage';
import RegistrationForm from '../screen/RegistrationForm';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

export default function NoBottomNavigation() {
  return (
    <Tab.Navigator initialRouteName="mainPage" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="mainPage" component={MainPage} />
      <Tab.Screen name="login" component={Login} />
      <Tab.Screen name="registration" component={RegistrationForm} />
    </Tab.Navigator>
  );
}
