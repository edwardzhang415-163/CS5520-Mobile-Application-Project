import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#007BFF',
  secondary: '#ccc',
  pressed: '#ddd',
  text: '#fff',
  ripple: '#ff0000',
};

export const commonStyles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary,
  },
  buttonPressed: {
    backgroundColor: colors.pressed,
    opacity: 0.5,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
  },
  goalItem: {
    padding: 8,
    borderColor: colors.secondary,
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  goalItemPressed: {
    backgroundColor: colors.pressed,
    opacity: 0.5,
  },
  goalItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});