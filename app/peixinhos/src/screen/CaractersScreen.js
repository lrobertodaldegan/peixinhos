import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import ButtonLabel from '../component/ButtonLabel';
import CharacterFilterForm from '../component/CharacterFilterForm';
import CharacterResumeCard from '../component/CharacterResumeCard';
import Footer from '../component/Footer';
import NavButton from '../component/NavButton';
import { Texts } from '../utils/Texts';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1983527247';

export default function CaractersScreen({navigation}) {
  const [itens, setItens] = useState(null);

  useEffect(() => {
    setItens(Texts.Characters);
  }, []);

  const handleFilter = (filter) => {
    if(filter && filter !== null && filter.length > 0)
      setItens(Texts.Characters.filter(f => f.name.includes(filter)));
    else
      setItens(Texts.Characters);
  }

  return (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{requestNonPersonalizedAdsOnly: false,}}
        />

        <NavButton label={Texts.Buttons.goBack}
            action={() => navigation.navigate('Games')}/>

        <FlatList style={styles.textWrap}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            ListHeaderComponent={
              <CharacterFilterForm onSearch={(f) => handleFilter(f)}/>
            }
            ListEmptyComponent={
              <ButtonLabel value={Texts.nothingFound} size={16}/>
            }
            data={itens}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => {
              return (
                <CharacterResumeCard character={item} />
              );
            }}
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
  },
  adWrap:{
    minHeight:450,
    alignItems:'center',
    justifyContent:'center'
  }
});