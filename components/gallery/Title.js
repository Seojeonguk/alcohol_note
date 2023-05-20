import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateTitle } from '../redux/slices/GallerySlice';

import { useDispatch, useSelector } from 'react-redux';

export default function Title() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.gallery.title);

  const handleChangeTitle = (newTitle) => {
    dispatch(updateTitle(newTitle));
  };

  return (
    <View style={styles.inputBox}>
      <TextInput
        multiline
        onChangeText={(newTitle) => handleChangeTitle(newTitle)}
        placeholder="제목을 입력해주세요."
        style={styles.input}
        value={title}
        maxLength={40}
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
