import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import {readAllDocFromDB, writeToDB} from '../Firebase/firestoreHelper';
import PressableButton from './PressableButton';



export default function GoalUsers(goalId) {
  const [users, setUsers] = useState([]); // Define users state variable
  console.log("Goal ID: ", goalId);
  useEffect(() => {
    async function fetchData() {
        try {
            const existingUsers = await readAllDocFromDB(`goals/${goalId.goalId}/users`);
            if (existingUsers.length > 0) {
              setUsers(existingUsers);
            } else {
              const response = await fetch("https://jsonplaceholder.typicode.com/users");
              if (!response.ok) {
                throw new Error("http error: " + response.status);
              }
              const data = await response.json();
              setUsers(data); // Set the users state variable with the fetched data
              data.forEach(async (user) => {
                await writeToDB(user, `goals/${goalId.goalId}/users`);
              });
            }
          } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
    fetchData();
  }, []);

  async function handlePostRequest() {
    const fakeUser = { name: "John Doe" };
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fakeUser)
      });
      if (!response.ok) {
        throw new Error("http error: " + response.status);
      }
      const data = await response.json();
      Alert.alert("User added", `User ${data.name} added with ID ${data.id}`);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }

  return (
    
    <View style={styles.container}>
     <PressableButton
        pressedFunction={handlePostRequest}
        componentStyle={styles.button}
        pressedStyle={styles.buttonPressed}
      >
        <Text style={styles.buttonText}>Add Fake User</Text>
      </PressableButton>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.text}>No users found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    text: {
      fontSize: 18,
    },
    button: {
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    buttonPressed: {
      backgroundColor: '#0056b3',
      opacity: 0.8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });