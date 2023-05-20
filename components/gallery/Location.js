import { StyleSheet, TextInput, View } from 'react-native';

import { updateLocation } from '../redux/slices/GallerySlice';

import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

export default function Location() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.gallery.location);

  const handleChangeLocation = (newLocation) => {
    dispatch(updateLocation(newLocation));
  };

  return (
    <View style={styles.inputBox}>
      <MaterialIcons color="black" name="place" size={24} />
      <TextInput
        multiline
        onChangeText={(newLocation) => handleChangeLocation(newLocation)}
        placeholder="장소"
        style={styles.input}
        value={location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  inputBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
});
