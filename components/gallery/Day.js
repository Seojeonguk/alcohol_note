import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateDay } from '../redux/slices/GallerySlice';

import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';

export default function Day() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date().toJSON().substring(0, 10));
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const showDatePicker = () => {
    setIsShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setIsShowDatePicker(false);
  };

  const applyupdatedDate = (newDate) => {
    hideDatePicker();
    setDate(newDate.toJSON().substring(0, 10));
    dispatch(updateDay(date));
  };

  return (
    <View style={styles.inputBox}>
      <AntDesign name="calendar" size={24} color="black" />
      <TextInput onPressIn={showDatePicker} placeholder="날짜" style={styles.input} value={date} />

      {isShowDatePicker && (
        <DateTimePicker
          mode="date"
          onChange={(e, newDate) => applyupdatedDate(newDate)}
          value={new Date(date)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});
