import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PressableButton from '../components/PressableButton';
import { MaterialIcons } from '@expo/vector-icons'; 
import { commonStyles } from '../styles';
import { markGoalAsWarning } from '../Firebase/firestoreHelper'; 
import GoalUser from './GoalUser';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

export default function GoalDetails({ route, navigation }) {
  const { goal } = route.params;
  const [imageUrl, setImageUrl] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedFunction={() => markGoalAsWarning(goal.id)}
          componentStyle={commonStyles.button}
          pressedStyle={commonStyles.buttonPressed}
        >
        <MaterialIcons name="warning" size={24} color="white" /> 
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (goal.imageUri) {
        try {
          const reference = ref(storage, goal.imageUri);
          const url = await getDownloadURL(reference);
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      }
    };

    fetchImageUrl();
  }, [goal.imageUri]);

  return (
    <View style={styles.container}>
      {route.params ? (
        <View style={styles.container}>
          <Text style={styles.title}>Goal Details</Text>
          <Text style={styles.text}>ID: {goal.id}</Text>
          <Text style={styles.text}>Text: {goal.text}</Text>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
          <PressableButton
            pressedFunction={() => navigation.push('Details')}
            componentStyle={commonStyles.button}
            pressedStyle={commonStyles.buttonPressed}
          >
            <Text>More Details</Text>
          </PressableButton>
          <GoalUser goalId={goal.id} />
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
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
   