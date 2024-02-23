import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { Colors } from '../../utils/Colors';
import { Texts } from '../../utils/Texts';
import ButtonLabel from '../ButtonLabel';
import Label from '../Label';

export default function CardGame({navigation, mode}) {

  const getRandomAttribute = () => {
    let index = Math.floor(Math.random() * Texts.CardGame.atributes.length);

    return Texts.CardGame.atributes[index];
  }

  return (
    <>
    <StatusBar backgroundColor={Colors.blue} barStyle={'light-content'}/>

    <View style={styles.wrap}>
      <FlatList contentContainerStyle={styles.topListWrap}
          horizontal={true}
          data={Texts.CardGame.cards}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => <Label value={item.name}/>}
      />

      <View style={styles.boardWrap}>
        <View style={styles.scoreBoard}>
          <ButtonLabel value={getRandomAttribute()}/>

          <View style={styles.scoreWrap}>
            <ButtonLabel value={2} size={38}
                color={Colors.orange}/>
            <ButtonLabel value={'x'} style={styles.scoreDiv}/>
            <ButtonLabel value={2} size={38}
                color={Colors.blue}/>
          </View>
        </View>
      </View>

      <FlatList contentContainerStyle={styles.bottomListWrap}
          horizontal={true}
          data={Texts.CardGame.cards}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => <Label value={item.name}/>}
      />
    </View>
    </>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width:screen.width,
    height:screen.height
  },
  topListWrap:{
    backgroundColor:Colors.blue,
    padding:10,
    height:screen.height * 0.333
  },
  bottomListWrap:{
    backgroundColor:Colors.orange,
    padding:10,
    height:screen.height * 0.333
  },
  boardWrap:{
    borderTopWidth:4,
    borderBottomWidth:4,
    height:screen.height * 0.333,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreBoard:{
    borderWidth:4,
    borderRadius:10,
    padding:10,
    transform:'rotateZ(270deg)',
    backgroundColor:Colors.gray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreWrap:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreDiv:{
    marginHorizontal:5,
    marginTop:7
  },
});