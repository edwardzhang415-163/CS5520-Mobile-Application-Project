import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}> 
      <View style={styles.topSection}> 
        <Header appName={appName} />    
        <Text>{confirmedText}</Text>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <Input onChangeText={setInputText} autoFocus={true} onConfirm={handleInputData} visible={modalVisible} />
      <View style={styles.bottomSection}> 
        <Text style={styles.text}>Welcome to {appName}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  topSection: {
    flex: 1, // 1/5th of the available area
    justifyContent: "space-evenly",
    alignItems: 'center',
  },
  text: {
    color: "purple",
    marginVertical: 5,
  },
  bottomSection: {
    flex: 4, // Remaining 4/5th of the available area
    backgroundColor: '#f0f0f0', // Background color for the bottom section
    alignItems: 'center',
  },
});