import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails({ route, navigation }) {
  console.log("route", route);

  return (
    <View style={styles.container}>
      {route.params ? (
        <View style={styles.container}>
        <Text style={styles.title}>Goal Details</Text>
        <Text style={styles.text}>ID: { route.params.goal.id}</Text>
        <Text style={styles.text}>Text: {route.params.goal.text}</Text>
      <Button 
        title="More Details" 
        onPress={() => navigation.push('Details')} 
      />
      </View>
      ) :
      <Text style={styles.text}>No goal found</Text>
      } 
      
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});