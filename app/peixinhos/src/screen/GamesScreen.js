import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import GamesMenu from '../component/GamesMenu';
import NavButton from '../component/NavButton';
import { Texts } from '../utils/Texts';
import Footer from '../component/Footer';

export default function GamesScreen({navigation}) {
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <NavButton label={Texts.Buttons.goBack}
          action={() => navigation.goBack()}/>

      <ScrollView style={styles.textWrap}>
        <GamesMenu navigation={navigation}/>

        <View style={{height:100}}/>
      </ScrollView>
        
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
    paddingVertical:20
  },
  textWrap:{
    maxHeight:screen.height * 0.9
  }
});