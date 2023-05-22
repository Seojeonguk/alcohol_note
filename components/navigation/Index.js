import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import {
  Details,
  ForgetPassword,
  Gallery,
  GalleryForm,
  Login,
  MainPage,
  RegistrationForm,
  Settings,
} from '../../screens';

const Tab = createNativeStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="mainPage" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="mainPage" component={MainPage} />
        <Tab.Screen name="login" component={Login} />
        <Tab.Screen name="registration" component={RegistrationForm} />
        <Tab.Screen name="forgotPassword" component={ForgetPassword} />
        <Tab.Screen name="Gallery" component={Gallery} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="galleryForm" component={GalleryForm} />
        <Tab.Screen name="detail" component={Details} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
