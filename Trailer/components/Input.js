import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Input = ({ onChangeText, autoFocus }) => {
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
  };

  return (
    <View>
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
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Input;