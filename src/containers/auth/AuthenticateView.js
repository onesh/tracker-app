import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer, Text, Button } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.brand.primary,
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  logo: {
    width: AppSizes.screen.width * 0.85,
    height: 300,
    resizeMode: 'contain',
    paddingTop: 100,
    paddingBottom: 100
  },
  whiteText: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
class Authenticate extends Component {
  static componentName = 'Authenticate';

  render = () => (
    <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
      <Image
        source={require('../../images/logo.png')}
        style={[styles.logo]}
      />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'Login'}
            icon={{ name: 'lock' }}
            onPress={Actions.login}
            backgroundColor={'white'}
            color={'black'}
          />
        </View>
      </View>

      <Spacer size={10} />


      <Text p style={[AppStyles.textCenterAligned, styles.whiteText]}>
        - or -
      </Text>

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'Sign up'}
            icon={{ name: 'face' }}
            onPress={Actions.signUp}
            backgroundColor={'white'}
            color={'black'}
          />
        </View>
      </View>
      <Spacer size={40} />
    </View>
  )
}

/* Export Component ==================================================================== */
export default Authenticate;
