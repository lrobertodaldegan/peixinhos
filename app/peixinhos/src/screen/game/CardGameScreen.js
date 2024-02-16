import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';

export default function CardGameScreen({navigation}) {
  return (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

      </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width: screen.width,
    height:screen.height
  },
});