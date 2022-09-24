import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    flex: 1,
    backgroundColor: 'green',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'tomato',
    height: '100%',
    width: '100%',
  },
  itemImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  itemInfo: {},
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: 'grey',
  },
});
