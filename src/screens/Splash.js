import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);
  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('USERID');
    if (id !== null) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Firebase Chat App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flext: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: '100%',
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    width: '80%',
  },
});

export default Splash;
