import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GalleryCard from '../gallery/GalleryCard';

import { AntDesign } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../util';

import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../firebaseConfig';

export default function Gallery({ navigation }) {
  const [galleryList, setGalleryList] = useState([]);
  useEffect(() => {
    const getDocs = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const email = user.email;

      const docRef = doc(db, 'alcoholic', email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        const galleryListTmp = [];
        for (let prop in userData) {
          galleryListTmp.push({ [prop]: userData[prop].photos[0] });
        }
        setGalleryList(galleryListTmp);
      }
    };

    getDocs();
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
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>Gallery</Text>
        <TouchableOpacity onPress={moveGalleryForm} style={styles.uploadBtn}>
          <AntDesign color="black" name="plus" size={24} />
        </TouchableOpacity>
      </View>

      <MasonryList
        contentContainerStyle={styles.galleryContent}
        data={galleryList}
        numColumns={3}
        renderItem={({ item, i }) => <GalleryCard item={item} i={i} />}
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
  galleryHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
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
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    position: 'absolute',
    right: 0,
  },
});
