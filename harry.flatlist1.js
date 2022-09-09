//flatlist--->1

import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  ImageBackgroundComponent,
  Image
} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      Arr: [],
      Array: [],
      view:true,
    };
    // let arr = [1, 2, 3, 4];
    // console.log('typeof-->', typeof arr);
  }
  mappedArr = () => {
    let output = JSON.parse(JSON.stringify(this.state.Arr));
    for (let i = 1; i <= this.state.list.length / 10; i++) {
      output.push({id: i, isShow: false});
    }
    this.setState({Arr: output});
  };
  handleonPress = el => {
    let temp = JSON.parse(JSON.stringify(this.state.Arr));
    temp.forEach((item, i) => {
      // alert(item.id)
      if (el.id === item.id) {
        item.isShow = true;
      } else {
        item.isShow = false;
      }
      this.setState({Arr: temp});
      console.log('el.isShow11', el.isShow);
    });

    // alert(el.isShow)
    console.log('el.isShow22', el.isShow);

    let start;
    let end;
    if (el.id === 1) {
      start = (el.id - 1) * 10;
      end = el.id * 10 + 1;
    } else if (el.id != 0) {
      start = (el.id - 1) * 10 + 1;
      end = el.id * 10 + 1;
    }
    let datas = this.state.list.slice(start, end);
    this.state.Array.push(datas);
    this.setState({Array: datas});
    // this.state.Array=datas
    // alert(el.id);
    // alert(index)
    console.log('start', 'end', start, end);
    console.log('data', datas);
  };
  componentDidMount() {
    setTimeout(()=>this.getApi(),5000)
  }
  getApi = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`,
      )
      .then(res => {
        console.log('res-->', res.data[0]);
        let output = JSON.parse(JSON.stringify(this.state.Arr));
        for (let i = 1; i <= res.data.length / 10; i++) {
          output.push({id: i, isShow: false});
        }
        let datas = res.data.slice(0, 11);
        this.state.Array.push(datas);
        this.setState({Arr: output, list: res.data, Array: datas});
      });
      this.setState({view:false})
  };
  renderItem = data => {
    const {item} = data;
    console.log('data--->', item);
    return (
      <View
        style={{
          width: '90%',
          height: 100,
          backgroundColor: 'lightgreen',
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  onEndReachMethod = () => {
    console.log('end reached');
    alert('this list will be  reaced on this page');
  };
  render() {
    // console.log('this.state.list', this.state.list.length);
    // console.log('list-->', this.state.Array);
    // console.log("this.state.isShow",this.state.isShow)
    return (
      <View style={{flex: 1}}>
        {/* {this.state.list&&this.state.list.map((el)=>{
          return(
            <View>
              <Text>{el.name}</Text>
            </View>
          )
        })} */}
        {this.state.view?
        <View style={{alignSelf:"center",marginTop:300}}>
            <Image style={{height:100,width:200}} 
            source={{uri:"https://www.transparentpng.com/thumb/batman/aWnjr6-batman-png-picture.png"}}/>
            <Text style={{alignSelf:"center",fontSize:30,fontWeight:"500"}}>BATLOG</Text>
         </View> : null }

        <FlatList
          data={this.state.Array}
          keyExtractor={el => {
            return el.id;
          }}
          renderItem={this.renderItem}
          onEndReached={this.onEndReachMethod}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {this.state.Arr.map(el => {
            // console.log('el', el);
            // console.log(this.state.Arr);
            return (
              <View>
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: 30,
                    borderWidth: 1,
                    backgroundColor: el.isShow === true ? '#05f711' : null,
                  }}
                  onPress={() => {
                    this.handleonPress(el);
                  }}>
                  <Text style={{alignSelf: 'center'}}>{el.id}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default App;
