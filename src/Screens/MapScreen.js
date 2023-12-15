import { useNavigation, useRoute } from "@react-navigation/native";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";

const MapScreen = () => {
  const navigation = useNavigation();

  const {
    params: { location },
  } = useRoute();

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        mapType={Platform.OS == "android" ? "none" : "standard"}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          description="Hello"
        />
      </MapView>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    top: 24,
    left: 16,
    backgroundColor: "#FF6C00",
    padding: 4,
    borderRadius: 50,
  },
});

export default MapScreen;
