import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles';

export default  function GoalUser(){
    useEffect(() => {
      async function fetchData() {
        try{
          const response  = await fetch("https://jsonplaceholder.typicode.com/todos/1");
          if (!response.ok) {
            throw new Error("http error: " + response.status); 
          }
          // call json() to extract the json body content from the response
          try {
            const data = await response.json();
            console.log("Data: ", data);
          } catch (error) {
            console.error("Error parsing json data: ", error);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
      fetchData();  
    }, [])
  
    return (
      <View>
        <Text>Goal User</Text>
      </View>
    )
  }