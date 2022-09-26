import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function GalleryForm() {
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
      <Text>Gallery Form</Text>
    </SafeAreaView>
  );
}
