import React from 'react';
import { Drawer, DrawerItem, Layout, Text, IndexPath, Icon, Divider } from '@ui-kitten/components';
import { ImageBackground, StyleSheet } from 'react-native';

const Header = (props) => (
  <React.Fragment>
    <ImageBackground
      style={[props.style, styles.header]}
      source={require('../assets/images/splash.png')}
    />
    <Divider/>
  </React.Fragment>
);

const HomeDrawer = ({ navigation, state }) => (
  <Drawer
    header={Header}
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}  >
    <DrawerItem title='Users' />
    <DrawerItem title='Orders' />
  </Drawer>
);

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeDrawer;