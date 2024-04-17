import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { stop } from '../redux/actions/music_actions';
import fundo from '../assets/img/fundo-branco.png';
import BibleBookSection from '../component/BibleBookSection';
import Footer from '../component/Footer';
import NavButton from '../component/NavButton';
import { Texts } from '../utils/Texts';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1983527247';

export default function BibleScreen({navigation}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stop());
  }, []);
  
  return (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{requestNonPersonalizedAdsOnly: false,}}
        />

        <NavButton label={Texts.Buttons.goBack}
            action={() => navigation.navigate('Home')}/>

        <FlatList style={styles.textWrap}
            ListEmptyComponent={<></>}
            data={Texts.Bible}
            keyExtractor={(item) => item.section}
            renderItem={({item}) => {
              return (
                <BibleBookSection section={item}/>
              );
            }}
            ListFooterComponent={<View style={{height:100}}/>}
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
    padding:10,
    paddingTop:50,
  },
  textWrap:{
    maxHeight:screen.height * 0.9
  }
});