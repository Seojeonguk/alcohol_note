import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Gallery from './components/gallery/Gallery';
import User from './components/user/User';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Gallery" activeColor="#fdfffd" inactiveColor="#a3c2ff" shifting>
          <Tab.Screen name="Gallery" component={Gallery} />
          <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
