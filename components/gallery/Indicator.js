import { StyleSheet, View } from 'react-native';
import { Color } from '../util';

export default function Indicator({ length, index }) {
  return (
    <View style={styles.indicatorWrapper}>
      {Array.from({ length: length }, (_, i) => i).map((i) => (
        <View
          key={i}
          style={[
            styles.indicator,
            { backgroundColor: i === index ? Color.FORTH_SUB_COLOR : '#dfdfdf' },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  indicator: {
    marginHorizontal: 4,
    marginVertical: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
