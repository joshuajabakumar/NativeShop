import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from '@ui-kitten/components';

import light from '../../constants/Colors';

export function HomeBarIcon(props) {
    return <Icon
            style={styles.icon}
            fill={props.color}
            name='home-outline'
            animation='pulse'
        />
}
  
export  function CollectionsBarIcon(props) {
    return(
        <Icon
            style={styles.icon}
            fill={props.color}
            name='layers-outline'
            animation='pulse'
        />
    );
}

export function CartBarIcon(props) {
    return(
        <Icon 
            style={styles.icon}
            fill={props.color}
            name='shopping-cart-outline'
            animation='pulse'
        />
    );
}

export function DrawerMenuIcon(props) {
    return(
        <Button
            onPressOut={props.onPress}
            appearance='ghost'
            children={() => <Icon 
                style={styles.icon}
                fill={light.light.text}
                name='menu-2'
            />}>
        </Button>
    );
}

export function CartHeaderIcon (props) {
    return (
        <Button
            onPress = {props.onPress}
            appearance='ghost'
            children={() => {
                return(
                    <Icon
                        style={styles.icon}
                        fill={light.light.text}   
                        name='shopping-cart-outline'    
                    />
                );
            }}            
        >
        </Button>
    );
}

export function HeaderBackIcon (props) {
    return (
        <Button
            onPress = {props.onPress}
            appearance='ghost'
            children={() => {
                return(
                    <Icon
                        style={styles.icon}
                        fill={light.light.text}   
                        name='arrow-back'    
                    />
                );
            }}
        >    
        </Button>
    )
}

export function HeaderCloseIcon (props) {
    return (
        <Button
            onPress = {props.onPress}
            appearance='ghost'
            children={() => {
                return(
                    <Icon
                        style={styles.icon}
                        fill={light.light.text}   
                        name='close'    
                    />
                );
            }}
        >    
        </Button>
    );
}

const styles = StyleSheet.create({
    icon: {
      width: 25,
      height: 25,
    },
});