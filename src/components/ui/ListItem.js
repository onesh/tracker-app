/**
 * List Items
 *
     <ListItem title={'Hello World'} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';

/* Component ==================================================================== */
class CustomListItem extends Component {
  static defaultProps = {
    containerStyle: [],
    titleStyle: [],
    subtitleStyle: [],
  }

  listItemProps = () => {
    // Defaults
    const props = {
      title: 'Coming Soon...',
      chevronColor: AppColors.textSecondary,
      underlayColor: AppColors.border,
      ...this.props,
      containerStyle: [{
        backgroundColor: AppColors.listItemBackground,
        borderTopColor: AppColors.border,
        borderBottomColor: AppColors.border,
      }],
      titleStyle: [AppStyles.baseText],
      subtitleStyle: [AppStyles.subtext],
    };

    if (this.props.containerStyle) {
      props.containerStyle.push(this.props.containerStyle);
    }

    if (this.props.titleStyle) {
      props.titleStyle.push(this.props.titleStyle);
    }

    if (this.props.subtitleStyle) {
      props.subtitleStyle.push(this.props.subtitleStyle);
    }

    return props;
  }

  render = () => <ListItem {...this.listItemProps()} />;
}

/* Export Component ==================================================================== */
export default CustomListItem;
