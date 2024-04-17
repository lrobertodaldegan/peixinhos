import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';
import Footer from '../../component/Footer';
import WordsGame from '../../component/game/WordsGame';

export default function WordsGameScreen({navigation}) {
  
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

      <WordsGame navigation={navigation}/>

      <Footer />
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width: screen.width,
    height:screen.height,
    alignItems:'center',
    paddingTop:40,
  },
});