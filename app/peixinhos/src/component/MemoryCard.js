import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { Colors } from '../utils/Colors';
import ButtonLabel from './ButtonLabel';
import logo from '../assets/img/logo.png';
import { Texts } from '../utils/Texts';
import Label from './Label';
import maximize from '../assets/img/maximize.png';

export default function MemoryCard({
                              item, 
                              width, 
                              mode=Texts.Games.Modes.classic, 
                              show=false, 
                              onPress=()=>null,
                              onMaximize=()=>null,
                            }) {
 
  let stl = {width:width, height:width - 15};
  let stlWrap = {width:width, height:width + 40};

  let content = (
    <View style={[styles.cardShow, stlWrap]}>
      <ImageBackground source={item.character.img} 
          resizeMode='contain'
          style={[styles.cardImg, stl]}/>

      <ButtonLabel value={item.character.name} 
          style={styles.charLbl}
          size={14}/>
    </View>
  );

  if(mode === Texts.Games.Modes.histories){
    let hs = {width:stlWrap.width - 20, maxHeight:stlWrap.height - 20};

    content = (
      <View style={[styles.cardShow, stlWrap, {padding:5, alignItems:'flex-end'}]}>
        <View style={[styles.resumeWrap, hs]}>
          <TouchableHighlight underlayColor={Colors.orange}
              onPress={onMaximize}>
            <ImageBackground source={maximize} resizeMode='contain'
                style={styles.hsimg}/>
          </TouchableHighlight>

          <Label value={item.character.resume} size={10}/>
        </View>
      </View>
    );
  }

  if(show === true){
    return content;
  } else {
    return (
      <TouchableHighlight underlayColor={Colors.blue}
          onPress={() => onPress(item)}
          style={[styles.card, stlWrap]}>
        <ImageBackground source={logo} 
            resizeMode='contain'
            style={[styles.cardImg, stl]}/>
      </TouchableHighlight>
    );
  }
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  card:{
    width:((screen.width - 40) * 0.5),
    height:50,//screen.height * 0.3,
    borderWidth:4,
    borderRadius:10,
    backgroundColor:Colors.blue,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  cardShow:{
    width:((screen.width - 40) * 0.5),
    height:50,//screen.height * 0.3,
    borderWidth:4,
    borderRadius:10,
    backgroundColor:Colors.orange,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  cardImg:{
    borderRadius:20,
  },
  charLbl:{
    textAlign:'center',
    marginTop:10,
    marginHorizontal:5
  },
  resumeWrap:{
    backgroundColor:Colors.white,
    borderRadius:5,
    zIndex:10,
    alignItems:'flex-end',
    overflow:'hidden',
  },
  hsimg:{
    width:30, 
    height:30,
    marginBottom:5,
    zIndex:12,
    backgroundColor:Colors.orange,
    borderBottomLeftRadius:5
  },
  resumeLbl:{
    margin:2
  },
});