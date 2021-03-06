import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { HeaderButtons , Item } from "react-navigation-header-buttons";
import headerButton from "./headerButton";
import { Avatar, Badge, withBadge } from 'react-native-elements';
import {connect} from "react-redux";
 
class cart extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title : "Items in Cart",
    }
  }
  state = {
    itemsInCart : null,
    itemsCount : -1,
  }
  componentDidMount = ()=>{
    this.getItemsCount();
  }
  getItemsCount = ()=>{ 
    let Items = this.props.cartItems.cartItems.map(
      (item)=>{
        return item
      }
    );
    this.setState({
      itemsInCart : Items,
      itemsCount : this.props.itemsCount.itemsCount
    });
  }
  loadBooks = (book)=>{
    return (
      <View>
        <View style={styles.productMain}>
          <View style={styles.style1}>
            <Image style={styles.style2} 
              source={{uri : book.item.image}} />
          </View>
          <View style={styles.style3}>
            <View style={{overFlow:"hidden"}}>
              <Text numberOfLines={1} style={styles.text}>{book.item.title}</Text>
            </View>
              <Text style={styles.text}>Price : Rs.{book.item.Price}</Text>
            <View style={{flexDirection:"row",marginVertical:5}}>
              {book.item.quantity > 1 ? 
                <TouchableOpacity onPress={
                  ()=>{
                    this.props.decreaseQuantity(book.item.id);
                    setTimeout(this.getItemsCount,1000);
                  }
                }> 
                  <Icon  name="minussquareo" size={25} color="black" style={{marginRight:10, marginTop:2}} />
                </TouchableOpacity>
                : <TouchableOpacity disabled={true} onPress={
                    ()=>{
                      this.props.decreaseQuantity(book.item.id);
                      setTimeout(this.getItemsCount,1000);
                    }
                  }> 
                    <Icon name="minussquareo" size={25} color="gray" style={{marginRight:10, marginTop:2}} />
                  </TouchableOpacity>
              }
              <Text style={{fontSize:20, }}>
                {book.item.quantity}
              </Text>
              <TouchableOpacity onPress={
                ()=>{
                  this.props.increaseQuantity(book.item.id);
                  setTimeout(this.getItemsCount,1000);
                }
              }>
                <Icon name="plussquareo" size={25} color="black" style={{marginLeft:10, marginTop:2}} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={
                  ()=>{
                    this.props.deleteItem(book.item.id);
                    setTimeout(this.getItemsCount,1000);
                  }
                }
                style={styles.style4}>
                <FontAwesome name="trash" size={25} color="red"  />
              </TouchableOpacity>
            </View>            
          </View>
        </View>
      </View>
    )
  }
  render() {
    if(this.state.itemsCount<=0){
      return (
        <View style={styles.main}>
         <NavigationEvents
            onDidFocus={() => {
              this.getItemsCount()
            }}
          />
          <Text>You Have No Items in Your Cart.</Text>
        </View>
      )
    }
    else{      
      return (
        <View style={styles.main}>
          <NavigationEvents
            onDidFocus={() => {
              this.getItemsCount()
            }}
          />
               <FlatList data={this.state.itemsInCart} renderItem={
                this.loadBooks
                }
              />
              <TouchableOpacity style={styles.button}
                onPress={()=>{this.props.navigation.navigate("location")}}
              >
                <Text style={{color:"black", fontSize:20, textAlign: 'center'}}>Detect Location</ Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1}
                onPress={()=>{
                  Alert.alert(
                    "Order Placed!",
                    "Thanks for Ordering. Order will be sent to your address in 2-5 business days. \n\nPayment Mode: Cash On Delivery!",
                    [{onPress: () =>this.props.navigation.navigate("categoriesColumn")}]
                  );
                  this.props.orderPlaced();
                  setTimeout(this.getItemsCount,1000);
                }}
              >
                <Text style={styles.style5}>Order Now</ Text>
              </TouchableOpacity>
        </View>
      )
    }
  }
}
const mapStateToProps = (state)=>{
  return {
    cartItems : state.cartItems,
    itemsCount : state.itemsCount,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    deleteItem : (itemData)=>{
      dispatch({
        type : "DELETE_ITEM",
        item : itemData
      });
    },
    decreaseQuantity : (itemData)=>{
      dispatch({
        type : "DECREASE_QUANTITY",
        item : itemData
      });
    },
    increaseQuantity : (itemData)=>{
      dispatch({
        type : "INCREASE_QUANTITY",
        item : itemData
      });
    },
    orderPlaced : ()=>{
      dispatch({
        type : "ORDER_PLACED",
      });
    },
  }
}
const styles = StyleSheet.create({
  main: {
    flex : 1,
    padding : 10,
    alignItems:"center", 
  },
  style1: {
    width:"35%", 
    height:130 
  },
  style2: {
    width : "100%", 
    height:"95%", 
    resizeMode:"contain", 
    borderRadius:5
  },
  style3: {
    justifyContent: "space-around", 
    alignContent:"center",   
    marginLeft:20
  },  
  style4: {
    flexDirection:"row", 
    marginLeft:"30%",
    justifyContent:"space-between", 
    alignItems:"flex-end"
  },
  style5: {
    color:"white", 
    fontSize:20, 
    textAlign: 'center'
  },
  button: {
    justifyContent:"center", 
    alignItems:"center", 
    padding:10 ,
    width:"90%", 
    backgroundColor:"#FDD835",
    borderRadius:3,
    marginBottom:20
  },
  button1: {
    justifyContent:"center", 
    alignItems:"center", 
    padding:10 ,
    width:"90%", 
    backgroundColor:"#FF543C",
    borderRadius:3,
    marginBottom:20
  },
  bookMain :{
    marginTop:10,
    width : "100%",
    height:500,
    borderColor:"black", 
    borderWidth:1,
    borderRadius : 5
  },
  productMain: {
    flexDirection:"row", 
    justifyContent:"flex-start", 
    borderBottomColor:"gray",
    borderBottomWidth:1,
    marginBottom:5
  },
  text : {
      color:"black",
      fontFamily : "halfmoon_bold",
      fontSize: 15,
      fontWeight:"bold",
      overflow:"hidden",
      width:"90%",
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(cart);