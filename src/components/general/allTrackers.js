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
  Button
 } from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';
import MapView from 'react-native-maps';

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
    elevation: 6,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
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

static propTypes = { text: PropTypes.string };
static defaultProps = { text: 'All Trackers' };
static componentName = 'allTrackers';


relocateMap = (i) => {
  let that = this;
  if ( that.state.markers[i].id) {
    this.setState({
      centre: {latitude: that.state.markers[i].latitude,
        longitude: that.state.markers[i].longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    });
  }
}
getName = (i) => {
  if (this.state.markers[i].id) return this.state.markers[i].id;
  else return ""
}
render = () => {

  const trackerRelocators = [];
  const keys = Object.keys(!this.state.markers ? {} : this.state.markers);
  let that = this;
  for (let i=0; i<keys.length; i++) {
  trackerRelocators.push(
    <View style={{marginLeft: 5}}>
    <Button style={{flexDirection:'row', flexWrap:'wrap',  backgroundColor: 'white'}}
    onPress={() => this.relocateMap(keys[i])}
    title={this.getName(keys[i])}
    color="#50B7EF"
  />
  </View>
);
}


  return (
  <View style={[AppStyles.container, AppStyles.containerCentered, style.mapCard]}>

  <View>
    <MapView style={{height: 420 , width: 440}}
        region={this.state.centre}

          onRegionChange={this.onRegionChange}>
          {
            (function (){
              let localMarkers = [];
              for (let ctr =0; ctr < keys.length ; ctr ++) {
                localMarkers.push(<MapView.Marker
                  coordinate={{latitude: that.state.markers[keys[ctr]].latitude,
                               longitude: that.state.markers[keys[ctr]].longitude,
                               latitudeDelta: 0.02,
                               longitudeDelta: 0.02,
                             }}
                  title={keys[ctr]}
                />)
              }
              return localMarkers;
            })()
          }
    </MapView>
  </View>

  <View style={[AppStyles.containerCentered, AppStyles.container, {flexDirection:'row', flexWrap:'wrap',  backgroundColor: 'white'}]}>
  {trackerRelocators}
  </View>

  </View>
);
}
}



/* Export Component ==================================================================== */
export default allTrackers;
