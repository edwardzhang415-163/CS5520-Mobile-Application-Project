import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = ({ onChangeText }) => {
  const [text, setText] = useState('');

  const handleChangeText = (newText) => {
    setText(newText);
    onChangeText(newText);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChangeText}
      />
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