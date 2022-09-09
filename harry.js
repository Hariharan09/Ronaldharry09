//APP.JS

import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import ChildOne from './childone';
import {ChildTwo} from './childTwo';
import {ChildThree} from './childThree';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      screen: 1,
      inputArr: [
        {id: 1, value: '', field: 'First Name'},
        {id: 2, value: '', field: 'Last Name'},
        {id: 3, value: '', field: 'User EmailId'},
      ],
      outputArr: [
        {id: 1, value: '', field: 'First Name'},
        {id: 2, value: '', field: 'Last Name'},
        {id: 3, value: '', field: 'User EmailId'},
      ],
      id : ""
    };
  }

  handleInput = (val, obj) => {
    let arr = [...this.state.inputArr];
    arr.forEach((el, i) => {
      if (obj.id === el.id) {
        arr[i].value = val;
      }
    });
    this.setState({inputArr: arr});
  };

  handleOutput = (val, obj) => {
    let arr = [...this.state.outputArr];
    arr.forEach((Element, i) => {
      if (obj.id === Element.id) {
        arr[i].value = val;
      }
    });
    this.setState({outputArr: arr});
  };

  onEdit = (id) => {
    this.state.id=id
    this.setState({screen: 3});
    console.log("editid--->",id,"this.state.id--->",this.state.id)
  };

  getfunction = () => {
    fetch('https://www.mecallapi.com/api/users', {
      method: 'GET',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(response => response.json())
      .then(res => {
        console.log('res-->', res);
        this.setState({data: res});
      })
      .catch(error => console.error(error));
    console.log('data--->', this.state.data);
  };

  handleOnpress = val => {
    let passingData = {
      fname: this.state.inputArr[0].value,
      lname: this.state.inputArr[1].value,
      username: this.state.inputArr[2].value,
      password: '1234',
      email: this.state.inputArr[2].value,
      avatar: 'https://www.mecallapi.com/users/cat.png',
    };

    fetch('https://www.mecallapi.com/api/users/create', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passingData),
    })
      .then(response => response.json())
      .then(res => {
        this.getfunction();
        console.log('res--11>', res);
      })
      .catch(error => console.error(error));

    let arr = [...this.state.inputArr];
    arr.forEach((el, i) => {
      arr[i].value = '';
    });
    this.setState({inputArr: arr});
  };

  componentDidMount() {
    this.getfunction();
  }

  handleOnedit = (val) => {
    console.log("rrrr-->")
    let EditingData = {
      id: this.state.id,
      fname: this.state.outputArr[0].value,
      lname: this.state.outputArr[1].value,
      email: this.state.outputArr[2].value,
    };

    fetch('https://www.mecallapi.com/api/users/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(EditingData),
    })
      .then(response => response.json())
      .then(res => {
        this.getfunction();
        console.log('res--12>', res);
      })
      .catch(error => console.error(error));

    let arr = [...this.state.outputArr];
    arr.forEach((el, i) => {
      arr[i].value = '';
    });
    this.setState({outputArr: arr});
  };

  ondelete = id => {
    console.log('deletedid--->', id);
    let deleteId = {
      id: id,
    };
    fetch('https://www.mecallapi.com/api/users/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteId),
    })
      .then(response => response.json())
      .then(res => {
        console.log('res-->', res);
        this.getfunction();
      })
      .catch(error => console.error(error));
  };

  render() {
    console.log(this.state);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#c6f7f7',
        }}>
        <View
          style={{
            height: 60,
            width: 400,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {
            <View>
              <View style={{marginLeft: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({screen: 1});
                  }}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={{
                      uri: 'https://as2.ftcdn.net/v2/jpg/02/02/93/99/1000_F_202939931_iHgLHxeBiSgNHbPvCSCdEEEtl391oRLM.jpg',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }

          <View>
            <View style={{marginRight: 20}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({screen: 2});
                }}>
                <Image
                  style={{height: 25, width: 25}}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3487/3487486.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.screen === 1 && (
          <ChildOne
            mappedArr1={this.state.data}
            ondelete={this.ondelete}
            onEdit={this.onEdit}
          />
        )}
        {this.state.screen === 2 && (
          <ChildTwo
            mappedArr2={this.state.inputArr}
            handleInput={this.handleInput}
            handleOnpress={this.handleOnpress}
          />
        )}
        {this.state.screen === 3 && (
          <ChildThree
            mappedArr3={this.state.outputArr}
            handleOutput={this.handleOutput}
            handleOnedit={this.handleOnedit}
          />
        )}
      </View>
    );
  }
}


//childone

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Image,
  ScrollView,
} from 'react-native';

export default class ChildOne extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        {this.props.mappedArr1.map(el => {
          return (
            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'skyblue',
                    margin: 10,
                  }}>
                  <Image
                    style={{height: 50, width: 50}}
                    source={{uri: el.avatar}}
                  />
                </View>
                <View style={{flexDirection: 'column', margin: 10}}>
                  <View>
                    <TextInput
                      value={el.fname + ' ' + el.lname}
                      onChangeText={() => {}}
                      editable={false}
                      style={{
                        backgroundColor: 'white',
                        height: 40,
                        width: 230,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                  <View>
                    <TextInput
                      value={el.username}
                      editable={false}
                      onChangeText={() => {}}
                      style={{
                        backgroundColor: 'white',
                        height: 40,
                        width: 230,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <TouchableOpacity
                    style={{height: 18, width: 18}}
                    onPress={() => {this.props.onEdit(el.id)}}>
                    <Image
                      style={{height: 18, width: 18}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828911.png',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>
                  <TouchableOpacity
                    style={{height: 18, width: 18}}
                    onPress={() => {this.props.ondelete(el.id)}}>
                    <Image
                      style={{height: 18, width: 18}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1345/1345823.png',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

//childtwo

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

export class ChildTwo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={{alignItems: 'center'}}>
          {this.props.mappedArr2.map(el => {
            return (
              <TextInput
                value={el.value}
                placeholder={el.field}
                onChangeText={val => {
                  this.props.handleInput(val, el);
                }}
                style={styles.input}
              />
            );
          })}
        </View>
        <View>
          <Button
            title="submit"
            onPress={() => {
              this.props.handleOnpress();
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
});
  

//childthree

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

export class ChildThree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View style={{backgroundColor:"pink",flex:1}}>
        <View style={{alignItems: 'center'}}>
          {this.props.mappedArr3.map(Element => {
            return (
              <TextInput
                value={Element.value}
                placeholder={Element.field}
                onChangeText={val => {
                  this.props.handleOutput(val, Element);
                }}
                style={styles.input}
              />
            );
          })}
        </View>
        <View>
          <Button
            title="submit"
            onPress={() => {
              this.props.handleOnedit();
            }}
          />
        </View>
      </View>
      );
}
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 250,
      margin: 10,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: 'white',
      justifyContent: 'space-evenly',
    },
  });
