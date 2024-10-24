import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {  readAllDocFromDB, writeToDB  } from '../Firebase/firestoreHelper';
import {} from '../Firebase/firestoreHelper';

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

  return (
    <View style={styles.container}>
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
});