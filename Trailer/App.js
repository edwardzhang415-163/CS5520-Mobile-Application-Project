import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails} 
          options={({ route }) => ({ 
            title: route.params ? route.params.goal.text : "More Details",
          })} 
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}