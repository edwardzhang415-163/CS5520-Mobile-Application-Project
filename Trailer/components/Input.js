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
        <Text style={styles.label}>Enter your goal:</Text>
        <TextInput
          style={styles.input}
          autoFocus={autoFocus}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <ImageManager onImageTaken={handleImageTaken} />
        {imageUri && <Text style={styles.imageUri}>Image selected: {imageUri}</Text>}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  imageUri: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Input;