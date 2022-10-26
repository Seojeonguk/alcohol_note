import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateContent } from '../redux/slices/GallerySlice';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

export default function Content() {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const applyupdatedContent = () => {
    dispatch(updateContent(content));
  };

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  return (
    <View style={styles.inputBox}>
      <MaterialCommunityIcons color="black" name="text-box-outline" size={24} />
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
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});
