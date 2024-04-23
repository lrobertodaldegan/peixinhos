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

export default function ListItemButton({
                          action=()=>null, 
                          label='', 
                          labelSize=16,
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
    width:screen.width * 0.33,
    height:50,
    borderRadius:25,
    borderWidth:4,
    borderColor:Colors.black,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:5,
    marginHorizontal:5
  },
});