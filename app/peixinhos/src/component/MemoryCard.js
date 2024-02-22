import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { Colors } from '../utils/Colors';
import ButtonLabel from './ButtonLabel';
import logo from '../assets/img/logo.png';

export default function MemoryCard({item, width, show=false, onPress=()=>null}) {
 
  let stl = {width:width, height:width - 15};
  let stlWrap = {width:width, height:width + 40};

  if(show === true){
    return (
      <View style={[styles.cardShow, stlWrap]}>
        <ImageBackground source={item.character.img} 
            resizeMode='contain'
            style={[styles.cardImg, stl]}/>
  
        <ButtonLabel value={item.character.name} 
            style={styles.charLbl}
            size={14}/>
      </View>
    );
  } else {
    return (
      <TouchableHighlight underlayColor={Colors.blue}
          onPress={() => onPress(item)}
          style={[styles.card, stlWrap]}>
        <ImageBackground source={logo} 
            resizeMode='contain'
            style={[styles.cardImg, stl]}/>
      </TouchableHighlight>
    );
  }
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  card:{
    width:((screen.width - 40) * 0.5),
    height:50,//screen.height * 0.3,
    borderWidth:4,
    borderRadius:10,
    backgroundColor:Colors.blue,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  cardShow:{
    width:((screen.width - 40) * 0.5),
    height:50,//screen.height * 0.3,
    borderWidth:4,
    borderRadius:10,
    backgroundColor:Colors.orange,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  cardImg:{
    borderRadius:20,
  },
  charLbl:{
    textAlign:'center',
    marginTop:10,
    marginHorizontal:5
  },
});