import BottomNavigation from './BottomNavigation';
import NoBottomNavigation from './NoBottomNavigation';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import { auth } from '../../firebaseConfig';
import { useState } from 'react';

const Tab = createNativeStackNavigator();

export default function Index() {
  const [isLogin, setLogin] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="nobottom" screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <Tab.Screen name="bottom" component={BottomNavigation} />
        ) : (
          <Tab.Screen name="nobottom" component={NoBottomNavigation} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
