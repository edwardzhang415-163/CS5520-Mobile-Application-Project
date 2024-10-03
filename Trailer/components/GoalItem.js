import { StyleSheet, Text, View, Button} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({item, onDelete}) {
  const navigation = useNavigation();
    return(
        // console.log("goal",item),
    <View  style={styles.goalItem}>
      <Text>{item.text}</Text>
      <Button 
          title="i" 
          onPress={() => navigation.navigate('Details', { goal: item })} 
        />
      <Button title="X" onPress={() => onDelete(item.id)} /> 
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    });  