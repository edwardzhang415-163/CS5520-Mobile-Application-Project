import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = ({ onImageTaken }) => {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (!response.granted) {
      requestPermission();
    }
  }, [response]);

  const verifyPermission = async () => {
    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission required', 'Camera access is required to take pictures.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        onImageTaken(uri); // Call the function with the image URI
        Alert.alert('Success', 'Image captured successfully');
      } else {
        Alert.alert('Cancelled', 'Image capture cancelled');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ImageManager;