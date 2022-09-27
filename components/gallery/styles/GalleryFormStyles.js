import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
