import Gallery from '../screen/Gallery';
import GalleryForm from '../screen/GalleryForm';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GalleryStack = createNativeStackNavigator();
export default function GalleryNavigation() {
  return (
    <GalleryStack.Navigator initialRouteName="gallery" screenOptions={{ headerShown: false }}>
      <GalleryStack.Screen name="gallery" component={Gallery} />
      <GalleryStack.Screen name="galleryForm" component={GalleryForm} />
    </GalleryStack.Navigator>
  );
}
