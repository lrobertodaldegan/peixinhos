import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors } from '../utils/Colors';

export default function Label({value='', size=12, align='justify', selectable=false}) {
  return (
    <Text selectable={selectable} 
        selectionColor={Colors.orange}
        style={[styles.lbl, {fontSize:size, textAlign:align}]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  lbl:{
    fontFamily:'EncodeSans-Medium',
    color:Colors.black,
    margin:1
  },
});