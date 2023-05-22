import { StyleSheet, TextInput, View } from 'react-native';

import { updateContent } from '../redux';

import { useDispatch, useSelector } from 'react-redux';

export default function Content() {
  const content = useSelector((state) => state.gallery.content);
  const dispatch = useDispatch();

  const handleChangeContent = (newContent) => {
    dispatch(updateContent(newContent));
  };

  return (
    <View style={styles.inputBox}>
      <TextInput
        multiline
        onChangeText={(newContent) => handleChangeContent(newContent)}
        placeholder={'오늘 하루는 어떠셨나요?\n소감 및 느낀점을 적어주세요.'}
        style={styles.input}
        value={content}
        numberOfLines={15}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    textAlignVertical: 'top',
    lineHeight: 20,
    letterSpacing: 1.3,
  },
});
