import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal, Alert, Image } from 'react-native';


const Input = ({ autoFocus, onConfirm, onCancel, visible }) => {
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
    setShowCounter(false);
    setText('');
  };

  const handleCancel = () => {
    Alert.alert(
      'Confirm Cancel',
      'Are you sure you want to cancel?',
      [
        { text: 'cancel', style: 'cancel' },
        { text: 'ok', onPress: () => { onCancel(); setText(''); } }
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
      <View style={styles.Modalcontainer}>
      <Image
          style={styles.image}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
          alt="Network Image"
        />
        <Image
          style={styles.image}
          source={require('../assets/2617812.png')}
          alt="Local Image"
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder='Enter text here'
          value={text}
          onChangeText={handleChangeText}
          onFocus={() => {
            setMessage('');
          }}
          onBlur={handleBlur}
        />
        {showCounter && <Text>Character count: {text.length}</Text>}
        {message && <Text>{message}</Text>}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Confirm" onPress={handleConfirm} disabled={text.length < 3} />  
        </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
   flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '60%', 
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  Modalcontainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default Input;