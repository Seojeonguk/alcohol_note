import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles/GalleryListStyles';
import { useEffect, useState } from 'react';

const h = Math.floor(Math.random() * 100 + 100);

export default function GalleryList({ item }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const h = Math.floor(Math.random() * 100 + 200);
    setHeight(h);
  }, []);
  return (
    <View style={{ height: height, padding: 5, margin: 5, backgroundColor: 'green' }}>
      <TouchableOpacity style={styles.button} activeOpacity={0.2}>
        <Image source={{ uri: item.photos[0] }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
