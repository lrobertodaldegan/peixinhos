import React, {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {/*useSelector, */useDispatch} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { play } from '../redux/actions/music_actions';
import fundo from '../assets/img/fundo.png';
import logo from '../assets/img/logo.png';
import Footer from '../component/Footer';
import Menu from '../component/Menu';

export default function HomeScreen({navigation}) {
  const isFocused = useIsFocused();
  //const music = useSelector(state => state.music); //just for example
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(play());
  }, [isFocused]);

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