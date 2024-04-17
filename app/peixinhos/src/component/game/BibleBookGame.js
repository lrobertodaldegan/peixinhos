import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Texts } from '../../utils/Texts';
import NavButton from '../NavButton';
import { Colors } from '../../utils/Colors';
import ButtonLabel from '../ButtonLabel';
import MemoryCard from '../MemoryCard';
import Label from '../Label';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { getRandomVerse } from '../../service/BibleService';
import Button from '../Button';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9312913429';

export default function BibleBookGame({navigation}) {
  const [fase, setFase] = useState(1);
  const [points, setPoints] = useState(0);
  const [card, setCard] = useState(null);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState('');
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    setFase(1);
    setPoints(0);
    setAnswer(null);
  }, []);

  useEffect(() => {
    setAnswer(null);
    getRandomCard();
  }, [fase]);

  useEffect(() => {
    handleSelection();
  }, [answer]);

  const getRandomCard = () => {
    setLoading(true);

    getRandomVerse().then(response => {
      let c = {
        number:0, 
        chapter:0, 
        text:'Houve um erro ao tentar carregar o versículo!\nAtive a sua internet e tente novamente mais tarde!'
      };

      if(response.status === 200){
        c = response.content;

        setCard(c);

        let opts = [];

        opts.push({book:{title:c.book.name}, right: true});

        var bks = [];

        Texts.Bible.map(b => bks = bks.concat(b.books));

        let idx = Math.floor(Math.random() * bks.length);

        opts.push({book:{title:bks[idx]?.title}, right: false});
        opts.push({book:{title:getRandomBookExceptIndex(bks, idx)?.title}, right: false});

        setOptions(shuffle(opts));
      }else{
        setCard(c);
      }

      setLoading(false);
    });
  }

  const getRandomBookExceptIndex = (allBooks, index) => {
    let i = Math.floor(Math.random() * allBooks.length);

    if(index > 0 && `${i}` === `${index}`)
      return getRandomBookExceptIndex(i);

    let b = allBooks[i];

    if(b && b?.title)
      return b;
    
    return getRandomBookExceptIndex(index);
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

  const getOptColor = (opt) => {
    if(answer && answer !== null){
      if(`${opt?.book?.title}` === `${answer?.book?.title}`){
        return opt.right === true ? Colors.green : Colors.orange;
      }
    }

    return Colors.lightOrange;
  }

  const handleSelection = () => {
    if(answer && answer !== null){
      if(answer.right === true){
        setPoints(points + 10);

        setMessage(getMessage(true));
      } else {
        if(points > 0)
          setPoints(points - 5);

        setMessage(getMessage(false));
      }

      setTimeout(() => setFase(fase + 1), 1000);
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
        <View style={styles.cardsWrap}>
          <View style={styles.bookWrap}>
            <Label align='center' size={20} value={'Qual é o livro?\n'}/>
            <Label align='center' size={18} value={card?.text}/>
            <Label align='center' value={`\nCapítulo: ${card?.chapter}\nVersículo: ${card?.number}`}/>
          </View>
          <View style={styles.optsWrap}>
            {options.map(opt => {
              return (
                <Button key={opt.book.title} 
                  label={opt.book.title}
                  labelSize={18}
                  color={getOptColor(opt)}
                  style={styles.optBtn}
                  action={() => answer === null ? setAnswer(opt) : null}
                />
              );
            })}
          </View>
        </View>
      );
    }
  }

  return (
    <>

      <ScrollView contentContainerStyle={styles.wrap}>
        {renderComp()}

        <View style={styles.pointsWrap}>
          <ButtonLabel value={`${fase}\nFase`} style={styles.pointsLbl}/>

          <ButtonLabel value={`${msg}`} style={styles.pointsLbl}/>

          <ButtonLabel value={`${points}\nPontos`} style={styles.pointsLbl}/>
        </View>

        <NavButton label={Texts.Buttons.leave}
            action={() => navigation.navigate('Games')}/>

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
  cardsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'space-between',
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
  charLbl:{
    textAlign:'center',
    marginTop:10,
    marginHorizontal:5
  },
  endGameWrap:{
    alignItems:'center',
    justifyContent:'center',
    marginVertical:screen.height * 0.25
  },
  bookWrap:{
    justifyContent:'center',
    alignItems:'center',
    width:screen.width - 20,
    marginTop:screen.height * 0.05,
    marginBottom:screen.height * 0.02,
    padding:screen.height * 0.02,
    borderWidth:4,
    borderRadius:10,
    backgroundColor:Colors.white
  },
  optsWrap:{
    justifyContent:'center',
    alignItems:'center',
    width:screen.width - 20
  },
  optBtn:{
    borderRadius:10
  },
  loading:{
    marginVertical:screen.height * 0.25,
  },
});