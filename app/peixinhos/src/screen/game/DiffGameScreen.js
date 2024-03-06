import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';
import DiffGame from '../../component/game/DiffGame';

export default function DiffGameScreen({navigation}) {
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <DiffGame navigation={navigation}/>
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width: screen.width,
    height:screen.height,
    padding:10
  },
});