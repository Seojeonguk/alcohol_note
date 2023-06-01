import { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

import { Content, Day, Header, Location, Photo, Tags, Title } from '../components';
import { COLORS, NAVIGATOR } from '../constants';
import { createNewPost, updateDocForId } from '../firebase';
import { showToast } from '../lib';
import { init } from '../redux';

import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';

export default function GalleryForm({ navigation, route }) {
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery);
  const docId = route.params;

  useEffect(() => {
    if (docId) {
      return;
    }
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
        gallery.photos.map(async (photo) => {
          return await uploadPhoto(photo);
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

      if (docId) {
        updateDocForId(docId, data);
      } else {
        await createNewPost(data, email);
      }

      initForm();

      showToast('success', '정상적으로 작성이 완료되었습니다.');
      navigation.navigate(NAVIGATOR.GALLERY);
    } catch (e) {
      showToast(
        null,
        '작성 중 오류가 발생하였습니다.',
        '입력 확인 후 다시 시도해 주시기 바랍니다.'
      );
    }
  };

  const uploadPhoto = async (uri) => {
    const res = await fetch(uri);
    const blob = await res.blob();

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'새 게시물'}
        visibleLeftIcon={true}
        visibleRightIcon={true}
        leftIconName={'arrow-back'}
        rightIconName={'checkmark-sharp'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => save()}
        iconSize={24}
      />

      <ScrollView style={styles.content}>
        <Title />
        <Photo />
        <Day />
        <Location />
        <Tags />
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
  },
});
