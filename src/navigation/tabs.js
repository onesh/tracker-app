import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import allTrackers from '@components/general/allTrackers';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideView';
import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeView';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} pressOpacity={0.95}>
    <Scene
      {...navbarPropsTabs}
      key={'tracker'}
      title={'trackers'}
    >
      <Scene
        {...navbarPropsTabs}
        key={'recipesListing'}
        component={Recipes}
        title={'DigiFence'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Recipe')}
      />
    </Scene>

    <Scene
      key={'trackerMap'}
      {...navbarPropsTabs}
      component={allTrackers}
    />


  </Scene>
);

export default scenes;
