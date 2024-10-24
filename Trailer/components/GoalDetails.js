import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PressableButton from '../components/PressableButton';
import { MaterialIcons } from '@expo/vector-icons'; 
import { commonStyles } from '../styles';
import { markGoalAsWarning } from '../Firebase/firestoreHelper'; 
import GoalUser from './GoalUser';
import { FlatList } from 'react-native-web';

export default function GoalDetails({ route, navigation }) {
  console.log(route.params)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedFunction={() => markGoalAsWarning(route.params.goal.id)}
          componentStyle={commonStyles.button}
          pressedStyle={commonStyles.buttonPressed}
        >
        <MaterialIcons name="warning" size={24} color="white" /> 
        </PressableButton>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {route.params ? (
        <View style={styles.container}>
          <Text style={styles.title}>Goal Details</Text>
          <Text style={styles.text}>ID: {route.params.goal.id}</Text>
          <Text style={styles.text}>Text: {route.params.goal.text}</Text>
          <PressableButton
            pressedFunction={() => navigation.push('Details')}
            componentStyle={commonStyles.button}
            pressedStyle={commonStyles.buttonPressed}
          >
            <Text>More Details</Text>
          </PressableButton>
          <GoalUser goalId ={route.params.goal.id}/>
        </View>
      ) : (
        <Text style={styles.text}>No goal found</Text>
      )}
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
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});