import React from 'react';
import { Text, View, Pressable,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { colors, commonStyles } from '../styles';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons

export default function GoalItem({ item, onDelete, onPressIn, onPressOut }) {
  const navigation = useNavigation();

  const handleLongPress = () => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => onDelete(item.id)
        }
      ]
    );
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', { goal: item })}
      onLongPress={handleLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => (pressed ? [commonStyles.goalItem, commonStyles.goalItemPressed] : commonStyles.goalItem)}
      android_ripple={{ color: colors.ripple, borderless: false }}
    >
      <View style={commonStyles.goalItemContent}>
        <Text>{item.text}</Text>
        <PressableButton
          pressedFunction={() => onDelete(item.id)}
          componentStyle={commonStyles.button}
          pressedStyle={commonStyles.buttonPressed}
        >
          <MaterialIcons name="delete" size={24} color="white" />
        </PressableButton>
      </View>
    </Pressable>
  );
}