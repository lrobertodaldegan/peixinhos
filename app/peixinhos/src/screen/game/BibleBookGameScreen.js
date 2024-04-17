import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';
import Footer from '../../component/Footer';
import BibleBookGame from '../../component/game/BibleBookGame';

export default function BibleBookGameScreen({navigation}) {
  
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

      <BibleBookGame navigation={navigation}/>

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