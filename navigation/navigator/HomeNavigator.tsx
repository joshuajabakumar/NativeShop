import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen';
import { HomeParamList } from '../../types';
import { HeaderLeftDrawer, HeaderRightOptions, HeaderTitleOptions } from './HeaderComponent';

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator({ navigation }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: true }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => (<HeaderTitleOptions />),
          headerLeft: () => (<HeaderLeftDrawer navigationProps={navigation} />),
          headerRight: () => (<HeaderRightOptions navigationProps={navigation} />),
          headerTitleAlign: "center",
          headerLeftContainerStyle: {paddingLeft:'2%'},
          headerRightContainerStyle: {paddingRight:'2%'}
        }} 
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;