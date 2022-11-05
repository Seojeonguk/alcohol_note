import BottomNavigation from './BottomNavigation';
import NoBottomNavigation from './NoBottomNavigation';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

const Tab = createNativeStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="nobottom" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="nobottom" component={NoBottomNavigation} />
        <Tab.Screen name="bottom" component={BottomNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
