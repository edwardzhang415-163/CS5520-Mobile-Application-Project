import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Alert, TouchableOpacity} from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import firebase from '../Firebase/firebaseSetup';
import { writeToDB, deleteFromDB, deleteAllFromDB } from '../Firebase/firestoreHelper'; 
import { collection } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup';



export default function Home({ navigation }) {
  const appName = "Welcome to Edward's awesome App";
  const [confirmedText, setConfirmedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    //querySnapshot is a list of dcoumentSnapshot objects
    onSnapshot(collection(db, "goals"), (querySnapshot) => {
      goalsArray = [];
      querySnapshot.forEach((dcoumentSnapshot) => {
        goalsArray.push({...dcoumentSnapshot.data(), id: dcoumentSnapshot.id});
      });
      console.log("goalsarra",goalsArray);
      setGoals(goalsArray);
  });
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
  }, []);

  async function handleInputData(data){
    let newGoal = {text: data};
    // let newGoal to db
    await writeToDB(newGoal, "goals");
    // setGoals((goals) => [...goals, newGoal]);
    setConfirmedText(data);
    setModalVisible(false);
  };



  async function handleDeleteGoal(goalId){
    // setGoals(currentGoals => currentGoals.filter(goal => goal.id !== goalId));
     deleteFromDB("goals", goalId);
   
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => deleteAllFromDB("goals")
        }
      ]
    );
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

  const renderFooterComponent = () => (
    <View>
      <Button title="Delete All" onPress={handleDeleteAll} />
    </View>
  );

  const renderItemSeparator = ({ highlighted }) => (
    <View style={[styles.separator, highlighted && { backgroundColor: 'blue' }]}></View>
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
        renderItem={({ item , separators}) => (
            <GoalItem 
              item={item} 
              onDelete={handleDeleteGoal} 
              onPressIn={separators.highlight}
              onPressOut={separators.unhighlight}
            />
        )}
        contentContainerStyle={styles.scrollViewContent}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={goals.length > 0 ? renderHeaderComponent : null}
        ListFooterComponent={goals.length > 0 ? renderFooterComponent : null}
        ItemSeparatorComponent={goals.length > 1 ? renderItemSeparator : null}
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
  separator: {
    height: 3,
    backgroundColor: 'grey',
    marginVertical: 2,
  },
});