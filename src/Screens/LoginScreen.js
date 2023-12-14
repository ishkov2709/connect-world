import {
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import images from '../assets/images/images';
import LoginForm from '../components/LoginForm';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoggedContext } from '../context';

const LoginScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const { setIsLoggedIn } = useContext(LoggedContext);

  useEffect(() => {
    if (user) setIsLoggedIn(Boolean(user));
  }, [user, setIsLoggedIn]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <ImageBackground
          source={images.background}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View style={styles.box}>
            <Text style={styles.titie}>Увійти</Text>

            <LoginForm />

            <Text
              style={styles.toRegisterBtn}
              onPress={() => navigation.navigate('Register')}
            >
              Немає акаунту? Зареєструватися
            </Text>
          </View>
        </ImageBackground>
        <StatusBar theme="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 'auto',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff',
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  titie: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    marginBottom: 32,
  },
  toRegisterBtn: {
    color: '#1B4371',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 145,
  },
});

export default LoginScreen;
