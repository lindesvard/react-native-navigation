import React, { Component } from 'react';
import { View } from 'react-native';
import { LayoutComponent } from './LayoutComponent';
import { ComponentProps } from './ComponentProps';
import { connect } from './connect';

export const BottomTabs = connect(
  class extends Component<ComponentProps> {
    renderScreens() {
      return this.props.layoutNode.children.map((child) => {
        return <LayoutComponent key={child.nodeId} layoutNode={child} />;
      });
    }

    render() {
      return <View>{this.renderScreens()}</View>;
    }
  }
);
