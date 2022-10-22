import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Gallery from './components/gallery/Gallery';
import User from './components/user/User';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import GalleryForm from './components/gallery/GalleryForm';

const Tab = createMaterialBottomTabNavigator();
const GalleryStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

function GalleryScreen() {
  return (
    <GalleryStack.Navigator initialRouteName="gallery" screenOptions={{ headerShown: false }}>
      <GalleryStack.Screen name="gallery" component={Gallery} />
      <GalleryStack.Screen name="galleryForm" component={GalleryForm} />
    </GalleryStack.Navigator>
  );
}

function UserScreen() {
  return (
    <UserStack.Navigator initialRouteName="user" screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="user" component={User} />
    </UserStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Gallery"
          activeColor="#fdfffd"
          inactiveColor="#a3c2ff"
          shifting
        >
          <Tab.Screen
            name="Gallery"
            component={GalleryScreen}
            options={{
              tabBarLabel: 'Gallery',
              tabBarIcon: ({ color }) => <Entypo name="drink" size={24} color={color} />,
              tabBarColor: '#eeb7b4',
            }}
          />
          <Tab.Screen
            name="User"
            component={UserScreen}
            options={{
              tabBarLabel: 'User',
              tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
              tabBarColor: '#f2cfa5',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
