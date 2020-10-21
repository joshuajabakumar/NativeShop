import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { ShopifyGQL } from './constants/Shopify';

// Configure Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Redux Reducers
import appReducer from './store/reducers/appReducer.js';
import productReducer from './store/reducers/productReducer';
import orderReducer from './store/reducers/orderReducer';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const middleware = [
  thunk,
  // more middleware
];

// Combine Reducers
const rootReducer = combineReducers({
  appReducer,
  productReducer,
  orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers(applyMiddleware(...middleware))(createStore)(rootReducer);

export default function App() {
  const isLoadingComplete = useCachedResources(store);
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store} >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light} >
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </Provider>
    );
  }
}
