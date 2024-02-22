import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors} from '../utils/Colors';

export default function ButtonLabel({
                                value='', 
                                size=24, 
                                color=Colors.white,
                                style={}
                              }) {
  return (
    <Text style={[styles.lbl, {fontSize:size, color:color}, style]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  lbl:{
    fontFamily:'Kavoon-Regular',
    textShadowColor:'#000',
    textShadowOffset:{width:2, height:2},
    textShadowRadius:1,
    marginTop:2
  },
});