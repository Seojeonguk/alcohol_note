import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles/GalleryStyles';
import { data } from './dummyData';
import GalleryList from './GalleryList';
import MasonryList from '@react-native-seoul/masonry-list';

export default function Gallery() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>Gallery</Text>
      </View>

      <MasonryList numColumns={3} data={data} renderItem={({ item }) => <GalleryList item={item} />} />
      {/* <FlatList
        style={styles.galleryContent}
        data={data}
        renderItem={({ item }) => <GalleryList item={item} />}
        ListEmptyComponent={() => <Text>Empty</Text>}
        keyExtractor={(item) => item.no}
        numColumns={2}
      /> */}
    </SafeAreaView>
  );
}
