import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Layout, Text } from '@ui-kitten/components';

import BottomTabNavigator from './BottomTabNavigator';
import ProductNavigator from './navigator/ProductNavigator';
import HomeDrawer from './HomeDrawer';

const { Navigator, Screen } = createDrawerNavigator();

const UsersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>USERS</Text>
    </Layout>
  );
  
  const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>ORDERS</Text>
    </Layout>
  );

const DrawerTabNavigator = ({ navigation }): React.ReactElement => (
  <Navigator drawerContent={props => <HomeDrawer {...props} />} drawerType={'slide'}>
    <Screen name='BottomTab' component={BottomTabNavigator} />
    <Screen 
      name='ProductDetailNavigator' 
      component={ProductNavigator}
    />
    <Screen name='Users' component={UsersScreen}/>
    <Screen name='Orders' component={OrdersScreen}/>
  </Navigator>
);

export default DrawerTabNavigator;