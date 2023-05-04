import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

import Details from '../screen/Details';
import ForgetPassword from '../screen/ForgotPassword';
import Gallery from '../screen/Gallery';
import GalleryForm from '../screen/GalleryForm';
import Login from '../screen/Login';
import MainPage from '../screen/MainPage';
import RegistrationForm from '../screen/RegistrationForm';
import Settings from '../screen/Settings';

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
