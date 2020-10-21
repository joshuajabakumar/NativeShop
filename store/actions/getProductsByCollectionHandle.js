import { IS_PRODUCT_PAGE_LOADING, UPDATE_PRODUCT_LIST, PRODUCT_LIST_HAS_ERROR } from '../../constants/ActionTypes';
import { ShopifyXHR, Shopify } from '../../constants/Shopify';

const getProductsByCollectionHandle = (collectionHandle, sortBy='BEST_SELLING', isInitial) => {
    return (dispatch, getState) => {

        // Take Previous Page load
        let currentProductList = getState().productReducer.productList;
        let productsModel = getState().productReducer.productsModel;
        let lastItemCursor;

        if(currentProductList.length > 1){
            lastItemCursor = currentProductList[ currentProductList.length - 1 ].cursor;
        }

        if(isInitial){

            // Turn on Page Loader
            dispatch({
                type: IS_PRODUCT_PAGE_LOADING,
                payload: {
                    isProductListPageLoading: true
                }
            });

            // Empty old product list
            dispatch({
                type: UPDATE_PRODUCT_LIST,
                payload: {
                    productList: [],
                }
            });

            
            Shopify.collection.fetchByHandle(collectionHandle, {productsFirst: 10, sortKey: sortBy }).then((result) => {

                let newProductsModel = result.products;
                let newProductList = currentProductList.concat(result.products);

                const hasNextPage  = result.products[result.products.length - 1].hasNextPage;

                if(hasNextPage === false) {
                    dispatch({
                        type: UPDATE_PRODUCT_LIST,
                        payload: {
                            loadingMore: false,
                            productsModel: newProductsModel
                        }
                    });
                }

                return dispatch({
                    type: UPDATE_PRODUCT_LIST,
                    payload: {
                        productsModel: newProductsModel,
                        productList: newProductList,
                        hasNextPage: hasNextPage
                    }
                });

            }).finally(() => {
                // Turn off the Page Loader
                if(isInitial){
                    return dispatch({
                        type: IS_PRODUCT_PAGE_LOADING,
                        payload: {
                            isProductListPageLoading: false
                        }
                    });
                }
            });
        } else {
            // Load More Products Call
            Shopify.fetchNextPage(productsModel).then((result)=> {
                console.log(result);

                let newProductsModel = result.model;
                let newProductList = currentProductList.concat(result.model);

                const hasNextPage  = result.data.node.products.pageInfo.hasNextPage;

                if(hasNextPage === false) {
                    dispatch({
                        type: UPDATE_PRODUCT_LIST,
                        payload: {
                            loadingMore: false,
                            productsModel: newProductsModel
                        }
                    });
                }

                return dispatch({
                    type: UPDATE_PRODUCT_LIST,
                    payload: {
                        productsModel: newProductsModel,
                        productList: newProductList,
                        hasNextPage: hasNextPage
                    }
                });
            }).finally(() => {
                // Turn off the Page Loader
                if(isInitial){
                    return dispatch({
                        type: IS_PRODUCT_PAGE_LOADING,
                        payload: {
                            isProductListPageLoading: false
                        }
                    });
                }
            });
        }
    }
}

export default getProductsByCollectionHandle;