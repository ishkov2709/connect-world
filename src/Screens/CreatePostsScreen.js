import { useEffect } from 'react';
import BackButton from '../components/BackButton';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import AddPicture from '../components/AddPicture';
import { Formik } from 'formik';
import createPostsSchema from '../schemas/createPostSchema';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setPublication } from '../store/thunk';

const CreatePostsScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      tabBarStyle: {
        display: 'none',
      },
    });
  }, [navigation]);

  return (
    <Formik
      initialValues={{ name: '', place: '' }}
      validationSchema={createPostsSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(
          setPublication({
            data: {
              ...values,
              comments: [],
              location,
              owner: {
                name: user.displayName,
                email: user.email,
              },
            },
            image,
          })
        );
        resetForm();
        setImage(null);
        navigation.navigate('Posts');
      }}
    >
      {({
        handleReset,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.mainWrapper}>
          <AddPicture image={image} setImage={setImage} />
          <KeyboardAvoidingView behavior={'padding'} style={styles.keyboard}>
            <TextInput
              placeholder="Назва..."
              style={styles.input}
              value={values.name}
              onChangeText={handleChange('name')}
            />
            <View style={styles.inputField}>
              <TextInput
                placeholder="Місцевість..."
                style={styles.placeInput}
                value={values.place}
                onChangeText={handleChange('place')}
              />
              <Text style={styles.locationIcon}>
                <EvilIcons name="location" size={28} color="#BDBDBD" />
              </Text>
            </View>
          </KeyboardAvoidingView>
          <Text
            style={
              (errors.name && touched.name) ||
              (errors.place && touched.place) ||
              !image
                ? styles.btnDisable
                : styles.btnEnable
            }
            onPress={handleSubmit}
          >
            Опубліковати
          </Text>
          <Text
            style={styles.trashBtn}
            onPress={() => {
              handleReset();
              setImage(null);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  inputField: {
    position: 'relative',
    marginBottom: 32,
  },
  locationIcon: {
    position: 'absolute',
    top: 20,
    left: 0,
  },
  input: {
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#BDBDBD',
  },
  placeInput: {
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#BDBDBD',
    paddingLeft: 28,
  },
  btnDisable: {
    width: '100%',
    textAlign: 'center',
    color: '#BDBDBD',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    fontSize: 16,
    paddingVertical: 16,
    pointerEvents: 'none',
  },
  btnEnable: {
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    fontSize: 16,
    paddingVertical: 16,
  },
  trashBtn: {
    width: 70,
    paddingVertical: 8,
    marginTop: 'auto',
    alignSelf: 'center',
    backgroundColor: '#F6F6F6',
    textAlign: 'center',
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
