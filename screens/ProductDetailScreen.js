import * as React from 'react';
import { withNavigationFocus } from '@react-navigation/compat';

import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { SafeAreaView, ScrollView, Dimensions, StyleSheet, Platform } from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators, compose} from 'redux';

import { View } from '../components/Themed';
import { Layout, Text, Card, List, Spinner, Select, SelectItem } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window')

class ProductDetailScreen extends React.Component {
    constructor(props){
        super(props);

        let defaultOptionValues = {};
        props.route.params.options.forEach((selector) => {
            defaultOptionValues[selector.name] = selector.values[0].value;
        });
        this.state = { 
            selectedOptions: defaultOptionValues,
            selectedIndex: '',
            selectedValue: '' 
        };

    }

    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text>
            </View>
        );
    }

    buildCarouselEntries(){
        const entries = [];
        const { images } = this.props.route.params;

        if( images.length > 0 ){
            images.map((img) => {
                entries.push({
                    title: '',
                    subtitle: '',
                    illustration: img.src
                });
            });
        }

        return entries;
    }

    handleOptionChange = (index, optionName) => {
        const { options } = this.props.route.params;
        console.log(index.row);
        console.log(optionName);
        console.log('Inside handleOptionChange 4...');
        let option = options.find(opt => opt.name === optionName);
        //console.log(option.values);
        this.setState({
            selectedIndex: index,
            selectedValue: option.values[index.row+1].Scalar.value
        });
    }

    render() {
        const { title, description, images, variants, options } = this.props.route.params;
        const entries = this.buildCarouselEntries();

        let variantImage = this.state.selectedVariantImage || images[0];
        let variant = this.state.selectedVariant || variants[0];
        let variantQuantity = this.state.selectedVariantQuantity || 1;

        let variantSelectors = options.map((option) => {
            return(
                <React.Fragment key={option.name}> 
                    <Text category='s2'>{option.name}</Text>
                    <Select
                        selectedIndex={this.state.selectedValue}
                        onSelect={(index) => {
                            console.log(index);
                            this.handleOptionChange(index, option.name);
                        }}>
                        {option.values.map((value) => {
                            return (
                                <SelectItem title={value.value} key={`${option.name}-${value}`}/>
                            );
                        })}
                    </Select>
                </React.Fragment>
            );
        });

        return(
            <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                { entries.length > 0 ?
                    <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={entries}
                        renderItem={this._renderItem}
                        hasParallaxImages={true}
                    /> : <Text>No Images Available</Text>               
                }
                <Text category='h2'>{title}</Text>
                <Text category='s1'>{description}</Text>

                {/* Product Options */}
                {variantSelectors}
                {/* Product Price */}
                {/* Add to Cart */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    scrollView: {
        flex: 1,
        //flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    item: {
      width: screenWidth - 60,
      height: screenWidth - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
});

const mapStateToProps = (state) => {
    const {productReducer} = state;

    const {  } = productReducer;

    return {

    };
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        getProductByCollectionHandle: (collectionHandle, sortBy, isInitial) => getProductByCollectionHandle(collectionHandle, sortBy, isInitial),
    }, dispatch
);

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigationFocus)(ProductDetailScreen);