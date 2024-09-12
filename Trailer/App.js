import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import React, { useState } from 'react';

export default function App() {
  const appName = 'MyApp';
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <Input onChangeText={setInputText} />
      <Text>{inputText}</Text>
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