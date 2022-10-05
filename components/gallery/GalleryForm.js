import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles/GalleryFormStyles';
import TagModal from './TagModal';

export default function GalleryForm({ navigation }) {
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [gallery, setGallery] = useState({
    title: '',
    date: '',
    photos: [],
    content: '',
    location: '',
    tags: [],
  });

  const updateGallery = (key, value) => {
    setGallery({
      ...gallery,
      [key]: value,
    });
  };

  const save = () => {};

  return (
    <SafeAreaView>
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>새 게시물</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={() => save()}>
          <Entypo name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="제목"
            value={gallery.title}
            onChangeText={(value) => {
              updateGallery('title', value);
            }}
            multiline
          />
        </View>

        <View>
          <Text>사진</Text>
          {/* 다중선택 */}
        </View>

        <View>
          <Text>날짜</Text>
          {/* 달력 열어서 선택 */}
        </View>

        <View style={styles.inputBox}>
          <TouchableOpacity onPress={() => setTagModalVisible(true)}>
            <Text>태그 추가</Text>
          </TouchableOpacity>
          {tagModalVisible && (
            <TagModal
              closeModal={() => setTagModalVisible(false)}
              currentTags={gallery.tags}
              updateTags={(key, value) => updateGallery(key, value)}
            />
          )}
          {gallery.tags.map((tag, idx) => (
            <Text key={idx}>{tag}</Text>
          ))}
        </View>

        <View style={styles.inputBox}>
          <MaterialIcons name="place" size={27} color="black" />
          <TextInput
            placeholder="장소"
            value={gallery.location}
            onChangeText={(value) => {
              updateGallery('location', value);
            }}
            multiline
            style={styles.input}
          />

          {/* 장소 설정하기 */}
        </View>

        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
          <TextInput placeholder="내용" multiline style={styles.input} />
          {/* 내용 입력 창 */}
        </View>
      </View>
    </SafeAreaView>
  );
}
