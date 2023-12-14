import { Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BackButton = ({ onPress }) => {
  return (
    <>
      <Text onPress={onPress} style={{ marginLeft: 16 }}>
        <AntDesign name="arrowleft" color="#212121CC" size={24} />
      </Text>
    </>
  );
};

export default BackButton;
