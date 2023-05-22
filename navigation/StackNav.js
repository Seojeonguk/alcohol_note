import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="GalleryForm" component={GalleryForm} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
