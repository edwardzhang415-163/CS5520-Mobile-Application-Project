import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails({ route, navigation }) {
  const { goal } = route.params;
  const [textColor, setTextColor] = useState('#000'); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            setTextColor('#ff0000'); 
            navigation.setOptions({ title: 'Warning!' }); 
          }}
          title="Info"
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>ID: {goal.id}</Text>
      <Text style={[styles.text, { color: textColor }]}>Text: {goal.text}</Text>
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