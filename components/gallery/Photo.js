import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { addImage } from '../redux/slices/GallerySlice';

import { AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';

const screenWidthSize = Dimensions.get('window').width;

export default function Photo() {
  const photos = useSelector((state) => state.gallery.photos);
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [assetsOptions, setAssetsOptions] = useState({
    after: '0',
    hasNextPage: true,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

  const showMediaLibrary = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') return;
    if (!assetsOptions.hasNextPage) return;
    let getPhotos = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo'],
      after: assetsOptions.after,
    });

    updateAssetsOptions(String(parseInt(assetsOptions.after) + 20), getPhotos.hasNextPage);
    setSavedPhotos(savedPhotos.concat(getPhotos.assets.flatMap((value) => [value.uri])));
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
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhotos(selectedPhotos.concat(photo));
  };

  const initSelectedPhoto = () => {
    setSelectedPhotos([]);
  };

  const applySelectedMedia = () => {
    dispatch(addImage(selectedPhotos));
    initSelectedPhoto();
    closeModal();
  };

  return (
    <View style={styles.photosContainer}>
      {photos.map((photo, index) => (
        <View style={styles.photosWrapper} key={index}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </View>
      ))}
      <View style={styles.photosWrapper}>
        <TouchableOpacity onPress={addImageBtn} style={styles.addBtn}>
          <AntDesign name="pluscircleo" size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <Modal visible={isOpenModal} onRequestClose={closeModal}>
        <FlatList
          ListEmptyComponent={<Text>Empty</Text>}
          data={savedPhotos}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modalPhotosWrapper}
              onPress={() => handleSelectPhoto(item)}
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
  );
}

const styles = StyleSheet.create({
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
});
