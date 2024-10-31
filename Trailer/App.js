// App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup'; // Import the auth instance
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

const Stack = createNativeStackNavigator();

const commonHeaderOptions = {
  headerStyle: { backgroundColor: 'lightblue' }, 
  headerTintColor: '#fff', 
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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