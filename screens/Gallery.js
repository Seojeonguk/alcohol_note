import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { getPosts } from '../components/firebase';
import GalleryCard from '../components/gallery/GalleryCard';
import Header from '../components/gallery/Header';
import { Color } from '../components/util';
import { auth } from '../firebaseConfig';

import MasonryList from '@react-native-seoul/masonry-list';
import { getAuth, signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Gallery({ navigation }) {
  const [galleryList, setGalleryList] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;

    const getPosting = async () => {
      const postList = await getPosts(null, email);

      setGalleryList(postList);
    };

    getPosting();
  }, []);
  const moveGalleryForm = () => {
    navigation.navigate('galleryForm');
  };

  const logout = async () => {
    await signOut(auth);
    navigation.replace('mainPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Gallery'}
        visibleLeftIcon={false}
        visibleRightIcon={true}
        rightIconName={'ios-add-outline'}
        iconSize={24}
        onPressRight={() => moveGalleryForm()}
      />

      <MasonryList
        contentContainerStyle={styles.galleryContent}
        data={galleryList}
        numColumns={3}
        renderItem={({ item, i }) => <GalleryCard item={item} i={i} navigation={navigation} />}
      />

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_COLOR,
    flex: 1,
  },
  galleryContent: {
    alignSelf: 'stretch',
  },
});
