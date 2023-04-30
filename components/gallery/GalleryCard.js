import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';

export default function GalleryCard({ item, i }) {
  const uri =
    item.photos?.[0] ||
    'https://firebasestorage.googleapis.com/v0/b/alcoholic-a9f86.appspot.com/o/default.jfif?alt=media&token=18e253aa-6a28-4a68-9823-eaf0726b6830';
  const height = useMemo(() => Math.floor(Math.random() * 100 + 200));
  const isCenter = i % 3 === 1;

  return (
    <View>
      <TouchableOpacity activeOpacity={0.2}>
        <Image
          source={{ uri: uri }}
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
