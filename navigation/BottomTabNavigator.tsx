import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { HomeBarIcon, CollectionsBarIcon, CartBarIcon } from '../components/Icons';
import HomeNavigator from './navigator/HomeNavigator';
import CollectionsNavigator from './navigator/CollectionsNavigator';
import CartNavigator from './navigator/CartNavigator';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={
        { activeTintColor: Colors[colorScheme].tint,
          showLabel: false
        }
      }>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <HomeBarIcon color={color} />
        }}
      />

      <BottomTab.Screen
        name="Collections"
        component={CollectionsNavigator}
        options={{
          tabBarIcon: ({color}) => <CollectionsBarIcon color={color} />
        }}
      />

      <BottomTab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({color}) => <CartBarIcon color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  
});