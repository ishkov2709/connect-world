import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderButton from '../components/HeaderButton';
import Entypo from 'react-native-vector-icons/Entypo';
import PublicItem from '../components/PublicItem';
import { useDispatch, useSelector } from 'react-redux';
import { getPublications } from '../store/thunk';
import { useFocusEffect } from '@react-navigation/native';
import { CameraContext } from '../context';

const PostsScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const publics = useSelector(state => state.publics);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { setHasPermission } = useContext(CameraContext);

  useFocusEffect(
    useCallback(() => {
      setHasPermission(null);
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton />,
    });
  }, [navigation]);

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
      <View style={styles.mainWrapper}>
        {user && (
          <View style={styles.userContentBox}>
            {user.imageURL ? (
              <Image source={{ uri: user.imageURL }} style={styles.image} />
            ) : (
              <Entypo name="user" size={60} />
            )}
            <View>
              <Text style={styles.userLogin}>{user.displayName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        )}
        {publics.length > 0 && (
          <View>
            {publics.map(item => (
              <PublicItem key={item.id} item={item} navigation={navigation} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#ffffff',
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  userContentBox: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userLogin: {
    fontWeight: '700',
    fontSize: 13,
    color: '#212121',
  },
  userEmail: {
    fontSize: 11,
    color: '#212121CC',
  },
});

export default PostsScreen;
