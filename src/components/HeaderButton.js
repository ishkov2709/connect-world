import { StyleSheet, Text } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../store/rootSlice';
import { useContext } from 'react';
import { LoggedContext } from '../context';

const HeaderButton = () => {
  const dispatch = useDispatch();
  const { setIsLoggedIn } = useContext(LoggedContext);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
  };

  return (
    <Text style={styles.button}>
      <SimpleLineIcons
        name="logout"
        size={24}
        color="#BDBDBD"
        onPress={handleLogout}
      />
    </Text>
  );
};

const styles = StyleSheet.create({
  button: {
    transform: [{ rotate: '180deg' }],
    marginRight: 10,
  },
});

export default HeaderButton;
