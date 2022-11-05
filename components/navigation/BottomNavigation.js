import GalleryNavigation from './GalleryNavigation';
import SettingsNavigation from './SettingsNavigation';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation() {
  return (
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
        name="Settings"
        component={SettingsNavigation}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="gear" size={24} color={color} />,
          tabBarColor: '#f2cfa5',
        }}
      />
    </Tab.Navigator>
  );
}
