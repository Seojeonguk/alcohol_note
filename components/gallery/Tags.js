import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { addTag, deleteTag } from '../redux/slices/GallerySlice';

import { useDispatch, useSelector } from 'react-redux';

export default function Tags() {
  const tags = useSelector((state) => state.gallery.tags);
  const dispatch = useDispatch();

  const [newTag, setNewTag] = useState('');

  const handleChangedTag = (tag) => {
    setNewTag(tag);
  };

  const initNewTag = () => {
    setNewTag('');
  };

  const handleSubmit = () => {
    dispatch(addTag(newTag));
    initNewTag();
  };

  const handleDeleteTag = (idx) => {
    dispatch(deleteTag(idx));
  };

  return (
    <View style={styles.tagBox}>
      {tags.map((tag, idx) => (
        <TouchableOpacity style={styles.tags} key={idx} onPress={() => handleDeleteTag(idx)}>
          <Text>#{tag}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        placeholder="태그 입력"
        onChangeText={(tag) => handleChangedTag(tag)}
        value={newTag}
        onSubmitEditing={handleSubmit}
        blurOnSubmit={false}
        style={styles.inputTag}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tagBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: 'grey',
    flexWrap: 'wrap',
  },
  tags: {
    backgroundColor: '#c9d1d9',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  inputTag: {
    margin: 5,
    borderBottomWidth: 0,
  },
});
