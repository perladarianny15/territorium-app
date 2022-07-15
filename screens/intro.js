import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native';
import Colors from "../constants/Colors";

export default class IntroScreen extends React.Component{

    constructor(props){
        super(props);
    }

    nextScreen = () => {
        this.props.navigation.navigate("ProductList");        
    }

    render () {
        
        return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Animatable.Image 
                        animation="swing"
                        duraton="1500"
                    source={require('../assets/logo.png')}
                    resizeMode="contain"
                    style={{width:250, height:250}}
                    />
            </View>
            <Animatable.View 
                style={[styles.footer]}
                animation="pulse">
                <SafeAreaView>
                <Text style={styles.titleStyle}>
                    Mejorando los resultados de la educación para todos
                </Text>
                <Text style={styles.paragraphStyle}>
                    El ecosistema de medición y seguimiento de educación de Territorium 
                    ofrece una experiencia orientada a resultados para estudiantes de todas las edades. 
                </Text>
                <View style={{flexDirection:'row-reverse', marginTop:10}}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.nextScreen}>
                            <View
                                style={styles.signIn}>
                                <Text style={styles.textSign}>
                                    Iniciar experiencia
                                </Text>
                                <MaterialIcons 
                                    name="navigate-next"
                                    color="#FFF"
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                        </View>
                </SafeAreaView>
            </Animatable.View>
        </View>
        );
    }
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.purplePrimary
  },
  header: {
      flex: 1.2,
      justifyContent: 'center',
      alignItems: 'center'
  },

  footer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 150,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  
  title: {
      color: '#05375a',
      fontSize: 19,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 5
  },
  signIn: {
      paddingLeft:15,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor:Colors.purplePrimary,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
   
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 12,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});