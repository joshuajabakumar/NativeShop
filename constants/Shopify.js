import Client from 'shopify-buy';
import GraphQLClient from 'graphql-js-client';

import typeBundle from './TypeBundle';

/*
    Sample Store Details
    URL: https://graphql.myshopify.com/api/graphql,
    Token: dd4d4dc146542ba7763305d71d1b3d38
*/

export const Shopify = Client.buildClient({
    storefrontAccessToken: 'c3b7910c3c5cec4c63911bf5e691db3a',
    domain: 'klosmic.myshopify.com'
});

export const ShopifyGQL = new GraphQLClient(typeBundle, {
    url: 'https://klosmic.myshopify.com/api/graphql',
    fetcherOptions: {
      headers: {
        'X-Shopify-Storefront-Access-Token': 'c3b7910c3c5cec4c63911bf5e691db3a'
      }
    }
});

export const ShopifyXHR = (payload, state = {}) => {

    return new Promise((resolve, reject) => {
        const endPointURL = `https://klosmic.myshopify.com/api/graphql`;
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    // Success Data
                    var data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    // API Failed
                    reject(new Error({error: `API has been failed`, isError: true}));
                }
            }
        }

        xhr.open("POST", endPointURL, true);
        xhr.setRequestHeader('Content-Type','application/graphql');
        xhr.setRequestHeader('X-Shopify-Storefront-Access-Token','c3b7910c3c5cec4c63911bf5e691db3a');

        xhr.send(payload);
    });

}

/* Alternative API CALL Method */
// Second Query;
// Build a custom products query using the unoptimized version of the SDK

// import Client from 'shopify-buy/index.unoptimized.umd';

// const productsQuery = Shopify.graphQLClient.query((root) => {
//     root.addConnection('products', {args: {first: 10}}, (product) => {
//         product.add('title');
//         product.add('tags');// Add fields to be returned
//     });
// });

// console.log(productsQuery);

// // Call the send method with the custom products query
// Shopify.graphQLClient.send(query).then(({model, data}) => {
// // Do something with the products
// console.log(model);
// });