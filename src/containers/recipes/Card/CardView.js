/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sizes from '@theme/sizes';

// Consts and Libs
import { AppStyles } from '@theme/';
import { Actions } from 'react-native-router-flux';

// Components
import { Card, Text } from '@ui/';
import MapView from 'react-native-maps';
import Toast from 'react-native-simple-toast';

let totalMaps = 0;

/* Styles ==================================================================== */
const style = StyleSheet.create({

mapCard: {
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 20,
  paddingBottom: 20,
  borderColor: 'gray',
  shadowOpacity: 0.4,
  elevation: 3,
  shadowRadius: 2,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 15,
  backgroundColor: 'white',
  shadowOffset:{  width: 2,  height: 2 },
  shadowColor: 'black',
}
});

/* Component ==================================================================== */
class Map extends Component {
  static componentName = 'Map';
  constructor() {
  super();
  this.hasData = false;
};


  static propTypes = {
    title: PropTypes.array.isRequired,
    onPress: PropTypes.func,
  }

  getMapsData() {
    return   fetch('http://ec2-18-216-151-224.us-east-2.compute.amazonaws.com:8000/getTrackerData', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          }
    });
  };

  toggleCardVisibility  = (card) => {

    try {
      if (!card.showDetailCard) card.showDetailCard = true;
      else card.showDetailCard = false;
  } catch (err) {
    Toast.show('unable to close this card')
  }
    this.forceUpdate();
  };
  showCard(card, i) {
    var that = this;
    if (card.showDetailCard) {
       return (
      <View style={[style.mapCard, {flexDirection:'row', flexWrap:'wrap', marginTop: 0}]} key={this.state[this.mapKeys[i]].id}>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Icon  name="map-marker" size={25} />
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <Text style={{paddingTop: 5}}>Saraswati vidya mandir</Text>
            <Text>{'\n'}{'\n'}</Text>
        </View>

        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Icon name="location-arrow" size={25} />
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <Text style={{paddingTop: 5}}>{this.state[this.mapKeys[i]].latitude + ' N,' + this.state[this.mapKeys[i]].longitude + ' E'}</Text>
            <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
        </View>


        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <View style={{width: '50%'}}>
              <Button
                  onPress={() => Actions.geofensing({device: that.state[that.mapKeys[i]]})}
                  title="GEO-FENSING"
                  color="black"
                  accessibilityLabel="Geo-Fence the tracker"
              />
            </View>

            <View style={{width: '30%'}}></View>

            <View style={{width: '20%'}}>
              <Button
                  onPress={()=>{}}
                  title="EDIT"
                  color="black"
              />
            </View>

        </View>
     </View>
    );
  } else return (<Text></Text>)
}
  onPressLearnMore =  (i) => {
      this.hasData = false;
      this.forceUpdate();
  }
  relocateToMarker() {
    this.forceUpdate();
  }
  getDescription = () => {
    return this.state[1].lastUpdated;
  }

  static defaultProps = {
    onPress: null,
    onPressFavourite: null,
    isFavourite: null,
  }

  render = () => {
  let toRender = [];
  let that = this;
  if (this.hasData) {

      for (let i=0; i<this.mapKeys.length; i++) {

        if (!this.state[this.mapKeys[i]].latitudeDelta) this.state[this.mapKeys[i]].latitudeDelta = 0.2;
        if (!this.state[this.mapKeys[i]].longitudeDelta) this.state[this.mapKeys[i]].longitudeDelta = 0.2;
      toRender.push(
<View key={this.state[this.mapKeys[i]].id}>
    <TouchableOpacity activeOpacity={0.8} style={[style.mapCard, {flex: 1, flexDirection: 'row', justifyContent: 'space-between'}]} onPress= {() => this.toggleCardVisibility(this.state[this.mapKeys[i]])} key={this.state[this.mapKeys[i]].id}>
      <View style={{flexDirection:'row', flexWrap:'wrap'}} >
        <Icon name="warning" size={35}  />
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
              <Text style={{ flexDirection:'row', flexWrap:'wrap', fontSize: 20}}>{this.state[this.mapKeys[i]].id}({'Vansh'}) {'\n'}{'\n'}<Text>
                 Last Update: {this.state[this.mapKeys[i]].datetime}</Text>
                  <Text>{'\n'}{'\n'}</Text><Text>Battery Status: <Text>{this.state[this.mapKeys[i]].battery}%</Text></Text>
              </Text>
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <TouchableOpacity activeOpacity={0.2} onPress={() => Actions.trackerMap({device: that.state[that.mapKeys[i]]})} >
              <Icon  name="map" size={35}  />
          </TouchableOpacity>
    </View>
  </TouchableOpacity>
  <View>{this.showCard(this.state[this.mapKeys[i]], i)}</View>
  </View>
  );
}
  return (
<View style={{backgroundColor: 'white'}}>
  <View>
    {toRender}
  </View>
</View>
);

} else {
  let mapsDataPromise = this.getMapsData();
  this.mapKeys = [];
  let that = this;
  let { title, onPress } = this.props;
  let count  = this.mapKeys.length;
  style.mapCard.height =  (100 / count).toString() + '%';


  mapsDataPromise.then ((res) => {
    let mapData = JSON.parse(res._bodyInit);
      that.mapKeys = Object.keys(mapData);
      that.setState(mapData);
      this.hasData = true;
    }).catch((err) => {throw err;
      Toast.show('failed getting tracker data', Toast.LONG);
    });
    return (
      <View style={[style.container,  {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10
  }]}>
      <ActivityIndicator  style={{paddingTop: '50%'}} animating={!this.hasData} size="large" color="white" />
      </View>
      );
    }
  }
}

/* Export Component ==================================================================== */
export default Map;
