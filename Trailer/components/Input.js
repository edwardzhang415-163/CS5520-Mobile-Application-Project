import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Modal, StyleSheet, Text } from 'react-native';
import ImageManager from './ImageManager'; // Import ImageManager

const Input = ({ autoFocus, onConfirm, onCancel, visible }) => {
  const [inputValue, setInputValue] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleConfirm = () => {
    onConfirm({ text: inputValue, imageUri });
    setInputValue('');
    setImageUri(null);
  };

  const handleImageTaken = (uri) => {
    setImageUri(uri);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoFocus={autoFocus}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Confirm" onPress={handleConfirm} />
        <Button title="Cancel" onPress={onCancel} />
        <ImageManager onImageTaken={handleImageTaken} /> {/* Pass the function as a prop */}
        {imageUri && <Text>Image URI: {imageUri}</Text>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default Input;