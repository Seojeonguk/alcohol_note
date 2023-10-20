import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Post({ item, isMiddle, navigation }) {
  const { presentivePhoto, docId } = item;
  const { width, height } = Dimensions.get('window');
  const minDimension = Math.min(width, height);
  const imgHeight = minDimension / 3;

  const movedetial = () => {
    navigation.navigate('Details', { docId: docId });
  };

  return (
    <TouchableOpacity activeOpacity={0.2} onPress={movedetial}>
      <Image
        source={{ uri: presentivePhoto }}
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
