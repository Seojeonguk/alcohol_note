import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateContent } from '../redux/slices/GallerySlice';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

export default function Content() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  const applyupdatedContent = () => {
    dispatch(updateContent(content));
  };

  return (
    <View style={styles.inputBox}>
      <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
      <TextInput
        multiline
        onChangeText={(newContent) => handleChangeContent(newContent)}
        onEndEditing={applyupdatedContent}
        placeholder="내용"
        style={styles.input}
        value={content}
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
