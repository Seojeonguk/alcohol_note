import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles/GalleryFormStyles';

export default function GalleryForm({ navigation }) {
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
        <View>
          <Text>제목</Text>
          <TextInput
            placeholder="제목"
            value={gallery.title}
            onChangeText={(value) => {
              updateGallery('title', value);
            }}
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

        <View>
          <Text>태그</Text>
          {/* 태그 모달에서 태그 작성 */}
        </View>

        <View>
          <Text>장소</Text>
          {/* 장소 설정하기 */}
        </View>

        <View>
          <Text>내용</Text>
          {/* 내용 입력 창 */}
        </View>
      </View>
    </SafeAreaView>
  );
}
