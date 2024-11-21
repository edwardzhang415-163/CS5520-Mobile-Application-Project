// App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup'; // Import the auth instance
import * as Notifications from 'expo-notifications';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import Profile from './components/Profile'; // Import the Profile component
import { Button } from 'react-native';

// Set up notification handler outside of the component
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

const commonHeaderOptions = {
  headerStyle: { backgroundColor: 'lightblue' }, 
  headerTintColor: '#fff', 
};

export default function App() {
  const [user, setUser] = useState(null);

  // Add notification listener
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body, data } = notification.request.content;
        console.log('Notification Received:');
        console.log('Title:', title);
        console.log('Body:', body);
        console.log('Data:', data);
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.remove();
  }, []);

  // Existing auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={GoalDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="Profile" component={Profile} /> Register Profile screen */}
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        {user ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}