import { StyleSheet, Text, View } from "react-native";

export default function GoalItem({item}) {
    return(
        // console.log("goal",item),
    <View  style={styles.goalItem}>
      <Text>{item.text}</Text>
      
    </View>
  )}
  
const styles = StyleSheet.create({
    goalItem: {
    padding: 8,
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
    });  