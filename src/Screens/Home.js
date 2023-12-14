import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PostsScreen from './PostsScreen';
import ProfileScreen from './ProfileScreen';
import CreatePostsScreen from './CreatePostsScreen';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPublications } from '../store/thunk';
import { CameraContext } from '../context';

const Posts = ({ color, size }) => {
  return (
    <Text>
      <Ionicons name="grid-outline" size={size} color={color} />
    </Text>
  );
};

const Add = ({ color, size }) => {
  return (
    <Text>
      <AntDesign name="plus" size={size} color={color} />
    </Text>
  );
};

const Profile = ({ color, size }) => {
  return (
    <Text>
      <Feather name="user" size={size} color={color} />
    </Text>
  );
};

const Tabs = createBottomTabNavigator();

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications());
  }, [dispatch]);

  return (
    <CameraContext.Provider
      value={{
        hasPermission,
        setHasPermission,
      }}
    >
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            if (route.name === 'Posts') {
              return (
                <Posts
                  color={color}
                  size={focused ? 13 : 24}
                  focused={focused || false}
                />
              );
            }
            if (route.name === 'Add') {
              return (
                <Add
                  color={color}
                  size={focused ? 13 : 24}
                  focused={focused || false}
                />
              );
            }
            if (route.name === 'Profile') {
              return (
                <Profile
                  color={color}
                  size={focused ? 13 : 24}
                  focused={focused || false}
                />
              );
            }
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#212121CC',
          tabBarActiveBackgroundColor: '#FF6C00',
          tabBarInactiveBackgroundColor: '#ffffff',
          tabBarItemStyle: styles.btnBottom,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        })}
        initialRouteName="Posts"
      >
        <Tabs.Screen
          name="Posts"
          component={PostsScreen}
          options={{ title: 'Публікації', headerTitleAlign: 'center' }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Add"
          component={CreatePostsScreen}
          options={{
            title: 'Створити публікацію',
            headerTitleAlign: 'center',
          }}
        />
      </Tabs.Navigator>
    </CameraContext.Provider>
  );
};

const styles = StyleSheet.create({
  btnBottom: {
    flex: 0,
    width: 70,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabBar: {
    alignItems: 'center',
    height: 83,
    paddingTop: 9,
  },
});

export default Home;
