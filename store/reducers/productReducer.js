/*
    - Using this reducer to manage all the product related information
    - For Category List / Category Detail / Product List / Search and Product Detail Page Module.
*/

import { UPDATE_PRODUCT_LIST, IS_PRODUCT_PAGE_LOADING } from '../../constants/ActionTypes';

const initialState = {
    isProductListPageLoading: true,
    productsModel: {},
    productList: [],
    hasNextPage: false,
    hasError: false,
    error: '',
    loadingMore: true,
    pageSize: 0
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_LIST: 
            return {
                ...state,
                ...action.payload
            }
        case IS_PRODUCT_PAGE_LOADING:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default productReducer;