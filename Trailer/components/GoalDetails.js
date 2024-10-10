import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PressableButton from '../components/PressableButton';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import { commonStyles } from '../styles';

export default function GoalDetails({ route, navigation }) {
  const { goal } = route.params;
  const [textColor, setTextColor] = useState('#000'); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedFunction={() => alert('Warning button pressed!')}
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
    console.log('GoalDetails: ', route.params);
    {route.params ? (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>ID: {goal.id}</Text>
      <Text style={[styles.text, { color: textColor }]}>Text: {goal.text}</Text>
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
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});