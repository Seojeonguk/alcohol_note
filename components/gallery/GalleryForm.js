import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles/GalleryFormStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as MediaLibrary from 'expo-media-library';

export default function GalleryForm({ navigation }) {
  const [gallery, setGallery] = useState({
    title: '',
    date: new Date().toJSON().substring(0, 10),
    photos: [],
    content: '',
    location: '',
    tags: [],
  });
  const [inputTag, setInputTag] = useState('');
  const { tags, date } = gallery;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [assetsOptions, setAssetsOptions] = useState({
    after: '0',
    hasNextPage: true,
  });
  const [mediaList, setMediaList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [screenWidthSize, setScreenWidthSize] = useState(Dimensions.get('window').width);

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

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const updateDate = (key, value) => {
    closeDatePicker();
    updateGallery(key, value.toJSON().substring(0, 10));
  };

  const deleteTag = (idx) => {
    const newTags = tags.filter((tag, index) => index !== idx);
    updateGallery('tags', newTags);
  };

  const showMediaLibrary = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') return;
    if (!assetsOptions.hasNextPage) return;
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo'],
      after: assetsOptions.after,
    });

    updateAssetsOptions(String(parseInt(assetsOptions.after) + 20), media.hasNextPage);

    setMediaList(mediaList.concat(media.assets.flatMap((value) => [value.uri])));
  };

  const updateAssetsOptions = (after, hasNextPage) => {
    setAssetsOptions({
      after: after,
      hasNextPage: hasNextPage,
    });
  };

  const addImageBtn = async () => {
    await showMediaLibrary();
    openModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const selectMedia = (item) => {
    setSelectedMedia(selectedMedia.concat(item));
  };

  const applySelectedMedia = () => {
    updateGallery('photos', selectedMedia);
    closeModal();
  };

  const save = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {gallery.photos.map((photo, index) => (
              <View
                style={{
                  height: screenWidthSize / 4,
                  width: screenWidthSize / 4,
                  padding: 5,
                }}
                key={index}
              >
                <Image
                  source={{ uri: photo }}
                  style={{ height: screenWidthSize / 4 - 10, width: screenWidthSize / 4 - 10 }}
                />
              </View>
            ))}
            <View style={{ height: screenWidthSize / 4, width: screenWidthSize / 4, padding: 5 }}>
              <TouchableOpacity
                onPress={addImageBtn}
                style={{
                  height: screenWidthSize / 4 - 10,
                  width: screenWidthSize / 4 - 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'grey',
                }}
              >
                <AntDesign name="pluscircleo" size={24} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          <Modal visible={showModal} onRequestClose={closeModal}>
            <FlatList
              ListEmptyComponent={<Text>Empty</Text>}
              data={mediaList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    zIndex: 9,
                    height: screenWidthSize / 4,
                    width: screenWidthSize / 4,
                    padding: 5,
                  }}
                  onPress={() => selectMedia(item)}
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      height: screenWidthSize / 4 - 10,
                      width: screenWidthSize / 4 - 10,
                    }}
                  />
                </TouchableOpacity>
              )}
              onEndReached={showMediaLibrary}
              numColumns={4}
            />
            <View style={{ flexDirection: 'row', height: 50 }}>
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={closeModal}
              >
                <Text>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={applySelectedMedia}
              >
                <Text>Apply</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={styles.inputBox}>
          <AntDesign name="calendar" size={24} color="black" />

          <TextInput
            placeholder="날짜"
            style={styles.input}
            value={gallery.date}
            onChangeText={(value) => updateGallery('date', value)}
            onPressIn={openDatePicker}
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
