import { NAVIGATOR } from '../constants';
import {
  Details,
  ForgetPassword,
  Gallery,
  GalleryForm,
  Login,
  MainPage,
  RegistrationForm,
  Settings,
} from '../screens';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName={NAVIGATOR.MAIN_PAGE} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATOR.MAIN_PAGE} component={MainPage} />
      <Stack.Screen name={NAVIGATOR.LOGIN} component={Login} />
      <Stack.Screen name={NAVIGATOR.REGISTRATION_FORM} component={RegistrationForm} />
      <Stack.Screen name={NAVIGATOR.FORGOT_PASSWORD} component={ForgetPassword} />
      <Stack.Screen name={NAVIGATOR.GALLERY} component={Gallery} />
      <Stack.Screen name={NAVIGATOR.SETTINGS} component={Settings} />
      <Stack.Screen name={NAVIGATOR.GALLERY_FORM} component={GalleryForm} />
      <Stack.Screen name={NAVIGATOR.DETAILS} component={Details} />
    </Stack.Navigator>
  );
}
