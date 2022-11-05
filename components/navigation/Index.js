import GalleryNavigation from './GalleryNavigation';
import SettingsNavigation from './SettingsNavigation';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Gallery"
        activeColor="#fdfffd"
        inactiveColor="#a3c2ff"
        shifting
      >
        <Tab.Screen
          name="Gallery"
          component={GalleryNavigation}
          options={{
            tabBarLabel: 'Gallery',
            tabBarIcon: ({ color }) => <Entypo name="drink" size={24} color={color} />,
            tabBarColor: '#eeb7b4',
          }}
        />
        <Tab.Screen
          name="User"
          component={SettingsNavigation}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
            tabBarColor: '#f2cfa5',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
