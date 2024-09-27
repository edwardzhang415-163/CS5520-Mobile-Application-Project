import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import React, { useState } from 'react';
import GoalItem from './components/GoalItem';

export default function App() {
  const appName = "Welcome to Edward's awesome App";
  const [inputText, setInputText] = useState('');
  const [confirmedText, setConfirmedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data){
    let newGoal = {text: data, id: Math.random()};
    setGoals((goals) => [...goals, newGoal]);
    setConfirmedText(data);
    setModalVisible(false);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(currentGoals => currentGoals.filter(goal => goal.id !== goalId));
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.text}>No goals to show</Text>
    </View>
  );

  const renderHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>My Goals</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.topSection}> 
        <Header appName={appName} />    
        <Text>{confirmedText}</Text>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
        <Input  autoFocus={true} onConfirm={handleInputData} onCancel={handleCancel} visible={modalVisible} />
      </View>
      <View style={styles.bottomSection}> 
      <FlatList
        data={goals}
        renderItem={({ item }) => (
        <GoalItem item={item} onDelete={handleDeleteGoal}/>
        )}
        contentContainerStyle={styles.scrollViewContent}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={goals.length > 0 ? renderHeaderComponent : null}
      />
        {/* <Text style={styles.text}>Welcome to {appName}</Text> */}
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
  },
  goalItem: {
    padding: 8,
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  scrollViewContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    padding: 10,
    borderColor: '#f9c2ff',
    backgroundColor: '#f9c2ff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
});