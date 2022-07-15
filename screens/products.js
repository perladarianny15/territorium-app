import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native';
import Colors from "../constants/Colors";

export default class ProductScreen extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            data: [],
            chart_counter : null
        };
    }

    async componentDidMount() { 
        this.getProducts();
    }


  getProducts = async() => {
    try {

      return fetch('https://dummyjson.com/products', {
          method: 'GET',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
              data: responseJson.products
          })
      })
      .catch((error) => {
          console.error(error);
      });

    } catch (err) {
       console.log(err)
    }
  }

  addProductToChart = () => {

  }

    render () {
        
        return (
            <SafeAreaView style={styles.container}>  

                <ImageBackground
                        style={styles.coverImage}
                        source={require('../assets/banner.jpg')}>
                        <View style={styles.textView}>
                            <Text style={{color:'#FFFFFF', fontSize:14, marginLeft:30}}>NUEVO CURSO</Text>
                            <Text style={styles.imageText}>TÉCNICAS DE ILUSTRACIÓN PARA LIBROS INFANTILES</Text>
                            <Text style={{color:'#FFFFFF', fontSize:14, marginLeft:30, marginTop:20}}>Ver más</Text>
                        </View>
                    </ImageBackground>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                    return <TouchableOpacity       
                    onPress={() => this.props.navigation.navigate("Product", {
                        product_id: item.id})}>
                            <View style={styles.card}  key={index}>
                                    
                                <Image source={{uri:item.thumbnail}} style={styles.imageStyle} />
                                
                                <View>
                                    <Text style={{ fontSize: 10, marginLeft: 9, color:'#507ED8', marginTop:8 }}>
                                        {item.category}
                                    </Text>
                                    <Text style={{ fontSize: 16, marginLeft: 9, color:'#373E4A', marginTop:2 }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{ fontSize: 12, marginLeft: 9, color:'#737C8B', marginTop:2,paddingRight:10 }}>
                                        {item.description}

                                    </Text>
                                    <Text style={{ fontSize: 14, marginLeft: 9, color:'#507ED8', marginTop:2 }}>
                                        + Add to cart
                                    </Text>
                                </View>
                                <View style={{flexDirection:'row-reverse'}}>
                                    <Text style={{ fontSize: 18, marginLeft: 9, color:'#373E4A', marginRight:10 }}>
                                        $ {item.price}

                                    </Text>
                                </View>
   
                            </View>
                    </TouchableOpacity>
                    }
                    }
                  />
            </SafeAreaView>
          );
    }
}

const {height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height
      },
      coverImage: {
        width: '100%',
        height: 200,
      },
      textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'start',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      imageText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft:30
      },
      searcIcon: {
        color: Colors.primary,
      },
      groupedTitle: {
        flexDirection: "row",
      },
    
      card: {
        width: 300,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop:15,
        marginBottom:10,
        paddingBottom:20,
        marginHorizontal:40, 
        marginVertical:40, 
    
      },
      imageStyle: {
        width: 300,
        height:120,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

      },
      iconStyle: {
        height: 56,
        width: 56,
        borderRadius: 40,
      },
});