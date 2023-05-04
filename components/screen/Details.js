import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Carousel from '../gallery/Carousel';
import { Color } from '../util';

export default function Details({ navigation, route }) {
  const DEFAULT_NUMBER_OF_LINES = 3;
  const [numberOfLines, setNumberOfLines] = useState(DEFAULT_NUMBER_OF_LINES);
  const post = route.params;
  const { title, location, day, content, tags } = post;
  const uri = post.photos;

  const toggleTruncate = () => {
    const newNumberOfLines =
      numberOfLines === DEFAULT_NUMBER_OF_LINES ? 0 : DEFAULT_NUMBER_OF_LINES;
    setNumberOfLines(newNumberOfLines);
  };

  const handleBackBtn = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    return <Text style={styles.tag}>#{item}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackBtn} style={styles.headerFirstIcon}>
          <Ionicons color="black" name="arrow-back" size={32} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Carousel height={300} data={uri} offset={0} gap={0} isIndicator={true} />

        <View style={styles.contentWrap}>
          <Text style={styles.title}>{title}</Text>

          {location && (
            <View style={styles.locationWrap}>
              <FontAwesome5
                name="map-marker-alt"
                size={13}
                color="gray"
                style={styles.locationIcon}
              />
              <Text style={styles.location}>{location}</Text>
            </View>
          )}

          <Text style={styles.day}>{day}</Text>

          <Text
            style={[styles.content, { marginBottom: tags ? 0 : 30 }]}
            numberOfLines={numberOfLines}
            onPress={toggleTruncate}
          >
            {content}
          </Text>

          {tags && (
            <View style={styles.tagWrap}>
              {tags.map((item) => (
                <Text key={`item_${item}`} style={styles.tag}>
                  #{item}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_COLOR,
    flex: 1,
  },
  content: {
    lineHeight: 20,
    marginTop: 10,
  },
  contentWrap: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  day: {
    fontSize: 10,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerFirstIcon: {
    padding: 12,
  },
  location: {
    fontSize: 13,
  },
  locationIcon: {
    height: '100%',
    marginRight: 2,
    verticalAlign: 'middle',
  },
  locationWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 3,
  },
  tag: {
    backgroundColor: '#c9d1d9',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagWrap: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
  },
});
