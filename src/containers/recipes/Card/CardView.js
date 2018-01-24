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
  this.state = {
    tone: {
      latitude: 28.6315,
      longitude: 77.2167,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      lastUpdated: '1/21/18 8:32AM'
    }
  };
}

  static propTypes = {
    title: PropTypes.array.isRequired,
    onPress: PropTypes.func,
  }

  onPressLearnMore =  () => {
    this.setState({
      tone: {
        latitude: 28.6315,
        longitude: 77.2167,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        lastUpdated: '1/21/18 8:32AM'
      }
    });
  }

  getDescription = () => {
    return this.state.tone.lastUpdated;
  }

  static defaultProps = {
    onPress: null,
    onPressFavourite: null,
    isFavourite: null,
  }

  render = () => {
    const { title, onPress } = this.props;
    const count = title.length;
    style.mapCard.height =  (100 / count).toString() + '%';
    const toRender = [];

    for (let i=0; i<count; i++) {
    toRender.push(
    <View style={style.mapCard}>
      <View>
          <View style={[{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={{marginLeft: 0}}>{title[i]}</Text>
            <Icon name="refresh" size={30} color="#900" onPress={this.onPressLearnMore} />
          </View>
    <View style={style.mapHolderBody}>
            <MapView style={{height: 360 , width: 300, marginLeft: 10}}
            region={this.state.tone}
            onRegionChange={this.onRegionChange}
          >
              <MapView.Marker
                coordinate={this.state.tone}
                title={'Last Updated At'}
                description={this.state.tone.lastUpdated}
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
