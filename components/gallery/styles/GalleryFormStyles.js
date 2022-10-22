import { StyleSheet, Dimensions } from 'react-native';
const screenWidthSize = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  inputBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: 'grey',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photosWrapper: {
    height: screenWidthSize / 4,
    width: screenWidthSize / 4,
    padding: 5,
  },
  photo: {
    height: screenWidthSize / 4 - 10,
    width: screenWidthSize / 4 - 10,
  },
  addBtn: {
    height: screenWidthSize / 4 - 10,
    width: screenWidthSize / 4 - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  modalPhotosWrapper: {
    zIndex: 9,
    height: screenWidthSize / 4,
    width: screenWidthSize / 4,
    padding: 5,
  },
  modalPhoto: {
    height: screenWidthSize / 4 - 10,
    width: screenWidthSize / 4 - 10,
  },
  modalBottomMenu: {
    flexDirection: 'row',
    height: 50,
  },
  modalBottomMenuBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  tagBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: 'grey',
    flexWrap: 'wrap',
  },
  tags: {
    backgroundColor: '#c9d1d9',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  inputTag: {
    margin: 5,
    borderBottomWidth: 0,
  },
});
