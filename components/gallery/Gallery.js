import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles/GalleryStyles';

export default function Gallery() {
  return (
    <SafeAreaView>
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>Gallery</Text>
      </View>
    </SafeAreaView>
  );
}
