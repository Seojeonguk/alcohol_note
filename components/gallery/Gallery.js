import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { data } from './dummyData';
import GalleryCard from './GalleryCard';
import MasonryList from '@react-native-seoul/masonry-list';
import { AntDesign } from '@expo/vector-icons';

export default function Gallery({ navigation }) {
  const moveGalleryForm = () => {
    navigation.navigate('galleryForm');
  };
  return (
    <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    paddingVertical: 5,
    marginBottom: 5,
  },
  galleryTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  uploadBtn: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  galleryContent: {
    paddingHorizontal: 12,
    alignSelf: 'stretch',
  },
});
