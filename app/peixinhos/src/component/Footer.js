import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';

export default function Footer() {
  return (
    <View style={styles.wrap}>
      <Label value='@lucasrobertodev'/>
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    position:'absolute',
    bottom:50,
    paddingVertical:3,
    paddingHorizontal:5,
    minWidth:screen.width * 0.3,
    borderRadius:25,
    borderWidth:3,
    borderColor:Colors.black,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:5,
    backgroundColor:Colors.white,
  },
});