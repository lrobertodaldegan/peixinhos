import React from 'react';
import {
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';

export default function Button({action=()=>null, label='', color=Colors.orange}) {
  return (
    <TouchableHighlight underlayColor={color} 
        style={[styles.wrap, {backgroundColor:color}]}
        onPress={action}>
      <ButtonLabel value={label}/>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    paddingHorizontal:30,
    minWidth:screen.width * 0.5,
    minHeight:50,
    borderRadius:25,
    borderWidth:4,
    borderColor:Colors.black,
    alignItems:'center',
    marginVertical:5
  },
});