import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Card, List, Spinner } from '@ui-kitten/components';
import { Thumbnail, Image } from 'native-base';

import { ShopifyXHR } from '../constants/Shopify';
import { UPDATE_PRODUCT_LIST } from '../constants/ActionTypes';
import { View } from '../components/Themed';

export default function CollectionsScreen(props) {

  const dispatch = useDispatch();

  // Get Initial Categories from CachedResources
  const allCategories = useSelector(state => {
    return state.appReducer.allCategories;
  });

  // Set Initial State Hooks
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState(allCategories.data.collections.edges);
  const [hasNextPage, setHasNextPage] = useState(allCategories.data.collections.pageInfo.hasNextPage );
  const [loadingMore, setloadingMore] = useState(allCategories.data.collections.pageInfo.hasNextPage ? true : false);

  // Categroy Header - Modularize it Later
  const CategoryHeader = (headerProps, cardInfo) => {
    return <View {...headerProps} style={{padding:0, borderRadius: 10}}>
      <Thumbnail 
        square
        large 
        source={{uri: cardInfo.item.node.image ? cardInfo.item.node.image.originalSrc : "https://via.placeholder.com/468x128?text=No+Image"}} 
        style={{width: '100%'}}
        />
    </View>
  }

  // Category Card - Modularize it Later
  const CategoryCard = (cardInfo) => {
    return <Card
      style={styles.item}
      status='basic'
      header={headerProps => CategoryHeader(headerProps, cardInfo)}
      //footer={renderItemFooter}
      onPress={(event) => onPressCategroyList(event, cardInfo)}
    >
      <Text style={{textAlign: 'center'}}>{cardInfo.item.node.title}</Text>
    </Card>
  }

  const ListFooter = () => {
    return (
      loadingMore ? <View style={styles.spinner}>
          <Spinner size='medium' /> 
        </View>: null
    );
  }

  const onPressCategroyList = (event, cardInfo) => {
    // Empty old product list
    dispatch({
        type: UPDATE_PRODUCT_LIST,
        payload: {
            productList: [],
        }
    });
    props.navigation.navigate('ProductListScreen', cardInfo.item.node);
  }

  const fetchNextCategoryList = (lastItemCursor) => {

    const query = `{
      collections(first:${pageSize},sortKey:TITLE,after:"${lastItemCursor}"){
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

      // Update Component State
      let currentCategories = result.data.collections.edges;
      setCategories(categories.concat(currentCategories));

      setHasNextPage(result.data.collections.pageInfo.hasNextPage);

    }).catch((error) => {
      console.log(error);
    });
  }

  const handleMore = (event) => {
      if(hasNextPage) {
        console.log('List had next page');
        let collectionList = categories;
        let lastItemCursor = collectionList[collectionList.length - 1].cursor;

        fetchNextCategoryList(lastItemCursor);
      } else {
        setloadingMore(false);
        return false;
      }
  }

  return (
    <List 
      style = {styles.container}
      contentContainerStyle = {styles.contentContainer}
      data = {categories}
      renderItem = {CategoryCard}
      onEndReached = {handleMore}
      onEndReachedThreshold = {0.5}
      ListFooterComponent = {ListFooter}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  item: {
    marginVertical: '2%',
    marginHorizontal: '2%',
    borderRadius: 10,
    paddingTop: 0,
    flex: 1,
    flexDirection: 'column'

  },
  spinner: {
    alignItems:'center', 
    flex:1, 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    paddingVertical: 4,
    marginTop: 10,
    marginBottom: 10
  }
});
