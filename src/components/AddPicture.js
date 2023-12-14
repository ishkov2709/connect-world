import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useContext, useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { CameraContext } from '../context';

const AddPicture = ({ image, setImage }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const { hasPermission, setHasPermission } = useContext(CameraContext);

  const removeImg = async () => {
    setImage('');
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  });

  return (
    <View>
      <View style={styles.mainPhotoWrapper}>
        {hasPermission === null && (
          <View style={styles.imageWrapper}>
            <Text style={styles.btnCamera}>
              <AntDesign
                name="camera"
                size={24}
                color="#BDBDBD"
                style={styles.iconCamera}
              />
            </Text>
          </View>
        )}

        {hasPermission === false && (
          <View style={styles.imageWrapper}>
            <View style={styles.errorWrapper}>
              <View style={styles.btnCamera}>
                <View style={styles.halfCross} />
                <AntDesign
                  name="camera"
                  size={24}
                  color="#BDBDBD"
                  style={styles.iconCamera}
                />
              </View>

              <Text>No access to camera</Text>
            </View>
          </View>
        )}

        {hasPermission && !image && (
          <Camera
            ratio="1:1"
            style={styles.cameraWrapper}
            ref={setCameraRef}
            type={Camera.Constants.Type.back}
          >
            <TouchableOpacity
              style={styles.btnCameraFull}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                  setImage(uri);
                }
              }}
            >
              <AntDesign
                name="camera"
                size={24}
                color="#BDBDBD"
                style={styles.iconCamera}
              />
            </TouchableOpacity>
          </Camera>
        )}
        {image && (
          <View style={styles.imageWrapper}>
            <ImageBackground
              source={{ uri: image }}
              imageStyle={{
                borderRadius: 8,
              }}
              style={styles.image}
            >
              <Text style={styles.btnCameraFull} onPress={removeImg}>
                <AntDesign
                  name="camera"
                  size={24}
                  color="#FFFFFF"
                  style={styles.iconCamera}
                />
              </Text>
            </ImageBackground>
          </View>
        )}
      </View>

      <Text style={styles.text}>
        {image ? 'Редагувати фото' : 'Завантажте фото'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainPhotoWrapper: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoWrapper: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  btnCamera: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    padding: 18,
  },
  btnCameraFull: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF4D',
    padding: 18,
  },
  text: {
    color: '#BDBDBD',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfCross: {
    position: 'absolute',
    top: '120%',
    left: '-40%',
    width: 82,
    height: 2,
    backgroundColor: '#FF6C00',
    transform: [{ rotate: '125deg' }],
    zIndex: 2,
  },
  errorWrapper: {
    alignItems: 'center',
    gap: 24,
  },
});

export default AddPicture;
