import React, {useState} from 'react';
import {
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';

export default function BibleBookLabel({
                                abrev='', 
                                value='', 
                                color=Colors.white, 
                                onSelect=()=>null}) {

  return (
    <TouchableHighlight key={abrev}
        underlayColor='transparent'
        style={styles.booksLblWrap}
        onPress={onSelect}>

      <ButtonLabel size={18}
          key={value} 
          color={color}
          value={value}
      />
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  booksLblWrap:{
    width:(screen.width - 20) * 0.45,
    alignItems:'center',
    marginVertical:2
  }
});