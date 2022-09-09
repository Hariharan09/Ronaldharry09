// hooks stopWatch

import React, {useState, useEffect} from 'react';
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
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(0);
  const [isShow, setShow] = useState(true);

  function start(){
      setSeconds(seconds+1)
    setShow(false)
  }
  function onpresStart() {
    if(seconds<60){
      setSeconds(seconds+1)
    }
     if (seconds === 60){
      setMinutes(minutes+1)
      setSeconds(0)
    }
    if(minutes === 60){
      setHours(hours+1)
      setMinutes(0)
    }
  }
  function onpresStop() {
    setShow(true);
  }
  function onpresReset() {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }
  useEffect(() => {
    if(isShow === false) { 
      setTimeout(() => {
        onpresStart();
      }, );
    }
    
    console.log('component mounted');
  }, [seconds]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99A3A9',
      }}>
      <View
        style={{
          height: 300,
          width: 300,
          backgroundColor: '#878686',
          borderRadius: 150,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{alignSelf: 'center', fontSize: 50}}>{hours}</Text>
          <View>
            <Text>HOURS</Text>
          </View>
        </View>
        <View>
          <Text style={{alignSelf: 'center', fontSize: 50}}>{minutes}</Text>
          <View>
            <Text>MINUTES</Text>
          </View>
        </View>
        <View>
          <Text style={{alignSelf: 'center', fontSize: 50}}>{seconds}</Text>
          <View>
            <Text>SECONDS</Text>
          </View>
        </View>
      </View>
      {isShow ? (
        <View>
          <TouchableOpacity style={styles.input}>
            <Text
              style={{
                alignSelf: 'center',
                margin: 7,
                fontWeight: 'bold',
                fontSize: 20,
              }}
              onPress={() => {
                start();
              }}>
              START
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.input}>
            <Text
              style={{
                alignSelf: 'center',
                margin: 7,
                fontWeight: 'bold',
                fontSize: 20,
              }}
              onPress={onpresStop}>
              STOP
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <TouchableOpacity style={styles.input}>
          <Text
            style={{
              alignSelf: 'center',
              margin: 7,
              fontWeight: 'bold',
              fontSize: 20,
            }}
            onPress={onpresReset}>
            RESET
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    backgroundColor: '#E9CDC4',
    borderRadius: 20,
    margin: 10,
  },
});
