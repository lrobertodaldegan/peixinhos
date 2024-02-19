import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import BibleBookSection from '../component/BibleBookSection';
import Footer from '../component/Footer';
import NavButton from '../component/NavButton';
import { Texts } from '../utils/Texts';

export default function BibleScreen({navigation}) {
  return (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

        <NavButton label={Texts.Buttons.goBack}
            action={() => navigation.goBack()}/>

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
    paddingTop:20,
  },
  textWrap:{
    maxHeight:screen.height * 0.9
  }
});