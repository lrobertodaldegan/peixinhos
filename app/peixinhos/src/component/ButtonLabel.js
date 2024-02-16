import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

export default function ButtonLabel({value='', size=24}) {
  return (
    <Text style={[styles.lbl, {fontSize:size}]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  lbl:{
    fontFamily:'Kavoon-Regular',
    color:'#fff',
    textShadowColor:'#000',
    textShadowOffset:{width:2, height:2},
    textShadowRadius:1,
    marginTop:2
  },
});