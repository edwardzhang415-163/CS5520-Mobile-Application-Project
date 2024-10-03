import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();

const commonHeaderOptions = {
  headerStyle: { backgroundColor: 'lightblue' }, 
  headerTintColor: '#fff', 
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        <Stack.Screen 
          name="Home" component={Home} options={{ title: 'Home'}} />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails} 
          options={({ route, navigation }) => ({ 
            title: route.params ? route.params.goal.text : "More Details" ,
            
          })}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}