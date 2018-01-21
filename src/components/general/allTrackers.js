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
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  };


  this.state.markers = [
    {
      latlng: {
      latitude: 28.5315,
      longitude: 77.2167,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    title: "Kiran's Last Location",
    name: 'Kiran'
  },
    {
      latlng: {
        latitude: 28.5325,
        longitude: 77.1167,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: "Ayushi's Last Location",
      name: 'Ayushi'
    },
    {
      latlng: {
      latitude: 28.5315,
      longitude: 77.2127,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    title: "Karan's Last Location",
    name: 'Karan'
  }
  ]

}


onRegionChange = () => {

}

static propTypes = { text: PropTypes.string };
static defaultProps = { text: 'All Trackers' };
static componentName = 'allTrackers';


relocateMap = (i) => {
  let that = this;
  if ( that.state.markers[i].latlng) {
    this.setState({
      centre: that.state.markers[i].latlng
    });
  }
}
getName = (i) => {
  if (this.state.markers[i].name) return this.state.markers[i].name;
}
render = () => {

  const trackerRelocators = [];
  for (let i=0; i<3; i++) {
  trackerRelocators.push(
    <View style={{marginLeft: 5}}>
    <Button style={{flexDirection:'row', flexWrap:'wrap'}}
    onPress={() => this.relocateMap(i)}
    title={this.getName(i)}
    color="#841584"
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
          {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
          />
        ))}
    </MapView>
  </View>

  <View style={[AppStyles.containerCentered, AppStyles.container, {flexDirection:'row', flexWrap:'wrap'}]}>
  {trackerRelocators}
  </View>

  </View>
);
}
}



/* Export Component ==================================================================== */
export default allTrackers;
