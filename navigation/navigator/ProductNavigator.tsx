import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductDetailScreen from '../../screens/ProductDetailScreen';
import { ProductParamList } from '../../types';
import { HeaderRightOptions, HeaderClose } from './HeaderComponent';

const ProductStack = createStackNavigator<ProductParamList>();

function ProductNavigator({ navigation }) {
  return(
    <ProductStack.Navigator screenOptions={{ headerShown: true }}>
      <ProductStack.Screen 
        name='ProductScreen'
        component={ProductDetailScreen}
        options={{
          // headerTitle: props => (<HeaderTitleOptions />),
          // headerTitleAlign: "left",
          headerLeft: () => (<HeaderClose navigationProps={navigation} />),
          headerRight: () => (<HeaderRightOptions navigationProps={navigation} />),
          headerLeftContainerStyle: {paddingLeft:'2%'},
          headerRightContainerStyle: {paddingRight:'2%'},
          headerTitle: ""
        }} 
      />
    </ProductStack.Navigator>
  );  
}

export default ProductNavigator;