import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import textboxTheme from '../assets/Style/textBoxTheme';

const XYZScreen = () => {
  const [value, setValue] = useState('');

  const handlePress = () => {
    Alert.alert('Button pressed!', 'Value: ' + value);
  };

  return (
    <View>
      <TextInput
        style={[textboxTheme.default, styles.input]}
        value={value}
        onChangeText={setValue}
        placeholder="Enter something"
      />
      <Button title="Submit" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 16,
  // },
  input: {
    width: '100%',
    marginBottom: 16,
  },
});

export default XYZScreen; 