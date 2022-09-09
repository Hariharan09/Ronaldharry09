//one setter function

import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

export default function App() {
  const [data, setData] = useState({
    info: {des: {name: 'a', email: '', password: '', age: '', contactNo: ''}},
  });
  // console.log('data-->', JSON.stringify(data));

  function onChangeText(val, i) {
    setData({...data, info: {...data.info, des: {...data.info.des, [i]: val}}});
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={data.info.des.name}
        style={styles.input}
        onChangeText={val => {
          onChangeText(val, 'name');
        }}
      />
      <TextInput
        value={data.info.des.email}
        style={styles.input}
        onChangeText={val => {
          onChangeText(val, 'email');
        }}
      />
      <TextInput
        value={data.info.des.password}
        style={styles.input}
        onChangeText={val => {
          onChangeText(val, 'password');
        }}
      />
      <TextInput
        value={data.info.des.age}
        style={styles.input}
        onChangeText={val => {
          onChangeText(val, 'age');
        }}
      />
      <TextInput
        value={data.info.des.contactNo}
        style={styles.input}
        onChangeText={val => {
          onChangeText(val, 'contactNo');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
  },
});
