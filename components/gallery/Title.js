import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateTitle } from '../redux/slices/GallerySlice';

import { useDispatch } from 'react-redux';

export default function Title() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const applyupdatedTitle = () => {
    dispatch(updateTitle(title));
  };

  const handleChangeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <View style={styles.inputBox}>
      <TextInput
        multiline
        onChangeText={(newTitle) => handleChangeTitle(newTitle)}
        onEndEditing={applyupdatedTitle}
        placeholder="제목"
        style={styles.input}
        value={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  inputBox: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
