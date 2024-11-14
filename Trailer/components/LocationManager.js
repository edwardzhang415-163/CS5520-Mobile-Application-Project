import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
  const [location, setLocation] = useState(null); // State variable to store location

  const [response, requestPermission] = Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'You need to grant location permissions to use this feature.');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      Alert.alert('Location', `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
    } catch (err) {
      console.error("Error getting location: ", err);
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  const mapImageUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.mapsApiKey}`
    : null;

  return (
    <View style={styles.container}>
      <Button title="Locate User" onPress={locateUserHandler} />
      {location && (
        <Image
          style={styles.mapImage}
          source={{ uri: mapImageUrl }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapImage: {
    width: 400,
    height: 200,
    marginTop: 20,
  },
});


export default LocationManager;