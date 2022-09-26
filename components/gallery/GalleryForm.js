import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/GalleryFormStyles';

export default function GalleryForm({ navigation }) {
  const [gallery, setGallery] = useState({
    title: '',
    date: '',
    photos: [],
    content: '',
    location: '',
    tags: [],
  });
  return (
    <SafeAreaView>
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>새 게시물</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
