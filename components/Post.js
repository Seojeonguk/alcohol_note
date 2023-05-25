import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Post({ item, isMiddle, navigation }) {
  const { post } = item;
  const uri =
    post.photos?.[0] ||
    'https://firebasestorage.googleapis.com/v0/b/alcoholic-a9f86.appspot.com/o/default.jfif?alt=media&token=18e253aa-6a28-4a68-9823-eaf0726b6830';
  const { width, height } = Dimensions.get('window');
  const minDimension = Math.min(width, height);
  const imgHeight = minDimension / 3;

  const movedetial = () => {
    navigation.navigate('Details', item);
  };

  return (
    <TouchableOpacity activeOpacity={0.2} onPress={movedetial}>
      <Image
        source={{ uri: uri }}
        style={[
          styles.itemPhoto,
          {
            height: imgHeight,
            marginHorizontal: isMiddle ? 2 : 0,
          },
        ]}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemPhoto: {
    marginBottom: 2,
    resizeMode: 'stretch',
  },
});
