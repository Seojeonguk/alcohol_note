import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function TagModal({ closeModal, currentTags, updateTags }) {
  const [tagText, setTagText] = useState('');
  const [addTagList, setAddTagList] = useState([]);
  const backBtn = () => {
    closeModal();
  };

  const addtag = () => {
    setAddTagList(addTagList.concat(tagText));
    setTagText('');
  };

  const deleteTag = (idx) => {
    setAddTagList(addTagList.filter((tag, index) => index !== idx));
  };

  useEffect(() => {
    setAddTagList(currentTags);
  }, []);

  const saveTags = () => {
    Alert.alert('변경하시겠습니까?', '정말 변경하시겠습니까?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          updateTags('tags', addTagList);
          closeModal();
        },
      },
    ]);
    // 정말 변경할것인지?
    // 변경하면 update하고
    // 취소하면 경고창 없애기
  };
  return (
    <Modal visible>
      <View>
        <TouchableOpacity onPress={backBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text>태그 추가</Text>
        <TouchableOpacity onPress={saveTags}>
          <Entypo name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="태그"
          value={tagText}
          onChangeText={(text) => setTagText(text)}
          onSubmitEditing={addtag}
          blurOnSubmit={false}
        />
        <Text style={{ fontSize: 30 }}>tags</Text>
        <View>
          {addTagList.length !== 0 ? (
            addTagList.map((tag, idx) => (
              <TouchableOpacity onPress={() => deleteTag(idx)}>
                <Text>{tag}</Text>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            ))
          ) : (
            <Text>Empty Tag!</Text>
          )}
        </View>
        <Button title="addList 값 출력" onPress={() => console.log(addTagList)} />
      </View>
    </Modal>
  );
}
