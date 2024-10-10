import { StyleSheet, Text, View, Button, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';
import PressableButton from "./PressableButton";

export default function GoalItem({item, onDelete}) {
  const navigation = useNavigation();
    return(
        // console.log("goal",item),
        <Pressable 
        onPress={() => navigation.navigate('Details', { goal: item })} // Navigate to GoalDetails on press
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#ccc',
            opacity: pressed ? 0.5 : 1,
          },
          styles.goalItem,
        ]}
        android_ripple={{ color: '#ff0000', borderless: false }}
      >
        <View style={styles.goalItemContent}>
          <Text>{item.text}</Text>
          <PressableButton pressedFunction={() => onDelete(item.id)} />
        </View>
      </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    });  