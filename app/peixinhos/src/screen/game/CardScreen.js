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
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1983527247';
const adUnitIdM = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9312913429';

export default function CardScreen({navigation}) {
  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: false,}}
      />

      <NavButton label={Texts.Buttons.goBack}
        action={() => navigation.navigate('Games')}/>

      <ImageButton img={sp} label={Texts.Games.Modes.single}
          action={() => navigation.navigate('CardGame', {mode:Texts.Games.Modes.single})}/>

      <ImageButton img={mp} label={Texts.Games.Modes.multiple}
          color={Colors.blue}
          action={() => navigation.navigate('CardGame', {mode:Texts.Games.Modes.multiple})}/>
      
      <BannerAd
          unitId={adUnitIdM}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{requestNonPersonalizedAdsOnly: false,}}
      />

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
});