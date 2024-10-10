import React, { Children } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function PressableButton({ children }) {
  return (
    <Pressable onPress={onPress}>
        <View>{ children }</View>
    </Pressable>
  );
}