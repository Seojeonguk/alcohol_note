import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles/GalleryFormStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function GalleryForm({ navigation }) {
  const [gallery, setGallery] = useState({
    title: '',
    date: new Date(),
    photos: [],
    content: '',
    location: '',
    tags: [],
  });
  const [inputTag, setInputTag] = useState('');
  const { tags, date } = gallery;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateGallery = (key, value) => {
    setGallery({
      ...gallery,
      [key]: value,
    });
  };

  const updateListGallery = (key, value) => {
    setInputTag('');
    updateGallery(key, value);
  };

  const updateDate = (key, value) => {
    setShowDatePicker(false);
    updateGallery(key, value.toJSON().substring(0, 10));
  };

  const deleteTag = (idx) => {
    const newTags = tags.filter((tag, index) => index !== idx);
    updateGallery('tags', newTags);
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

      <ScrollView>
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

        <View style={styles.inputBox}>
          <AntDesign name="calendar" size={24} color="black" />

          <TextInput
            placeholder="날짜"
            style={styles.input}
            value={gallery.date}
            onChangeText={(value) => updateGallery('date', value)}
            onPressIn={() => setShowDatePicker(true)}
          />

          {showDatePicker && (
            <DateTimePicker
              value={new Date(gallery.date)}
              mode="date"
              onChange={(e, value) => updateDate('date', value)}
            />
          )}
        </View>

        <View style={styles.tagBox}>
          {gallery.tags.map((tag, idx) => (
            <TouchableOpacity style={styles.tags} key={idx} onPress={() => deleteTag(idx)}>
              <Text>#{tag}</Text>
            </TouchableOpacity>
          ))}

          <TextInput
            placeholder="태그 입력"
            onChangeText={(tag) => setInputTag(tag)}
            value={inputTag}
            onSubmitEditing={() => updateListGallery('tags', [...gallery.tags, inputTag])}
            blurOnSubmit={false}
            style={styles.inputTag}
          />
        </View>

        <View style={styles.inputBox}>
          <MaterialIcons name="place" size={24} color="black" />
          <TextInput
            placeholder="장소"
            value={gallery.location}
            onChangeText={(value) => updateGallery('location', value)}
            multiline
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
          <TextInput placeholder="내용" multiline style={styles.input} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
