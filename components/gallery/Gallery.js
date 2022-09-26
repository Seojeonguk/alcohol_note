import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles/GalleryStyles';
import { data } from './dummyData';
import GalleryCard from './GalleryCard';
import MasonryList from '@react-native-seoul/masonry-list';
import { AntDesign } from '@expo/vector-icons';

export default function Gallery({ navigation }) {
  const moveGalleryForm = () => {
    navigation.navigate('galleryForm');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>Gallery</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={moveGalleryForm}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <MasonryList
        numColumns={3}
        data={data}
        renderItem={({ item }) => <GalleryCard item={item} />}
        contentContainerStyle={styles.galleryContent}
      />
    </SafeAreaView>
  );
}
