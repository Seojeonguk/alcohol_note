import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../constants';

import { Ionicons } from '@expo/vector-icons';

export default function Header({
  title,
  visibleLeftIcon,
  visibleRightIcon,
  leftIconName,
  rightIconName,
  iconSize,
  onPressLeft,
  onPressRight,
}) {
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity
        onPress={onPressLeft}
        style={styles.btn}
        activeOpacity={visibleLeftIcon ? 0.2 : 1}
      >
        {visibleLeftIcon && <Ionicons color="black" name={leftIconName} size={iconSize} />}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        onPress={onPressRight}
        style={styles.btn}
        activeOpacity={visibleRightIcon ? 0.2 : 1}
      >
        {visibleRightIcon && <Ionicons color="black" name={rightIconName} size={iconSize} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    marginBottom: 5,
    paddingVertical: 5,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 15,
    height: '100%',
    textAlignVertical: 'center',
  },
  btn: {
    padding: 12,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
  },
});
