import React from 'react';
import {
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import ButtonLabel from './ButtonLabel';

export default function NavButton({action=()=>null, label=''}) {
  return (
    <TouchableHighlight underlayColor={'transparent'} 
        style={[styles.wrap]}
        onPress={action}>
      <ButtonLabel value={label} size={20}/>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    alignItems:'flex-start',
    marginVertical:10,
    width:screen.width - 20
  },
});