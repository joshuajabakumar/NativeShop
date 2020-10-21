import React from 'react';
import { Text } from '@ui-kitten/components';

import { DrawerMenuIcon, CartHeaderIcon,  HeaderBackIcon, HeaderCloseIcon} from '../../components/Icons';

export const HeaderLeftDrawer = (props)=> {
    // Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.openDrawer();
    };
  
    return (
      <DrawerMenuIcon onPress={()=> toggleDrawer()} />
    );
  }
  
 export  const HeaderRightOptions = (props) => {
    // Show Cart Icon
    const navigateToCart = () => {
      props.navigationProps.navigate('Cart');
    }
  
    return (
      <CartHeaderIcon onPress={()=> navigateToCart()} />
    );
  }
  
export  const HeaderTitleOptions = (props) => {
    // Header Logo or Header Text
    return (
      <Text category='h1'>Klosmic</Text>
    );
  }

export const HeaderBack = (props) => {

    const navigateBack = () => {
      props.navigationProps.navigate('CollectionsScreen');
    }

    return (
      <HeaderBackIcon onPress={() => navigateBack()} />
    );
}

export const HeaderClose = (props) => {

  const navigateBack = () => {
    props.navigationProps.goBack();
  }

  return(
    <HeaderCloseIcon onPress={() => navigateBack()} />
  );
}