import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useMemo } from 'react';

export default function GalleryCard({ item }) {
  const height = useMemo(() => Math.floor(Math.random() * 100 + 200));

  return (
    <View>
      <TouchableOpacity activeOpacity={0.2}>
        <Image
          source={{ uri: item.photos[0] }}
          style={[
            {
              height: height,
            },
            styles.itemImage,
          ]}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    resizeMode: 'stretch',
    borderRadius: 5,
    margin: 5,
  },
});
