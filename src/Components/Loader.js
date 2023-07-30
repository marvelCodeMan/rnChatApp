import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Loader = ({visibility}) => {
  return (
    <Modal visible={visibility} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    borderRadius: responsiveWidth(20),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Loader;
