import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateDay } from '../redux/slices/GallerySlice';

import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';

export default function Day() {
  const [date, setDate] = useState(new Date().toJSON().substring(0, 10));
  const dispatch = useDispatch();
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const applyupdatedDate = (newDate) => {
    hideDatePicker();
    setDate(newDate.toJSON().substring(0, 10));
    dispatch(updateDay(date));
  };

  const hideDatePicker = () => {
    setIsShowDatePicker(false);
  };

  const showDatePicker = () => {
    setIsShowDatePicker(true);
  };

  return (
    <View style={styles.inputBox}>
      <AntDesign color="black" name="calendar" size={24} />
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
