import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';

import Tags from './Tags';
import Title from './Title';

import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const screenWidthSize = Dimensions.get('window').width;

export default function GalleryForm({ navigation }) {
  const gallery = useSelector((state) => state.gallery);
  const { tags } = gallery;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [assetsOptions, setAssetsOptions] = useState({
    after: '0',
    hasNextPage: true,
  });
  const [mediaList, setMediaList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const updateGallery = (key, value) => {
    setGallery({
      ...gallery,
      [key]: value,
    });
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
    <SafeAreaView style={styles.container}>
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
        <Title />

        <View style={styles.photosContainer}>
          {gallery.photos.map((photo, index) => (
            <View style={styles.photosWrapper} key={index}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </View>
          ))}
          <View style={styles.photosWrapper}>
            <TouchableOpacity onPress={addImageBtn} style={styles.addBtn}>
              <AntDesign name="pluscircleo" size={24} color="grey" />
            </TouchableOpacity>
          </View>

          <Modal visible={showModal} onRequestClose={closeModal}>
            <FlatList
              ListEmptyComponent={<Text>Empty</Text>}
              data={mediaList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalPhotosWrapper}
                  onPress={() => selectMedia(item)}
                >
                  <Image source={{ uri: item }} style={styles.modalPhoto} />
                </TouchableOpacity>
              )}
              onEndReached={showMediaLibrary}
              numColumns={4}
            />
            <View style={styles.modalBottomMenu}>
              <TouchableOpacity style={styles.modalBottomMenuBtn} onPress={closeModal}>
                <Text>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBottomMenuBtn} onPress={applySelectedMedia}>
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

        <Tags />

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
          <TextInput
            placeholder="내용"
            multiline
            style={styles.input}
            value={gallery.content}
            onChangeText={(value) => updateGallery('content', value)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    paddingVertical: 5,
    marginBottom: 5,
  },
  galleryTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  saveBtn: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  inputBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: 'grey',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photosWrapper: {
    height: screenWidthSize / 4,
    width: screenWidthSize / 4,
    padding: 5,
  },
  photo: {
    height: screenWidthSize / 4 - 10,
    width: screenWidthSize / 4 - 10,
  },
  addBtn: {
    height: screenWidthSize / 4 - 10,
    width: screenWidthSize / 4 - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  modalPhotosWrapper: {
    zIndex: 9,
    height: screenWidthSize / 4,
    width: screenWidthSize / 4,
    padding: 5,
  },
  modalPhoto: {
    height: screenWidthSize / 4 - 10,
    width: screenWidthSize / 4 - 10,
  },
  modalBottomMenu: {
    flexDirection: 'row',
    height: 50,
  },
  modalBottomMenuBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});
