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
  View,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Card, Text } from '@ui/';
import MapView from 'react-native-maps';
import Toast from 'react-native-simple-toast';

let totalMaps = 0;

/* Styles ==================================================================== */
const style = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0,
  },
mapHolderBody: {
marginBottom: 20
},
mapCard: {
  paddingLeft: 15,
  paddingTop: 25,
  borderWidth: 0,
  borderRadius: 0,
  borderColor: 'gray',
  shadowColor: 'gray',
  shadowOffset: { width: 5, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 5,
  elevation: 6,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 30,
}
});

/* Component ==================================================================== */
class Map extends Component {
  static componentName = 'Map';
  constructor() {
  super();
  this.rendered = false;
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

  onPressLearnMore =  () => {
    let mapsData = getMapsData();
    let stateData = {};
    for (let i = 0; i < mapsData.length; i++) stateData[i] = mapsData[i];
    this.setState(stateData);
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
    let mapsDataPromise = this.getMapsData();
    this.mapKeys = [];
    mapsDataPromise.then ((res) => {
        this.mapKeys = Object.keys(res);
        Toast.show('Data' + JSON.stringify(res._bodyInit));
        Toast.show('This is a long toast.', Toast.LONG);
        if (!this.rendered) {
          this.setState(JSON.stringify(res._bodyInit));
          this.rendered = true;
        }
    }).catch((err) => {throw err;
      Toast.show('failed getting tracker data', Toast.LONG);
    });

    const { title, onPress } = this.props;
    const count = this.mapKeys.length;
    style.mapCard.height =  (100 / count).toString() + '%';
    const toRender = [];

    for (let i=0; i<count; i++) {
    toRender.push(
    <View style={style.mapCard}>
      <View>
          <View style={[{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={{marginLeft: 0}}>{title[i]}</Text>
            <Icon name="location-arrow" size={30} color="#900" onPress={this.onPressLearnMore} />
          </View>
    <View style={style.mapHolderBody}>
            <MapView style={{height: 360 , width: 300, marginLeft: 10}}
            region={this.state[this.mapKeys[i]]}
            onRegionChange={this.onRegionChange}
          >
              <MapView.Marker
                coordinate={this.state[this.mapKeys[i]]}
                title={'Last Updated At'}
                description={this.state[this.mapKeys[i]].date + ' ' + this.state[this.mapKeys[i]].time}
              />

          </MapView>
    </View>
  </View>
</View>


      );
  }

    return (
      <View style={{backgroundColor: 'white'}}>
      {toRender}
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default Map;
