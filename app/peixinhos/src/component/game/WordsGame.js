import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Texts } from '../../utils/Texts';
import NavButton from '../NavButton';
import { Colors } from '../../utils/Colors';
import ButtonLabel from '../ButtonLabel';
import RankingModal from '../RankingModal';
import Label from '../Label';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9312913429';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';

export default function WordsGame({mode, navigation}) {
  const [fase, setFase] = useState(1);
  const [points, setPoints] = useState(0);
  const [word, setWord] = useState('');
  const [mask, setMask] = useState('');
  const [options, setOptions] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFase(1);
    setPoints(0);
    setAnswers([]);
  }, []);

  useEffect(() => {
    setAnswers([]);
    getRandomWord();
  }, [fase]);

  const getRandomWord = () => {
    setLoading(true);

    let w = Texts.WordsGame[Math.floor(Math.random() * Texts.WordsGame.length)];

    let max = 15;

    let opts = [];

    for(let i=0; i < w.word.length; i++){
      if(!opts.includes(w.word[i]))
        opts.push(w.word[i]);
    }

    while(opts.length < max){
      let o = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

      if(!opts.includes(o))
        opts.push(o);
    }

    setAbouts(w.helpers);

    setOptions(shuffle(opts));
 
    let wo = '';

    while(wo.length < w.word.length){
      wo = `${wo}-`; 
    }

    setMask(wo);
    setWord(w.word);

    setLoading(false);
  }

  const getMessage = (good) => {
    let msgs = good === true ? Texts.Games.Messages.good : Texts.Games.Messages.bad;

    let index = Math.floor(Math.random() * msgs.length);

    return msgs[index];
  }

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [
        array[currentIndex], 
        array[randomIndex]
      ] = [
        array[randomIndex], 
        array[currentIndex]
      ];
    }
  
    return array;
  }

  const getBorderColor = (opt) => {
    if(answers.includes(opt)){
      if(word.includes(opt))
        return Colors.green;
      else
        return Colors.orange;
    }

    return Colors.black;
  }

  const handleSelection = (selected) => {
    if(selected && selected !== null){
      let newMask = '';

      if(word.includes(selected)){
        setPoints(points + 10);

        setMessage(getMessage(true));


        for(c=0; c < word.length; c++){
          if(selected === word[c])
            newMask = newMask + selected;
          else
            newMask = newMask + mask[c];
        }
        
        setMask(newMask);
      } else {
        if(points > 0)
          setPoints(points - 5);

        setMessage(getMessage(false));
      }

      let as = answers;

      as.push(selected);

      setAnswers(as);

      if(newMask === word){
        setTimeout(() => setFase(fase + 1), 1000);
      }
    }
  }

  const renderComp = () => {
    if(loading === true){
      return (
        <ActivityIndicator color={Colors.yellow}
          size={'large'}
          style={styles.loading}
        />
      );
    } else {
      return (
        <View style={styles.compWrap}>
          <View style={styles.board}>
            <ButtonLabel value='Qual é a palavra?' size={24}/>
            {abouts.map(a => {
              return (
                <Label key={a.id} value={`${a.id} - ${a.text}`} size={14}/>
              );
            })}
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.input}>
              <Label value={mask} size={24}/>
            </View>
          </View>
          <View style={styles.optsWrap}>
            {options.map((opt, i) => {
              return (
                <TouchableHighlight key={`${i}${opt}`}
                    underlayColor={'transparent'}
                    style={[
                      styles.btnOpt,
                      {borderColor:getBorderColor(opt)}
                    ]}
                    onPress={() => handleSelection(opt)}>
                  <Label value={opt} size={18} />
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
      );
    }
  }

  return (
    <>
      <RankingModal game={Texts.Games.Menus.words}
        show={showModal}
        points={points}
        onClose={() => navigation.navigate('Games')}
      />

      <ScrollView contentContainerStyle={styles.wrap}>
        {renderComp()}

        <View style={styles.pointsWrap}>
          <ButtonLabel value={`${fase}\nFase`} style={styles.pointsLbl}/>

          <ButtonLabel value={`${msg}`} style={styles.pointsLbl}/>

          <ButtonLabel value={`${points}\nPontos`} style={styles.pointsLbl}/>
        </View>

        <NavButton label={Texts.Buttons.leave}
            action={() => setShowModal(true)}/>

        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{requestNonPersonalizedAdsOnly: false,}}
        />
      </ScrollView>
    </>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    paddingHorizontal:10,
    height:screen.height * 2,
    alignItems:'center'
  },
  pointsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'center',
    width:screen.width - 20,
    backgroundColor:Colors.yellow,
    borderWidth:4,
    borderRadius:10,
    paddingVertical:10,
    marginTop:10,
  },
  pointsLbl:{
    width:screen.width * 0.3,
    textAlign:'center'
  },
  board:{
    paddingVertical:10,
    marginTop:screen.height * 0.1,
    marginBottom:10,
    borderRadius:10,
    borderWidth:4,
    borderColor:Colors.black,
    width:screen.width - 20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.yellow,
  },
  inputWrap:{
    marginVertical:10,
    borderRadius:10,
    borderWidth:4,
    borderColor:Colors.black,
    width:screen.width - 20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.white,
  },
  optsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center',
    width:screen.width - 20
  },
  btnOpt:{
    marginVertical:5,
    marginHorizontal:screen.width * 0.03,
    borderRadius:5,
    borderWidth:4,
    borderColor:Colors.black,
    width:screen.width * 0.1,
    height:screen.width * 0.1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.white,
  },
  loading:{
    marginVertical:screen.height * 0.25,
  },
});