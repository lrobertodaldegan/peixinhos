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
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1983527247';

export default function GamesScreen({navigation}) {
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: false,}}
      />

      <NavButton label={Texts.Buttons.goBack}
          action={() => navigation.navigate('Home')}/>

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
    paddingBottom:20,
    paddingTop:50
  },
  textWrap:{
    maxHeight:screen.height * 0.9
  }
});