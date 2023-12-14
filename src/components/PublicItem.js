import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PublicItem = ({ item, navigation }) => {
  const navigateToMap = (location = null) => {
    if (!location) return;
    const handler = () => {
      navigation.navigate('Map', { location });
    };
    return handler;
  };

  return (
    <View style={styles.postItem}>
      <Image source={{ uri: item.imageURL }} style={styles.postImg} />
      <Text style={styles.postName}>{item.name}</Text>
      <View style={styles.commentPlaceBox}>
        <TouchableOpacity
          style={styles.postComments}
          onPress={() => {
            navigation.navigate('Comments', {
              ...item,
            });
          }}
        >
          <FontAwesome
            name={item.comments?.length > 0 ? 'comment' : 'comment-o'}
            size={24}
            color={item.comments?.length > 0 ? '#FF6C00' : '#BDBDBD'}
          />
          <Text style={styles.commentCount}>{item.comments?.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postPlace}
          onPress={navigateToMap(item.location)}
        >
          <Text>
            <EvilIcons name="location" size={30} color="#BDBDBD" />
          </Text>
          <Text style={styles.postText}>{item.place}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postList: {
    marginBottom: 32,
  },
  postItem: {
    marginBottom: 32,
  },
  postImg: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postName: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  commentPlaceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentCount: {
    transform: [{ scaleX: -1 }],
    color: '#BDBDBD',
    fontSize: 16,
    marginRight: 9,
  },
  postComments: {
    transform: [{ scaleX: -1 }],
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  postText: {
    color: '#212121',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  postPlace: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default PublicItem;
