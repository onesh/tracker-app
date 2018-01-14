import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
// import { AppConfig } from '@constants/';

// Components
// import Drawer from '@containers/ui/DrawerContainer';

// Scenes
import AppLaunch from '@containers/Launch/LaunchContainer';
// import Placeholder from '@components/general/Placeholder';
// import AuthScenes from './auth';
// import TabsScenes from './tabs';

/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
    <Scene
      hideNavBar
      key={'splash'}
      component={AppLaunch}
    />
  </Scene>,
);
