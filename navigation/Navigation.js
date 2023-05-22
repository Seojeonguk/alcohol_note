import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackNav from './StackNav';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StackNav" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StackNav" component={StackNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
