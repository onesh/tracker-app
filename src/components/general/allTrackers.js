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
import Toast from 'react-native-simple-toast';
import Polyline from '@mapbox/polyline';



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
    coords: [],
    myLoc: {},
    scale: 0.02,
    distance: '',
    duration: '',
    origin: '',
    destination: ''
  };
  allmapDataPromise = this.getMapsData();
  allmapDataPromise.then((res) => {this.state.markers = JSON.parse(res._bodyInit); this.forceUpdate()})
                   .catch((err) => {});


}
static defaultProps = { device: {} };
static componentName = 'allTrackers';

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

plotDirection = () => {
  var initial = {};
  var that = this;
  var coords = [];
  var points;
  var final =  that.props.device['latitude']  + ',' + that.props.device['longitude'];

navigator.geolocation.getCurrentPosition((loc) =>
    {
      initial = loc.coords.latitude + ',' + loc.coords.longitude;
       that.state.myLoc = loc.coords;
      fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${initial}&destination=${final}&mode=driving&key=AIzaSyDrdLsKjx15ieOVdKLsKRdp348YkRMGl88`)
            .then(response => response.json())
            .then(response => {
              points = Polyline.decode(response.routes[0].overview_polyline.points);
              coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
      });
      that.state.coords = coords;
      this.state.scale = 0.5;
      that.forceUpdate();
    }).catch (() => {
  });

    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${initial}&destinations=${final}&mode=driving&key=AIzaSyDp3dF1wHY67lVzyyU1Gd4vkvtNid1ksxQ`)
          .then(response => response.json())
          .then ((response) => {
            that.state.duration = response['rows'][0]['elements'][0]['duration']['text'];
            that.state.distance = response['rows'][0]['elements'][0]['distance']['text'];
            that.forceUpdate();
        });
    });
}

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
  <View style={{position: 'absolute', top: (Sizes.screen.height - 120), left: (Sizes.screen.width / 6), zIndex: 6, flex: 1, justifyContent: 'center', flexDirection: 'row'}}>

      <TouchableOpacity  activeOpacity={0.2} onPress={()=> Actions.pop()}>
          <Icon  name='history' size={50} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: (Sizes.screen.width / 5)}} activeOpacity={0.2} onPress={this.plotDirection}>
          <Icon  name='map-marker' size={50} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: (Sizes.screen.width / 5)}} activeOpacity={0.2} onPress={()=> this.forceUpdate()}>
      <Icon  name='thumb-tack' size={50} />
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
                      longitudeDelta: that.state.scale,
                      latitudeDelta: that.state.scale
                  }}

              onRegionChange={this.onRegionChange}>

              <Marker
                coordinate={{
                          latitude: that.props.device['latitude'],
                          longitude: that.props.device['longitude'],
                          longitudeDelta: that.state.scale,
                          latitudeDelta: that.state.scale
                      }}
                description={that.props.device['datetime']}
                title={'last updated at'}
          />

          <Marker
            coordinate={{
                      latitude: (!that.state.myLoc['latitude'] === true ? 0.00 : that.state.myLoc['latitude']),
                      longitude: (!that.state.myLoc['longitude'] === true ? 0.00 : that.state.myLoc['longitude']),
                      longitudeDelta: 0.2,
                      latitudeDelta: 0.2
                  }}
            description={'Duration: ' + that.state.duration + ', Distance: ' + that.state.distance}
            title={'Distance and Time Estimate'}

      />
      <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="black"/>
      </MapView>
    </View>
  </View>

  </View>
);
}
}



/* Export Component ==================================================================== */
export default allTrackers;
