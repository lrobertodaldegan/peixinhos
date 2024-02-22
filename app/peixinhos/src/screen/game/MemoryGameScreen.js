import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';
import Footer from '../../component/Footer';
import MemoryGame from '../../component/game/MemoryGame';

export default function MemoryGameScreen({navigation, route}) {
  
  const {mode} = route.params;
  
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

      <MemoryGame mode={mode} navigation={navigation}/>

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