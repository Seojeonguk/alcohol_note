import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateLocation } from '../redux/slices/GallerySlice';

import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

export default function Location() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');

  const applyupdatedLocation = () => {
    dispatch(updateLocation(location));
  };

  const handleChangeLocation = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <View style={styles.inputBox}>
      <MaterialIcons color="black" name="place" size={24} />
      <TextInput
        multiline
        onChangeText={(newLocation) => handleChangeLocation(newLocation)}
        onEndEditing={applyupdatedLocation}
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
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
