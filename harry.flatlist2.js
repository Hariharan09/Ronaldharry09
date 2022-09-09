//flatlist--->2
import {Text, View, FlatList} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageCount: 1,
      pagesCount: 30,
    };
    // let arr = [1, 2, 3, 4];
    // console.log('typeof-->', typeof arr);
  }
  componentDidMount() {
    this.getApi();
  }
  // componentDidUpdate(){ 
  //     this.getApi()

  // }
  getApi = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${this.state.pageCount}&sparkline=false`,
      )
      .then(res => {
        // console.log('res-->', res.data[0]);
        let datas = [...this.state.list, ...res.data];
        this.setState({list: datas});
      });
  };
  renderItem = data => {
    const {item} = data;
    // console.log('data--->', data);
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
    alert('this list will reaced on this page');
    this.state.pageCount = this.state.pageCount + 1;
    this.getApi();
    console.log('this.state.pageCount--->', this.state.pageCount);
  };
  render() {
    console.log('this.state.list', this.state.list.length);
    return (
      <View style={{flex: 1}}>
        {/* {this.state.list&&this.state.list.map((el)=>{
          return(
            <View>
              <Text>{el.name}</Text>
            </View>
          )
        })} */}
        <FlatList
          data={this.state.list}
          keyExtractor={el => {
            return el.id;
          }}
          renderItem={this.renderItem}
          onEndReached={this.onEndReachMethod}
        />
      </View>
    );
  }
}

export default App;
