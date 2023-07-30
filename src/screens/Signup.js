import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Login from './Login';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();
  console.log('hello');

  const registerUser = async () => {
    const userId = uuid.v4();
    console.log('hello');
    try {
      const res = await firestore().collection('users').doc(userId).set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        confirmPassword: confirmPassword,
        userId: userId,
      });
      console.log('User Created');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  const validate = () => {
    if (name === '' || email === '' || mobile === '' || password === '')
      return false;
    if (mobile.length !== 10) return false;
    if (email.search('@') === -1) return false;
    if (confirmPassword !== password) return false;

    return true;
  };

  return (
    <View style={styles.constainer}>
      <ScrollView>
        <Text style={styles.title}>Signup</Text>
        <TextInput
          style={[styles.input, {marginTop: responsiveHeight(6)}]}
          placeholder="Enter Name"
          value={name}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          keyboardType={'number-pad'}
          value={mobile}
          onChangeText={txt => setMobile(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={txt => setConfirmPassword(txt)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (validate()) registerUser();
            else {
              Alert.alert('Please Enter Valid Data');
              console.log('invalid');
            }
          }}>
          <Text style={styles.btnText}> Sign Up </Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.goBack()} style={styles.orLogin}>
          Or Login
        </Text>
      </ScrollView>
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

export default Signup;
