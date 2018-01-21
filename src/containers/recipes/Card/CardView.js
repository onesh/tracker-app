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
import { Icon } from 'react-native-elements';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Card, Text } from '@ui/';
import MapView from 'react-native-maps';


/* Styles ==================================================================== */
const style = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0,
  },
mapHolderHeader: {
backgroundColor: 'aliceblue',
},
mapHolderBody: {

},
container: {
position: 'relative',
height: 450,
width: 360,
backgroundColor: 'white'
},
mapCard: {
  position: 'absolute',
  left: 30,
  top: 25,
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
});

/* Component ==================================================================== */
class Map extends Component {
  static componentName = 'Map';
  constructor() {
  super();
  this.state = {
    location: {
      latitude: 28.6315,
      longitude: 77.2167,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  };
}

  static propTypes = {
    title: PropTypes.array.isRequired,
    onPress: PropTypes.func,
  }

  onPressLearnMore =  () => {
    this.setState({
      location: {
        latitude: 28.6315,
        longitude: 77.2167,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    });
  }

  static defaultProps = {
    onPress: null,
    onPressFavourite: null,
    isFavourite: null,
  }

  render = () => {
    const { title, onPress } = this.props;
    const count = title.length;
    const toRender = [];

    for (let i=0; i<count; i++) {
    toRender.push(
    <View id={Math.random()} style={style.container}>

<View style={style.mapCard}>


    <View style={style.mapHolderHeader}>
    <Text>{title[i]}</Text>
    <Button
      onPress={this.onPressLearnMore}
      title="Re-centre"
      color="#841584"
    />
    </View>

    <View style={style.mapHolderBody}>
    <MapView style={{height: 360 , width: 280}}
    region={this.state.location}
    onRegionChange={this.onRegionChange}
  >
      <MapView.Marker
        coordinate={this.state.location}
        title={'Last Location'}
        description={'Last Location'}
      />

  </MapView>
      </View>
     <View style={{backgroundColor: 'aliceblue', height: 20}}>
     <Text>Last Updated at: '1/21/18'</Text>
     </View>

</View>
     </View>


      );
  }

    return (
      <View style={[AppStyles.containerCentered, AppStyles.container, {backgroundColor: 'white'}]}>
      {toRender}
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default Map;
