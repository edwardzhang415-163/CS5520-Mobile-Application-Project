import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerStyle: { backgroundColor: '#f4511e' }, headerTintColor: '#fff', }} />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails} 
          options={({ route, navigation }) => ({ 
            title: route.params ? route.params.goal.text : "More Details" ,
            headerRight: () => (
              <Button
                onPress={() => alert('Header button pressed!')}
                title="Info"
              />
            ),
          })}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}