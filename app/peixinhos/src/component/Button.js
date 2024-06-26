import React from 'react';
import {
  View,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';

export default function Button({
                          action=()=>null, 
                          label='', 
                          labelSize=24,
                          color=Colors.orange,
                          style={},
                          loading=false,
                        }) {
  if(loading === true){
    return (
      <View style={[styles.wrap, style, {backgroundColor:color}]}>
        <ActivityIndicator color={Colors.white} size={30}/>
      </View>
    );
  } else {
    return (
      <TouchableHighlight underlayColor={color} 
          style={[styles.wrap, style, {backgroundColor:color}]}
          onPress={action}>
        <ButtonLabel value={label} size={labelSize}/>
      </TouchableHighlight>
    );
  }
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
    justifyContent:'center',
    marginVertical:5
  },
});