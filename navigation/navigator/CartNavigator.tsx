import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from '../../screens/CartScreen';
import { CartParamList } from '../../types';
import { HeaderLeftDrawer, HeaderTitleOptions } from './HeaderComponent';

const CartStack = createStackNavigator<CartParamList>();

function CartNavigator({ navigation }) {
  return(
    <CartStack.Navigator screenOptions={{ headerShown: true }}>
      <CartStack.Screen 
        name='CartScreen'
        component={CartScreen}
        options={{
          headerTitle: props => (<HeaderTitleOptions />),
          headerLeft: () => (<HeaderLeftDrawer navigationProps={navigation} />),
          // headerRight: () => (<HeaderRightOptions navigationProps={navigation} />),
          headerTitleAlign: "left",
          headerLeftContainerStyle: {paddingLeft:'2%'},
          headerRightContainerStyle: {paddingRight:'2%'}
        }} 
      />
    </CartStack.Navigator>
  );  
}

export default CartNavigator;