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
  TouchableHighlight,
  TextInput,
  Modal
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';




// Components
import { Text } from '@ui/';

const style = StyleSheet.create({
  mapCard: {
    shadowColor: 'gray',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  }
})





/* Component ==================================================================== */
class geofensing extends Component {

constructor({text}) {
  super();
  this.state = {
    myloc:  {}
  };

this.modalVisible = false;
}
static defaultProps = { device: {} };
static componentName = 'geofensing';


onRegionChange = () => {

}

getRadiusModal (coords) {
  if (this.modalVisible) {
          return (<View
            style={[{opacity: 0.9}, {position: 'absolute', zIndex: 7, top: ( Sizes.screen.width / 1.5 ), height: 150, width: Sizes.screen.width - 40, marginLeft: 20, backgroundColor: 'white', marginTop: 40}]}
            key = {'radiusModal'}
          >

              <Text style={{fontSize: 15}}>  set radius around the location: </Text>
              <TextInput
              style={{paddingBottom: 10, paddingLeft: 10}}
              keyboardType={'numeric'}
              />

                  <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 40}}>
                  <View style={{width: '30%'}}>
                    <Button
                        onPress={() => {this.modalVisible = false; this.forceUpdate();}}
                        title="ok"
                        color="black"
                    />
                  </View>
                  <View style={{width: '30%'}}></View>
                  <View style={{width: '40%'}}>
                    <Button
                        onPress={() => {this.modalVisible = false; this.forceUpdate();}}
                        title="cancel"
                        color="black"
                    />
                  </View>
                </View>

              </View>
      );
}
}
 GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      key={'placesAPI'}
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      var latlng = details.geometry.location;
      this.state.myloc = {
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
        latitude: latlng.lat,
        longitude: latlng.lng
      }
      this.forceUpdate();
      }}


      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDp3dF1wHY67lVzyyU1Gd4vkvtNid1ksxQ',
        language: 'en', // language of the results
      }}

      styles={{

        listView: {
          backgroundColor: 'white',
        }
      }}

      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
      }}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
    />
  );
}


plotDirection = () => {
  navigator.geolocation.getCurrentPosition((loc) => {
      that.state.myLoc = loc.coords;
      that.forceUpdate();
    }).catch (() => {});
}

render = () => {
var that = this;

  return (
<View>
{[this.getRadiusModal()]}
  <View style={{position: 'absolute', top: 50, left: 30, zIndex: 6}}>
    <TouchableOpacity activeOpacity={0.2} onPress={()=> Actions.pop()}>
        <Icon name='chevron-left' size={30} />
    </TouchableOpacity>
  </View>
  <View style={{position: 'absolute', top: 100, left: 20,width: Sizes.screen.width - 40 , zIndex: 6, flex: 1, justifyContent: 'center', flexDirection: 'row'}}>

    {[this.GooglePlacesInput()]}

  </View>
  <View style={[AppStyles.container, AppStyles.containerCentered, style.mapCard]}>
      <View>
        <MapView style={{height: Sizes.screen.height,
                         width: Sizes.screen.width,
                         zIndex: 3}}
            region={Object.keys(that.state.myloc).length === 0 ? this.props.device : that.state.myloc}

              onRegionChange={this.onRegionChange}>

              <Marker draggable
                onDragEnd={ (e) =>  {this.modalVisible = true; this.getRadiusModal (e.nativeEvent.coordinate); this.forceUpdate()} }
                coordinate={Object.keys(that.state.myloc).length === 0 ? this.props.device : that.state.myloc}
            />
      </MapView>
    </View>
  </View>

  </View>
);
}
}



/* Export Component ==================================================================== */
export default geofensing;
