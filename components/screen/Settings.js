import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingsHeader}>
        <Text style={styles.settingsTitle}>Settings</Text>
      </View>
      <View style={styles.settingsBody}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDZfMjUx%2FMDAxNjYyNDM3ODk4NTQ3.FDaxfffFN1iNSBH_t8yTmgw3l30r-1OZIBSyhESQLtYg.wvXYUDZtmsdL1of59htugexzGLe9tBd5VLuqjZqQ9mog.JPEG.janet_hwang%2FIMG_1365.jpg&type=a340',
            }}
            style={styles.userImg}
          />
          <Text style={styles.userNickname}>닉네임</Text>
          <TouchableOpacity style={styles.userUpdateBtn}>
            <Text style={styles.userUpdateBtnText}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid',
    justifyContent: 'center',
    marginBottom: 5,
    paddingVertical: 5,
  },
  settingsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  userInfo: {
    padding: 5,
    alignItems: 'center',
  },
  userUpdateBtn: {
    paddingHorizontal: 20,
  },
  userUpdateBtnText: {
    color: '#50A4C5',
  },
});
