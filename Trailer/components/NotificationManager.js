import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationManager = () => {
  const scheduleNotificationHandler = async () => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Goal Reminder",
          body: "Don't forget to check your goals today!",
          data: { screen: 'Home' },
        },
        trigger: {
          seconds: 5, // Notification will appear after 5 seconds
        },
      });
      Alert.alert('Success', 'Reminder set successfully!');
      console.log('Notification scheduled:', notificationId);
    } catch (error) {
      Alert.alert('Error', 'Failed to set reminder');
      console.error('Error scheduling notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Set Reminder" 
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
});

export default NotificationManager;
