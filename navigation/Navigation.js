import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATOR } from '../constants';
import StackNav from './StackNav';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NAVIGATOR.STACK_NAV}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={NAVIGATOR.STACK_NAV} component={StackNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
