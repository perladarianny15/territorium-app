import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "./screens/intro";
import ProductListScreen from "./screens/products";
import ProductScreen from "./screens/product";

import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();

const GradientHeader = props => (
  <View style={{ backgroundColor: '#fff' }}>
      <LinearGradient
        colors={['#25568D', '#833197']}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        style={[StyleSheet.absoluteFill, { height:60}]}
      >
      </LinearGradient>
    </View>
  )

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Territorium" >
        <Stack.Screen name="Territorium"  options={{title:'', headerShown: false }} component={IntroScreen} />
        <Stack.Screen name="ProductList" options={{
          title:'List',
          headerBackground: (props) => ( 
            <GradientHeader/>
          ),
          headerTitle: (props) => ( 
            <Image
              style={{ width: 120, height: 50 }}
              source={require('./assets/logo.png')}
              resizeMode='contain'
            />
          ),
        }} component={ProductListScreen} />
        <Stack.Screen name="Product"  options={{
          headerBackground: (props) => ( 
            <GradientHeader/>
          ),
          headerTitle: (props) => ( 
            <Image
              style={{ width: 120, height: 50 }}
              source={require('./assets/logo.png')}
              resizeMode='contain'
            />
          ),
        }}  component={ProductScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
