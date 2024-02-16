import React from 'react';
import {
  TouchableHighlight,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';

export default function SimpleButton({action=()=>null, label=''}) {
  return (
    <TouchableHighlight underlayColor={'transparent'} 
        style={[styles.wrap]}
        onPress={action}>
      <Label selectable={true} value={label} size={18}/>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
    marginVertical:5
  },
});