import Settings from '../screen/Settings';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SettingsStack = createNativeStackNavigator();
export default function SettingsNavigation() {
  return (
    <SettingsStack.Navigator initialRouteName="settings" screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}
