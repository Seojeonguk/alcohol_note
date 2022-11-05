import BottomNavigation from './BottomNavigation';
import Login from '../screen/Login';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

const Tab = createNativeStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="login" component={Login} />
        <Tab.Screen name="bottom" component={BottomNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
