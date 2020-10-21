import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
// import { gql } from 'babel-plugin-graphql-js-client-transform';

import { Shopify, ShopifyXHR } from '../constants/Shopify';
import { INIT_CHECKOUT, UPDATE_APP } from '../constants/ActionTypes';

export default function useCachedResources(store) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        // Get App Intial App Data
        await getAllCategories();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    const getAllCategories = () => {
      // console.log(store);
      return new Promise((resolve, reject) => {

        const query = `{
          collections(first:10,sortKey:TITLE){
            edges {
              node { 
                id,
                title,
                image{
                  altText, originalSrc
                }
                handle
              }
              cursor
            }
            pageInfo{
              hasNextPage,
              hasPreviousPage
            }
          }
        }`;

        ShopifyXHR(query).then((result) => {
          store.dispatch({
            type: UPDATE_APP,
            payload: {
              allCategories: result
            }
          });

          // Check and create checkout instance on App Load
          // Todo - Cart Persistance
          Shopify.checkout.create().then((res) => {
            resolve(result);
            store.dispatch({
              type: INIT_CHECKOUT,
              payload: {
                checkout: res
              }
            });
          });

        }).catch((error) => {
          console.log(error);
        });

      }); 
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
