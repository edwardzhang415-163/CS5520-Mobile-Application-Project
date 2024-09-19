import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import React, { useState } from 'react';

export default function App() {
  const appName = "Welcome to Edward's awesome App";
  const [inputText, setInputText] = useState('');
  const [confirmedText, setConfirmedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputData = (text) => {
    setConfirmedText(text);
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.topSection}> 
        <Header appName={appName} />    
        <Text>{confirmedText}</Text>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.bottomSection}> 
        <Input onChangeText={setInputText} autoFocus={true} onConfirm={handleInputData} onCancel={handleCancel} visible={modalVisible} />
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
    flex: 1, 
    justifyContent: "space-evenly",
    alignItems: 'center',
  },
  text: {
    color: "purple",
    marginVertical: 5,
  },
  bottomSection: {
    flex: 4, 
    backgroundColor: '#f0f0f0', 
    alignItems: 'center',
  },
});