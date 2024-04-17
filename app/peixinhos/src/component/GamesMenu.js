import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ImageButton from './ImageButton';
import memoria from '../assets/img/memoria/memoria_classico.png';
import erros from '../assets/img/7erros/7erros.png';
import card from '../assets/img/cards/card_jesus.png';
import personagens from '../assets/img/personagens/personagens.png';
import outrosapps from '../assets/img/outrosapps.png';
import { Texts } from '../utils/Texts';
import { Links } from '../utils/Links';

export default function GamesMenu({navigation}) {
  return (
    <View style={styles.wrap}>
      <ImageButton img={memoria} label={Texts.Games.Menus.memory}
          action={() => navigation.navigate('Ads', {nextScreen:'Memory'})}/>

      <ImageButton img={erros} label={Texts.Games.Menus.erros}
          color={Colors.blue}
          action={() => navigation.navigate('Ads', {nextScreen:'DiffGame'})}/>

      <ImageButton img={card} label={Texts.Games.Menus.words}
          color={Colors.darkBlue}
          action={() => navigation.navigate('Ads', {nextScreen:'WordsGame'})}/>

      <ImageButton img={card} label={Texts.Games.Menus.bibleBook}
          action={() => navigation.navigate('Ads', {nextScreen:'BibleBookGame'})}/>

      <ImageButton img={card} label={Texts.Games.Menus.cards}
          color={Colors.blue}
          action={() => navigation.navigate('Ads', {nextScreen:'Card'})}/>

      <ImageButton img={personagens} label={Texts.Games.Menus.characters}
          color={Colors.darkBlue}
          action={() => navigation.navigate('Characters')}/>

      <ImageButton img={outrosapps} label={Texts.Games.Menus.others}
          color={Colors.yellow}
          action={() => Linking.openURL(Links.othersApps)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
  },
});