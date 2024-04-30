import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
//import {useSelector} from 'react-redux';
import fundo from '../assets/img/fundo.png';
import logo from '../assets/img/logo.png';
import Footer from '../component/Footer';
import Menu from '../component/Menu';

export default function HomeScreen({navigation}) {
  //const music = useSelector(state => state.music); //just for example

  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <Image source={logo} style={styles.logo} resizeMode="contain"/>

      <Menu navigation={navigation}/>

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
  },
  logo:{
    height:screen.height * 0.25,
    width:screen.width * 0.25,
    marginTop:screen.height * 0.06,
  },
});