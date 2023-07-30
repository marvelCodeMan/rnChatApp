import {useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Settings from '../tabs/Settings';
import Users from '../tabs/Users';

const Main = () => {
  const [seletedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      {seletedTab === 0 ? <Users /> : <Settings />}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../Public/users.jpg')}
            style={[
              styles.tabIcon,
              {tintColor: seletedTab === 0 ? 'white' : 'gray'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../Public/settings.jpg')}
            style={[
              styles.tabIcon,
              {tintColor: seletedTab === 1 ? 'white' : 'gray'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: responsiveHeight(10),
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
  },
});

export default Main;
