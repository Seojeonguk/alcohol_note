import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';

export default function GalleryCard({ item, i }) {
  const height = useMemo(() => Math.floor(Math.random() * 100 + 200));
  const isCenter = i % 3 === 1;

  return (
    <View>
      <TouchableOpacity activeOpacity={0.2}>
        <Image
          source={{ uri: item.photos[0] }}
          style={[
            {
              height: height,
              marginHorizontal: isCenter ? 2 : 0,
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
    marginBottom: 2,
    resizeMode: 'stretch',
  },
});
