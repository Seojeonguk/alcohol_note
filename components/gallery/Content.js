import { StyleSheet, TextInput, View } from 'react-native';

import { updateContent } from '../redux/slices/GallerySlice';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

export default function Content() {
  const content = useSelector((state) => state.gallery.content);
  const dispatch = useDispatch();

  const handleChangeContent = (newContent) => {
    dispatch(updateContent(newContent));
  };

  return (
    <View style={styles.inputBox}>
      <MaterialCommunityIcons color="black" name="text-box-outline" size={24} />
      <TextInput
        multiline
        onChangeText={(newContent) => handleChangeContent(newContent)}
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
