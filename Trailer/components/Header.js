import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
  return (
    <View>
      <Text>{props.appName}</Text>
    </View>
  );
};

export default Header;