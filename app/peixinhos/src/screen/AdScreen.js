import React, {useEffect, useState } from "react";
import { 
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import { Texts } from '../utils/Texts';
import NavButton from '../component/NavButton';
import ButtonLabel from "../component/ButtonLabel";
import { useIsFocused } from '@react-navigation/native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2420598559068720/8349625045';

const iad = InterstitialAd.createForAdRequest(adUnitId);

export default function AdScreen({navigation, route}){
  const [timeouted, setTimeouted] = useState(false);
  const isOnFocus = useIsFocused();

  const {nextScreen} = route.params;

  useEffect(() => {
    if(isOnFocus === true){
      setTimeout(() => setTimeouted(true), 10000);

      const unsubscribe = iad.addAdEventListener(
                                            AdEventType.LOADED, 
                                            () => iad.show());
      iad.load();

      iad.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.navigate(nextScreen ? nextScreen : 'Games');
      });
      // Unsubscribe from events on unmount
      return unsubscribe;
    }
  },[isOnFocus]);

  const renderContinue = () => {
    if(timeouted === true){
      return (
        <NavButton 
            action={() => navigation.navigate(nextScreen ? nextScreen : 'Games')} 
            label={'Toque aqui para continuar'}/>
      );
    }

    return (
      <ButtonLabel size={14}
          value={'Se o anúncio não carregar, você poderá continuar.\nAguarde até 10 segundos...'}
      />
    );
  }

  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <ButtonLabel size={20}
          value={'Carregando anúncios...'}
      />

      {renderContinue()}
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width: screen.width,
    height:screen.height,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:10,
  },
});