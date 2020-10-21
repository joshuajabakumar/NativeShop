import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CollectionsScreen from '../../screens/CollectionsScreen';
import ProductListScreen from '../../screens/ProductListScreen';
import { CollectionsParamList } from '../../types';
import { HeaderLeftDrawer, HeaderRightOptions, HeaderTitleOptions, HeaderBack } from './HeaderComponent';
import { Text } from '@ui-kitten/components';

const CollectionsStack = createStackNavigator<CollectionsParamList>();

function CollectionsNavigator({ navigation }) {
  return (
    <CollectionsStack.Navigator screenOptions={{ headerShown: true }}>
      <CollectionsStack.Screen
        name="CollectionsScreen"
        component={CollectionsScreen}
        options={{
          headerTitle: props => (<HeaderTitleOptions />),
          headerLeft: () => (<HeaderLeftDrawer navigationProps={navigation} />),
          headerRight: () => (<HeaderRightOptions navigationProps={navigation} />),
          headerTitleAlign: "center",
          headerLeftContainerStyle: {paddingLeft:'2%'},
          headerRightContainerStyle: {paddingRight:'2%'}
        }} 
      />

      <CollectionsStack.Screen 
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          headerTitle: props => (<HeaderTitleOptions />),
          headerLeft: () => (<HeaderBack navigationProps={navigation} />),
          // headerRight: () => (<HeaderRightOptions navigationProps={navigation} />),
          headerTitleAlign: "center",
          headerLeftContainerStyle: {paddingLeft:'2%'},
          headerRightContainerStyle: {paddingRight:'2%'}
        }} 
      />
    </CollectionsStack.Navigator>
  );
}

export default CollectionsNavigator;