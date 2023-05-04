import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Content from '../gallery/Content';
import Day from '../gallery/Day';
import Location from '../gallery/Location';
import Photo from '../gallery/Photo';
import Tags from '../gallery/Tags';
import Title from '../gallery/Title';
import { init } from '../redux/slices/GallerySlice';

import { Entypo, Ionicons } from '@expo/vector-icons';

import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '../util';

import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { createNewPost, getPosts } from '../firebase';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function GalleryForm({ navigation }) {
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery);

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
    try {
      const downloadURLs = await Promise.all(
        gallery.photos.map(async (url) => {
          return await uploadImage(url);
        })
      );

      const auth = getAuth();
      const user = auth.currentUser;
      const email = user.email;

      const data = {
        title: gallery.title,
        day: gallery.day,
        photos: downloadURLs,
        content: gallery.content,
        location: gallery.location,
        tags: gallery.tags,
        writer: email,
        createdAt: new Date(),
      };

      await createNewPost(data, email);

      Toast.show({
        type: 'success',
        text1: `정상적으로 작성이 완료되었습니다.`,
        position: 'bottom',
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Gallery' }],
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: `작성 중 오류가 발생하였습니다.`,
        text2: `입력 확인 후 다시 시도해 주시기 바랍니다.`,
        position: 'bottom',
      });
    }
  };

  const uploadImage = async (uri) => {
    const res = await fetch(uri);
    const blob = await res.blob();

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
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
