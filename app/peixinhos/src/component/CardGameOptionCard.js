import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';

export default function CardGameOptionCard({ 
                                      item={}, 
                                      flipped=false,
                                      block=false,
                                      onPress=(item)=> null
                                    }) {
  const handlePress = () => {
    if(block === false)
      onPress(item?.card);
  }

  return (
    <TouchableHighlight underlayColor='rgba(0,0,0,0.5)'
        onPress={() => handlePress()}
        style={[
            styles.wrap, 
            flipped === true ? {transform:'rotateZ(180deg)'} : {}]}>
      <>
        <ButtonLabel value={''} size={14}
            style={styles.lbl}/>

        <ImageBackground source={item?.card?.img} resizeMode='contain' 
            style={[styles.img]}/>
      </>    
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    borderColor:Colors.black,
    alignItems:'center',
    marginTop:5,
  },
  lbl:{
    marginBottom:5
  },
  img:{
    height:screen.height * 0.25,
    width:screen.height * 0.25,
  },
});