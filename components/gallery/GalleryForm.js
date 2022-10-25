import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Content from './Content';
import Day from './Day';
import { init } from '../redux/slices/GallerySlice';
import Location from './Location';
import Photo from './Photo';
import Tags from './Tags';
import Title from './Title';

import { Entypo, Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function GalleryForm({ navigation }) {
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery);

  useEffect(() => {
    if (gallery.title !== '' || gallery.content !== '' || gallery.location !== '') {
      Alert.alert('Previous data exits.', 'Do you want to continue using it?', [
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

  const initForm = () => {
    dispatch(init());
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
});
