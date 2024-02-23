import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fundo from '../../assets/img/fundo-branco.png';
import NavButton from '../../component/NavButton';
import { Texts } from '../../utils/Texts';
import Footer from '../../component/Footer';
import cardJesus from '../../assets/img/cards/card_jesus.png';
import legend from '../../assets/img/cards/clegend.png';
import { Colors } from '../../utils/Colors';
import ButtonLabel from '../../component/ButtonLabel';
import Button from '../../component/Button';
import CardGame from '../../component/game/CardGame';

export default function CardGameScreen({navigation, route}) {
  const [gameStarted, setGameStarted] = useState(false);

  const {mode} = route.params;

  let content = null;

  if(gameStarted === true){
    content = <CardGame mode={mode} navigation={navigation}/>
  } else {
    content = (
      <>
        <NavButton label={Texts.Buttons.goBack}
            action={() => navigation.goBack()}/>

        <ImageBackground source={cardJesus} style={styles.img}
            resizeMode='contain'/>

        <View style={styles.legendWrap}>
          <ButtonLabel value={Texts.Buttons.legend}/>

          <ImageBackground source={legend} style={styles.imgLgd}
            resizeMode='contain'/>
        </View>

        <Button label={Texts.Buttons.continue}
            color={Colors.blue} action={() => setGameStarted(true)}/>
        
        <Footer />
      </>
    );
  }

  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      {content}
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width: screen.width,
    height:screen.height,
    alignItems:'center',
    paddingVertical:20
  },
  img:{
    width: screen.width - 20,
    height:screen.height * 0.4,
  },
  imgLgd:{
    width: screen.width - 20,
    height:screen.height * 0.22,
    marginTop:20
  },
  legendWrap:{
    alignItems:'center',
    backgroundColor:Colors.white,
    borderWidth:4,
    borderRadius:10,
    paddingVertical:10,
    width: screen.width - 20,
    marginVertical:10
  },
});