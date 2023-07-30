import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);

  const loginUser = async () => {
    try {
      console.log('j');
      setVisibility(true);
      const res = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      setVisibility(false);

      goToNext(
        res.docs[0].data().name,
        res.docs[0].data().email,
        res.docs[0].data().userId,
      );
      console.log('logged in');
    } catch (err) {
      setVisibility(false);
      console.log(err);
      Alert.alert('No user found');
    }
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.constainer}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[styles.input, {marginTop: responsiveHeight(8)}]}
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <TouchableOpacity style={styles.btn} onPress={loginUser}>
        <Text style={styles.btnText}> Login </Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => navigation.navigate('Signup')}>
        Or Sign Up
      </Text>
      <Loader visibility={visibility} />
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    alignSelf: 'center',
    marginTop: responsiveHeight(10),
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    alignSelf: 'center',
    paddingLeft: responsiveWidth(2),
  },
  btn: {
    width: '90%',
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(4),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(6),
    backgroundColor: 'purple',
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  orLogin: {
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: 'black',
  },
});

export default Login;
