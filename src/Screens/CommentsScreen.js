import { useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPublications } from '../store/thunk';

const CommentsScreen = ({ route: { params } }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const publics = useSelector(state => state.publics);
  const currentPub = publics.find(el => el.id === params.id);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSendComment = () => {
    if (comment.trim()) {
      const newComment = {
        comment,
        id: nanoid(),
        owner: {
          name: user.displayName,
          email: user.email,
          image: user.imageURL,
        },
        date: format(new Date(), 'dd MMMM, yyyy | HH:mm', { locale: uk }),
      };
      dispatch(addComment({ ...currentPub, newComment }));
      setComment('');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getPublications());
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  if (user)
    return (
      <ScrollView
        contentContainerStyle={{ minHeight: '100%' }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.mainWrapper}>
          <Image source={{ uri: currentPub.imageURL }} style={styles.image} />
          {currentPub.comments.length > 0 &&
            currentPub.comments.map(item => (
              <View
                style={
                  item.owner.email !== user.email
                    ? styles.commentBox
                    : styles.commentBoxReverse
                }
                key={item.id}
              >
                {item.owner.image ? (
                  <Image
                    source={{ uri: item.owner.image }}
                    style={styles.photoOwner}
                  />
                ) : (
                  <Text style={styles.photoOwner}>
                    <FontAwesome name="user-circle" size={28} />
                  </Text>
                )}

                <View
                  style={
                    item.owner.email === user.email
                      ? styles.commentDateWrapper
                      : styles.commentDateWrapperReverse
                  }
                >
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentDate}>{item.date}</Text>
                </View>
              </View>
            ))}

          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              placeholder="Коментувати..."
              value={comment}
              onChangeText={setComment}
            />
            <Text style={styles.addCommentBtn} onPress={handleSendComment}>
              <Ionicons name="arrow-up" size={20} color="#ffffff" />
            </Text>
          </View>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  mainWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  inputField: {
    marginTop: 'auto',
  },
  inputText: {
    backgroundColor: '#F6F6F6',

    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 30,

    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 50,

    fontWeight: '500',
    fontSize: 16,
  },
  addCommentBtn: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  commentBox: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  commentBoxReverse: {
    flexDirection: 'row-reverse',
    gap: 16,
    marginBottom: 24,
  },
  photoOwner: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentDateWrapper: {
    width: '88%',
    backgroundColor: '#00000008',
    padding: 16,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentDateWrapperReverse: {
    width: '88%',
    backgroundColor: '#00000008',
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentText: {
    fontSize: 13,
    marginBottom: 8,
    color: '#212121',
  },
  commentDate: {
    color: '#BDBDBD',
  },
});

export default CommentsScreen;
