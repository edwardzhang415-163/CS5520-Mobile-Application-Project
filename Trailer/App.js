import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import React, { useState } from 'react';

export default function App() {
  const appName = 'MyApp';
  const [inputText, setInputText] = useState('');
  const [confirmedText, setConfirmedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputData = (text) => {
    setConfirmedText(text);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <Text>{confirmedText}</Text>
      <View style={{idth: '30%', marginTop: 20,}}>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <Input onChangeText={setInputText} autoFocus={true} onConfirm={handleInputData} visible={modalVisible} />
      <Text>Welcome to {appName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});