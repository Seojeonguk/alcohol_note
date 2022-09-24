import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles/GalleryListStyles';

export default function GalleryList({ item }) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.button} activeOpacity={0.2}>
        <Image source={{ uri: item.photos[0] }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
