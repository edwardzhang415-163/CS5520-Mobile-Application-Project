import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal } from 'react-native';

const Input = ({ onChangeText, autoFocus, onConfirm, visible }) => {
  const [text, setText] = useState('');
  const [showCounter, setShowCounter] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChangeText = (newText) => {
    setText(newText);
    onChangeText(newText);
    setShowCounter(true);
    setMessage('');
  };

  const handleBlur = () => {
    setShowCounter(false);
    if (text.length >= 3) {
      setMessage('Thank you');
    } else {
      setMessage('Please type more than 3 characters');
    }
  };

  const handleConfirm = () => {
    console.log(text);
    onConfirm(text);
  };

  return (
    <Modal visible={visible} animationType="slide" >
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder='Enter text here'
          value={text}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
        />
        {showCounter && <Text>Character count: {text.length}</Text>}
        {message && <Text>{message}</Text>}
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '50%',
  },
  buttonContainer: {
    width: '30%', 
    marginTop: 20,
  },
});

export default Input;