import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { addTag, deleteTag } from '../redux';

import { Octicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';

export default function Tags() {
  const dispatch = useDispatch();
  const [newTag, setNewTag] = useState('');
  const tags = useSelector((state) => state.gallery.tags);
  const ref = useRef();

  const handleChangedTag = (tag) => {
    setNewTag(tag);
  };

  const handleDeleteTag = (idx) => {
    dispatch(deleteTag(idx));
  };

  const handleSubmit = () => {
    dispatch(addTag(newTag));
    initNewTag();
  };

  const initNewTag = () => {
    setNewTag('');
  };

  const clicking = () => {
    ref.current.focus();
  };

  return (
    <TouchableOpacity style={styles.tagBox} onPress={clicking}>
      <Octicons name="hash" size={24} color="black" />

      {tags.map((tag, idx) => (
        <TouchableOpacity key={idx} onPress={() => handleDeleteTag(idx)} style={styles.tags}>
          <Text>{tag}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        blurOnSubmit={false}
        onChangeText={(tag) => handleChangedTag(tag)}
        onSubmitEditing={handleSubmit}
        placeholder="태그 입력"
        style={styles.inputTag}
        value={newTag}
        ref={ref}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputTag: {
    margin: 5,
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  tags: {
    alignItems: 'center',
    backgroundColor: '#c9d1d9',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
