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
import sp from '../../assets/img/cards/1p.png';
import mp from '../../assets/img/cards/2p.png';
import ImageButton from '../../component/ImageButton';
import { Colors } from '../../utils/Colors';

export default function CardScreen({navigation}) {
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <NavButton label={Texts.Buttons.goBack}
        action={() => navigation.goBack()}/>

      <ImageButton img={sp} label={Texts.Games.Modes.single}
          action={() => navigation.navigate('CardGame', {mode:Texts.Games.Modes.single})}/>

      <ImageButton img={mp} label={Texts.Games.Modes.multiple}
          color={Colors.blue}
          action={() => navigation.navigate('CardGame', {mode:Texts.Games.Modes.multiple})}/>
      
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