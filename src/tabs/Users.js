import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  FlatList,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    try {
      const res = await firestore()
        .collection('users')
        .where('email', '!=', email)
        .get();
      if (res.docs != []) {
        res.docs.map(item => {
          tempData.push(item.data());
        });
      }
      console.log(tempData);
      setUsers(tempData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RN Firebase Chat App</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: id});
              }}>
              <Image
                source={require('../Public/user.png')}
                style={styles.userIcon}
              />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - responsiveWidth(5),
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    flexDirection: 'row',
    height: responsiveHeight(6),
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(4),
    alignItems: 'center',
  },
  userIcon: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  name: {
    color: 'black',
    marginLeft: responsiveWidth(10),
    fontSize: 42 / PixelRatio.getFontScale(),
  },
});

export default Users;
