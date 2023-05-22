import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { updateDay } from '../../redux';

import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';

export default function Day() {
  const date = useSelector((state) => state.gallery.day);
  const dispatch = useDispatch();
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const handleChangeDate = (newDate) => {
    hideDatePicker();
    let truncatedDate = newDate.toJSON().substring(0, 10);
    dispatch(updateDay(truncatedDate));
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
          onChange={(e, newDate) => handleChangeDate(newDate)}
          value={new Date(date)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  inputBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    marginTop: 30,
    alignItems: 'center',
  },
});
