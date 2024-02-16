import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import logo from '../assets/img/logo.png';
import Footer from '../component/Footer';
import Label from '../component/Label';
import NavButton from '../component/NavButton';
import SimpleButton from '../component/SimpleButton';
import { Links } from '../utils/Links';
import { Texts } from '../utils/Texts';

export default function HomeScreen({navigation}) {
  return (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
        <Image source={logo} style={styles.logo} resizeMode="contain"/>

        <NavButton label={Texts.Buttons.goBack}
            action={() => navigation.goBack()}/>

        <ScrollView style={styles.textWrap}>
          <Label value={Texts.about} size={16}/>

          <Label selectable={true} value={'\n'} size={16}/>

          <SimpleButton 
              label={Texts.Buttons.insta}
              action={() => Linking.openURL(Links.instagram)}/>
          <SimpleButton 
              label={Texts.Buttons.mail}
              action={() => Linking.openURL(Links.email)}/>
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
    paddingHorizontal:10
  },
  logo:{
    height:screen.height * 0.1,
    width:screen.width * 0.25,
    marginTop:screen.height * 0.12,
  },
  textWrap:{
    maxHeight:screen.height * 0.6
  }
});