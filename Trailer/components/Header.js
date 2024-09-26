import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const Header = (props) => {
  return (
    <View>
      <Text style={style.textStyle}>{props.appName}</Text>
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  textStyle: {
    borderColor: 'purple',
    color: "purple",
    fontSize: 20,
    borderWidth: 2,
    padding: 10,
  }
})