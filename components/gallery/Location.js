import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateLocation } from '../redux/slices/GallerySlice';

import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

export default function Location() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');

  const handleChangeLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const applyupdatedLocation = () => {
    dispatch(updateLocation(location));
  };

  return (
    <View style={styles.inputBox}>
      <MaterialIcons name="place" size={24} color="black" />
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
  inputBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: 'grey',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});
