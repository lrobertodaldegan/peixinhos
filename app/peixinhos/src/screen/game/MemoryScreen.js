import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';
import NavButton from '../../component/NavButton';
import { Texts } from '../../utils/Texts';
import Footer from '../../component/Footer';
import memoria from '../../assets/img/memoria/memoria_classico.png';
import memoriah from '../../assets/img/memoria/memoria_hist.png';
import ImageButton from '../../component/ImageButton';
import { Colors } from '../../utils/Colors';

export default function MemoryScreen({navigation}) {
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <NavButton label={Texts.Buttons.goBack}
          action={() => navigation.goBack()}/>

      <ImageButton img={memoria} label={Texts.Games.Modes.classic}
          action={() => navigation.navigate('MemoryGame', {mode:Texts.Games.Modes.classic})}/>

      <ImageButton img={memoriah} label={Texts.Games.Modes.histories}
          color={Colors.blue}
          action={() => navigation.navigate('MemoryGame', {mode:Texts.Games.Modes.histories})}/>
        
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
});