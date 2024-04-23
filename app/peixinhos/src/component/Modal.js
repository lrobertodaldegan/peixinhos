import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import ButtonLabel from './ButtonLabel';
import { Colors } from '../utils/Colors';

export default function Modal({onClose=()=>null, closable=true, content=<></>}){
  const renderClose = () => {
    if(closable === true){
      return (
        <TouchableHighlight underlayColor={'transparent'} 
            onPress={onClose}>
          <ButtonLabel value={'X'} size={30}/>
        </TouchableHighlight>
      );
    }

    return <></>
  }
  
  return (
    <View style={styles.wrap} elevation={5}>
      <View style={styles.subWrap}>
        <View style={styles.header}>
          {renderClose()}
        </View>

        <View style={styles.content}>
          {content}
        </View>
      </View>
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    position:'absolute',
    width:screen.width,
    height:screen.height,
    zIndex:7,
    backgroundColor:Colors.white,
    opacity:0.95,
    padding:10,
    alignItems:'center',
  },
  subWrap:{
    borderWidth:4,
    borderColor:Colors.offWhite,
    borderRadius:10,
    width:screen.width - 20,
    padding:10,
    backgroundColor:Colors.yellow,
    zIndex:10,
    marginTop:screen.height * 0.05
  },
  header:{
    alignItems:'flex-end',
    zIndex:11,
  },
  content:{
    alignItems:'center',
    justifyContent:'center',
    zIndex:11,
    maxHeight: screen.height * 0.8
  },
});