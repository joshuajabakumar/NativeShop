import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} category='h2'>Tab Cart</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
