/**
 * Placeholder Scene
 *
    <Placeholder text={"Hello World"} />
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
  TouchableHighlight
 } from 'react-native';
 import { Button } from 'react-native-elements'

// Consts and Libs
import { AppStyles } from '@theme/';
import Sizes from '@theme/sizes';
import { Actions } from 'react-native-router-flux';


import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


// Components
import { Text } from '@ui/';

const style = StyleSheet.create({
  mapCard: {
    borderWidth: 0,
    borderRadius: 0,
    borderColor: 'gray',
    borderBottomWidth: 0,
    shadowColor: 'gray',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    backgroundColor: 'white',
    zIndex: 5,
    top: 0,
    position: 'absolute'
  }
})





/* Component ==================================================================== */
class allTrackers extends Component {

constructor({text}) {
  super();
  this.state = {
    centre : {
      latitude: 28.6315,
      longitude: 77.2167,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }
  };
  allmapDataPromise = this.getMapsData();
  allmapDataPromise.then((res) => {this.state.markers = JSON.parse(res._bodyInit); this.forceUpdate()})
                   .catch((err) => {});


}

getMapsData() {
  return   fetch('http://ec2-18-216-151-224.us-east-2.compute.amazonaws.com:8000/getTrackerData', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        }
  });
};

onRegionChange = () => {

}

static defaultProps = { device: {} };
static componentName = 'allTrackers';

getName = (i) => {
  if (this.state.markers[i].id) return this.state.markers[i].id;
  else return ""
}
render = () => {
var that = this;
  return (
<View>
  <View style={{position: 'absolute', top: 50, left: 30, zIndex: 6}}>
  <TouchableOpacity activeOpacity={0.2} onPress={()=> Actions.pop()}>
      <Icon name='chevron-left' size={30} />
  </TouchableOpacity>
  </View>
  <View style={[AppStyles.container, AppStyles.containerCentered, style.mapCard]}>
      <View>
        <MapView style={{height: Sizes.screen.height,
                         width: Sizes.screen.width,
                         zIndex: 3}}
            region={{
                      latitude: that.props.device['latitude'],
                      longitude: that.props.device['longitude'],
                      longitudeDelta: 0.02,
                      latitudeDelta: 0.02
                  }}

              onRegionChange={this.onRegionChange}>

              <Marker
                coordinate={{
                          latitude: that.props.device['latitude'],
                          longitude: that.props.device['longitude'],
                          longitudeDelta: 0.2,
                          latitudeDelta: 0.2
                      }}
                title={that.props.device['datetime']}
    />
        </MapView>
    </View>
  </View>

  </View>
);
}
}



/* Export Component ==================================================================== */
export default allTrackers;
