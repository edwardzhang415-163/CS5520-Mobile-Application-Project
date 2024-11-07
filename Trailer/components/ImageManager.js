import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = () => {
  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result.assets);
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
    </View>
  );
};

export default ImageManager;