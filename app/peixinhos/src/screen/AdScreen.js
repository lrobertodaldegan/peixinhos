import React, {useEffect, useState } from "react";
import { 
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import { useIsFocused } from '@react-navigation/native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import ButtonLabel from "../component/ButtonLabel";
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2420598559068720/8349625045';

const iad = InterstitialAd.createForAdRequest(adUnitId);

export default function AdScreen({navigation, route}){
  const [loaded, setLoaded] = useState(false);
  const isOnFocus = useIsFocused();

  const {nextScreen} = route.params;

  useEffect(() => {
    if(isOnFocus === true){
      const unsubscribe = iad.addAdEventListener(
                                            AdEventType.LOADED, 
                                            handleAdsLoaded);
      iad.load();

      iad.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded(false);

        navigation.navigate(nextScreen ? nextScreen : 'Games');
      });
      // Unsubscribe from events on unmount
      return unsubscribe;
    }
  },[isOnFocus]);

  const handleAdsLoaded = () => {
    setLoaded(true);

    iad.show();
  }

  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      <ButtonLabel size={16}
          value={loaded === true 
                          ? '' 
                          : 'Antes de continuar,\numa palavrinha dos nossos patrocinadores'}
      />
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width: screen.width,
    height:screen.height,
    alignItems:'center',
    paddingHorizontal:10,
    paddingTop:100,
  },
});