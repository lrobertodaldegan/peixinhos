import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';
import Label from './Label';

export default function CharacterResumeCard({character={}}) {

  return (
    <View style={styles.wrap}>
      <ImageBackground source={character.img} resizeMode='contain' 
          style={styles.img}/>

      <ButtonLabel value={character.name}/>

      <View style={styles.resume}>
        <Label value={character.resume} size={14}/>
      </View>
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    padding:10,
    width:screen.width - 20,
    borderRadius:25,
    borderWidth:4,
    borderColor:Colors.black,
    alignItems:'center',
    marginVertical:5,
    backgroundColor:Colors.blue,
  },
  img:{
    height:screen.height * 0.25,
    width:screen.height * 0.25,
    borderRadius:20,
    borderWidth:3,
    overflow:'hidden'
  },
  resume:{
    backgroundColor:Colors.white,
    borderRadius:10,
    borderWidth:3,
    padding:10,
    width:screen.width - 40,
    marginTop:10,
  },
});