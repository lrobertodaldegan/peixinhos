import React from 'react';
import {
  TouchableHighlight,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';

export default function ImageButton({
                            action=()=>null, 
                            label='', 
                            img,
                            color=Colors.orange}) {
  return (
    <TouchableHighlight underlayColor={'transparent'} 
        style={[styles.wrap, {backgroundColor:color}]}
        onPress={action}>
      
      <View style={styles.subWrap}>
        <View style={styles.subWrap1}>
          <Image source={img} resizeMode='contain' style={styles.img}/>
        </View>
        <View style={styles.subWrap2}>
          <ButtonLabel value={label}/>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    padding:20,
    width:screen.width - 20,
    minHeight:50,
    borderRadius:25,
    borderWidth:4,
    borderColor:Colors.black,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    marginVertical:5
  },
  subWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  subWrap1:{
    width:screen.width * 0.25,
    height:screen.width * 0.35,
    alignItems:'center',
    justifyContent:'center',
  },
  subWrap2:{
    width:screen.width * 0.5,
    alignItems:'center',
    justifyContent:'center',
  },
  img:{
    maxWidth:screen.width * 0.25,
    height:screen.width * 0.35,
    marginRight:screen.width * 0.1,
    marginVertical:10,
  },
});