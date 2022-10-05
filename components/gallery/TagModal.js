import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
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
    <Modal visible style={styles.modalContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backBtn} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>태그 추가</Text>
        <TouchableOpacity onPress={saveTags} style={styles.saveBtn}>
          <Entypo name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="엔터로 해시태그를 등록해주세요"
          value={tagText}
          onChangeText={(text) => setTagText(text)}
          onSubmitEditing={addtag}
          blurOnSubmit={false}
          style={styles.tagInput}
        />
        <Text style={styles.tagheader}>태그 목록</Text>
        <FlatList
          data={addTagList}
          ListEmptyComponent={<Text style={styles.emptytag}>설정된 태그가 존재하지 않습니다.</Text>}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.tags} key={index} onPress={() => deleteTag(index)}>
              <Text style={{ color: 'white' }}>{item}</Text>
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          )}
          numColumns={4}
          keyExtractor={(key, index) => {
            return index;
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    paddingVertical: 5,
    marginBottom: 5,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  saveBtn: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  tagInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 10,
  },
  tagheader: {
    fontSize: 30,
    padding: 10,
  },
  tags: {
    backgroundColor: '#9ea9d8',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    overflow: 'scroll',
  },
  emptytag: {
    color: 'grey',
    paddingHorizontal: 10,
  },
});
