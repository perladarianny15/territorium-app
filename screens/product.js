import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Platform, Text,TouchableOpacity, Linking, Share, LogBox,StyleSheet,
  View, Dimensions, Image, ActivityIndicator, } from 'react-native';
import { deviceHeight, deviceWidth } from '../constants/constants';
import BottomContainer from '../components/BottomContainer';
import ImageContainer from '../components/ImageContainer';
import Colors from "../constants/Colors";
import FontAwasome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';

export default class ProductScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      price: null,
      image: null,
      brand: null,
      photos: [],
      isLoading: false,
      scrollY: new Animated.Value(0)

    };
  }
  
  componentDidMount = () => {

      this._loadLandingData();
  };

  _renderItem = ({item, index}) => {
    return (
        <View style={styles.slide}>
         <Image source={{uri:item}} style={styles.imageStyle} />
        </View>
    );
  }

  _loadLandingData = async() => {
    try {

        return fetch('https://dummyjson.com/products/' + this.props.route.params.product_id, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                title: responseJson.title,
                description: responseJson.description,
                price: responseJson.price,
                image: responseJson.thumbnail,
                brand: responseJson.brand,
                photos: responseJson.images
            })
            
        })
        .catch((error) => {
            console.error(error);
        });
  
      } catch (err) {
         console.log(err)
      }
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
           <View style={[styles.container]}>
              <StatusBar barStyle='light-content' backgroundColor='transparent' translucent={true} />
              <SafeAreaView>
                <View style={{ height: Platform.OS === 'android' ? getStatusBarHeight() : 0 }}>
                </View>
                <ImageContainer
                  scrollY={this.state.scrollY}
                  imageSource={this.state.image}
                  imageHeight={450}
                />

                <BottomContainer
                  scrollY={this.state.scrollY}
                  imageHeight={450}>
                
                <View style={{marginTop:20, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:30}}>{this.state.title}</Text>
                      
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={{flex:0.2}}></View>
                  <View style={{flex:0.8}}>
                    <Text style={{color:'#507ED8', fontWeight:'700', fontSize:16, marginTop:5}}>
                         {this.state.brand}
                      </Text>
                  </View>
                  
                </View>
                
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex:0.2}}>
                      <FontAwasome 
                          name="mobile"
                          color={Colors.purplePrimary}
                          size={40}
                          style={{paddingTop:20, paddingLeft:30}}
                      />
                  </View>
                  <View style={{flex:0.8}}>
                      <Text style={{color:'#737C8B', fontWeight:'700', fontSize:12, marginTop:10}}>
                        Description:
                      </Text>
                    <Text style={{color:'#737C8B', fontWeight:'700', fontSize:16, marginTop:5}}>
                        {this.state.description}
                      </Text>
                  </View>
                  
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex:0.2}}>
                      <FontAwasome 
                          name="money"
                          color={Colors.purplePrimary}
                          size={40}
                          style={{paddingTop:20, paddingLeft:20}}
                      />
                  </View>
                  <View style={{flex:0.8}}>
                      <Text style={{color:'#737C8B', fontWeight:'700', fontSize:12, marginTop:10}}>
                        Price:
                      </Text>
                    <Text style={{color:'#737C8B', fontWeight:'700', fontSize:16, marginTop:5}}>
                        $ {this.state.price}
                      </Text>
                  </View>
                  
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>

                  <Text style={{fontSize:16, marginBottom:30, color:'#507ED8'}}>Images</Text>
                  <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.photos}
                      renderItem={this._renderItem}
                      sliderWidth={400}
                      itemWidth={300}
                    />
                </View>
                
                </BottomContainer>
                
              </SafeAreaView>
          </View>
      );
    }
  }
}

const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

const styles = StyleSheet.create({
  baseText: {
    marginLeft: 20,
    fontSize:16
  },
  imageStyle: {
    width: dimensions.fullWidth,
    height: 200,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "500",
  },
  subtitleText: {
    flexDirection:"row",
    marginTop:5,
    marginBottom:5

  },
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    height: deviceHeight,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  datatext:{marginLeft:40},
  subtitleDescription:{
    color:Colors.primary,
    marginTop:5,
    fontSize:17
  },
  options:{color: Colors.primary, fontSize:17, fontWeight:'500', marginLeft:10},
  btncontainer: {justifyContent:'center', alignItems:'center', height:30},
  imageStyle: {
    width: 300,
    height:350,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

  },

});
