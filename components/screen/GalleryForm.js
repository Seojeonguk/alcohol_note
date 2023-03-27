import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Content from '../gallery/Content';
import Day from '../gallery/Day';
import { init } from '../redux/slices/GallerySlice';
import Location from '../gallery/Location';
import Photo from '../gallery/Photo';
import Tags from '../gallery/Tags';
import Title from '../gallery/Title';

import { Entypo, Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Color } from '../util';
import uuid from 'react-native-uuid';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

export default function GalleryForm({ navigation }) {
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery);
  const [downloadURLs, setDownloadURLs] = useState([]);

  useEffect(() => {
    if (existInput()) {
      Alert.alert('Previous data exits.', 'Would you like to initialize it?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => initForm(),
        },
      ]);
    }
  }, []);

  const existInput = () => {
    if (gallery.title !== '') {
      return true;
    }
    if (gallery.content !== '') {
      return true;
    }
    if (gallery.location !== '') {
      return true;
    }
    if (gallery.photos.length !== 0) {
      return true;
    }
    if (gallery.tags.length !== 0) {
      return true;
    }
    return false;
  };

  const initForm = () => {
    dispatch(init());
  };

  const save = async () => {
    const promiseall = Promise.all(
      gallery.photos.map(async (url) => {
        return await uploadImage(url);
      })
    );

    promiseall.then((result) => {
      // To do more..
    });
  };

  const uploadImage = async (uri) => {
    const res = await fetch(uri);
    const blob = await res.blob();

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    const downloadURL = await getDownloadURL(fileRef);

    setDownloadURLs((prevDownloadURLs) => [...prevDownloadURLs, downloadURL]);

    return await Promise.resolve(downloadURL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>새 게시물</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => save()} style={styles.saveBtn}>
          <Entypo color="black" name="check" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Title />
        <Photo />
        <Day />
        <Tags />
        <Location />
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    padding: 4,
    position: 'absolute',
  },
  container: {
    backgroundColor: Color.BACKGROUND_COLOR,
    flex: 1,
  },
  galleryHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.BORDER_COLOR,
    borderStyle: 'solid',
    justifyContent: 'center',
    marginBottom: 5,
    paddingVertical: 5,
  },
  galleryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    position: 'absolute',
    right: 0,
  },
});
