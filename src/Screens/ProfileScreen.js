import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../assets/images/images';
import AddPhoto from '../components/AddPhoto';
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native-gesture-handler';
import PublicItem from '../components/PublicItem';
import { useCallback, useContext, useEffect, useState } from 'react';
import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhoto, getPublications, uploadPhoto } from '../store/thunk';
import { CameraContext } from '../context';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const publics = useSelector(state => state.publics);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { setHasPermission } = useContext(CameraContext);

  useFocusEffect(
    useCallback(() => {
      setHasPermission(null);
    }, [])
  );

  useEffect(() => {
    if (!user) navigation.navigate('Login');
  }, [user]);

  const setUserImage = image => {
    if (!image) return dispatch(deletePhoto());
    if (image) return dispatch(uploadPhoto(image));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getPublications());
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: '100%' }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <View>
        <ImageBackground
          source={images.background}
          resizeMode="cover"
          style={styles.background}
        >
          <View style={publics?.length > 0 ? styles.fullBox : styles.box}>
            <AddPhoto image={user?.imageURL} setImage={setUserImage} />

            <TouchableOpacity style={styles.logoutBtn}>
              <HeaderButton />
            </TouchableOpacity>

            <Text style={styles.titie}>{user?.displayName}</Text>

            {publics.length > 0 &&
              publics
                .filter(item => item.owner.email === user.email)
                .map(item => (
                  <PublicItem
                    key={item.id}
                    item={item}
                    navigation={navigation}
                  />
                ))}
          </View>

          <StatusBar theme="auto" />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  box: {
    marginTop: 'auto',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
  },
  fullBox: {
    height: '100%',
    marginTop: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 126,
  },
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 6,
  },
  titie: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    marginBottom: 32,
  },
  toLoginBtn: {
    color: '#1B4371',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 80,
    textAlign: 'center',
  },
});

export default ProfileScreen;
