import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { COLORS, NAVIGATOR } from '../constants';
import { Gallery, Settings } from '../screens';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNav() {
  const galleryIcon = ({ color }) => {
    return <Entypo name="drink" size={24} color={color} />;
  };

  const settingsIcon = ({ color }) => {
    return <FontAwesome name="gear" size={24} color={color} />;
  };

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATOR.GALLERY}
      screenOptions={{ headerShown: false }}
      shifting
      activeColor={COLORS.BOTTOM_TAB_ACTIVE_COLOR}
      inactiveColor={COLORS.BOTTOM_TAB_INACTIVE_COLOR}
    >
      <Tab.Screen
        name={NAVIGATOR.GALLERY}
        component={Gallery}
        options={{
          tabBarLabel: NAVIGATOR.GALLERY,
          tabBarIcon: galleryIcon,
          tabBarColor: COLORS.BOTTOM_TAB_GALLERY_COLOR,
        }}
      />
      <Tab.Screen
        name={NAVIGATOR.SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: NAVIGATOR.SETTINGS,
          tabBarIcon: settingsIcon,
          tabBarColor: COLORS.BOTTOM_TAB_SETTINGS_COLOR,
        }}
      />
    </Tab.Navigator>
  );
}
