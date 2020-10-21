import * as React from 'react';
import {connect} from "react-redux";
import {bindActionCreators, compose} from 'redux';
import { Thumbnail } from 'native-base';
import { withNavigationFocus } from '@react-navigation/compat';

import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Text, Card, List, Spinner } from '@ui-kitten/components';
import getProductByCollectionHandle from '../store/actions/getProductsByCollectionHandle';

class ProductListScreen extends React.Component {

    constructor(props){
      super(props);
      
      const { handle, title } = this.props.route.params;
      // Set Current Product Page Title
      this.props.navigation.setOptions({
        headerTitle: title
      });

      // Get Product list for the initial collection
      this.props.getProductByCollectionHandle(handle, 'BEST_SELLING', true);
    }

    componentDidUpdate(prevProps) {
      if (this.props.isFocused && !prevProps.isFocused) {
        // Screen has now come into focus, perform your tasks here! 
        if(this.props.route.params.id !== prevProps.route.params.id){
          const { handle } = this.props.route.params;
          this.props.getProductByCollectionHandle(handle, 'BEST_SELLING', true);
        }
      } 
    }

    ProductHeader = (headerProps, productInfo) => {
      return (<View {...headerProps} style={{padding:0, borderRadius: 10}}>
        <Thumbnail 
          square
          large 
          source={{uri: productInfo.item.images ? productInfo.item.images[0].src : "https://via.placeholder.com/468x128?text=No+Image"}} 
          style={{width: '100%'}}
        />
      </View>)
    }

    ProductFooter = (footerProps, productInfo) => {
      return (<View {...footerProps} style={{padding:0, borderRadius: 10}}>
        <Text style={{textAlign: 'center'}}>{productInfo.item.variants[0].priceV2.amount} {productInfo.item.variants[0].priceV2.currencyCode}</Text>
      </View>)
    }

    ProductCard = (productInfo) => {
      return <Card
        style={styles.item}
        status='basic'
        header={headerProps => this.ProductHeader(headerProps, productInfo)}
        footer={footerProps => this.ProductFooter(footerProps, productInfo)}
        onPress={(event) => this.onPressProductList(event, productInfo)}
      >
        <Text style={{textAlign: 'center'}}>{productInfo.item.title}</Text>
      </Card>
    }

    ListFooter = () => {
      const { loadingMore } = this.props;
      return (
        loadingMore ? <View style={styles.spinner}>
            <Spinner size='medium' /> 
          </View>: null
      );
    }

    onPressProductList = (event, productInfo) => {
      this.props.navigation.navigate('ProductDetailNavigator', {
        screen: 'ProductScreen',
        params: productInfo.item
      });
    }

    render = () => {
      const currentCollectionHandle = this.props.route.params.handle;
        const { isProductListPageLoading, productList, pageSize, hasNextPage } = this.props;

        if( isProductListPageLoading ) {
          return (<View style={styles.spinner}>
            <Spinner size='medium' /> 
          </View>);
        } else {
          if(productList.length > 0){
            return (
                <List 
                  style = {styles.container}
                  contentContainerStyle = {styles.contentContainer}
                  data = {productList}
                  renderItem = {this.ProductCard}
                  onEndReachedThreshold = {0.5}
                  onEndReached = {() => hasNextPage ? this.props.handleMore(currentCollectionHandle, 'BEST_SELLING', false) : false}
                  ListFooterComponent = {this.ListFooter}
                />
            );
          } else {
            return (
              <View style={styles.noProducts}>
                <Text style={{textAlign: 'center'}}>No Products</Text>
              </View>
            );
          }
        }
    }
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
    paddingVertical: 4,
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
  },
  noProducts: {
    alignItems:'center', 
    flex:1, 
    justifyContent: 'center', 
  }
});

const mapStateToProps = (state) => {
  const {productReducer} = state;

  const { isProductListPageLoading, productList, hasNextPage, hasError, error, loadingMore, pageSize } = productReducer;

  return {
    isProductListPageLoading, 
    productList, 
    hasNextPage, 
    hasError, 
    error,
    loadingMore,
    pageSize
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getProductByCollectionHandle: (collectionHandle, sortBy, isInitial) => getProductByCollectionHandle(collectionHandle, sortBy, isInitial),
    handleMore: (collectionHandle, sortBy, isInitial) => getProductByCollectionHandle(collectionHandle, sortBy, isInitial)
  }, dispatch
);

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    withNavigationFocus)
  (ProductListScreen);