import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { Texts } from '../../utils/Texts';
import NavButton from '../../component/NavButton';
import { Colors } from '../../utils/Colors';
import ButtonLabel from '../ButtonLabel';
import MemoryCard from '../MemoryCard';

export default function MemoryGame({mode, navigation}) {
  const [fase, setFase] = useState(1);
  const [width, setWidth] = useState(1);
  const [cards, setCards] = useState([]);
  const [selections, setSelections] = useState([]);
  const [points, setPoints] = useState(0);
  const [block, setBlock] = useState(true);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    setFase(1);

    if(cards.length < 1)
      init(1);
  }, []);

  const getRandomCard = (itens) => {
    let index = Math.floor(Math.random() * Texts.Characters.length);

    let change = itens.filter(i => i.index == index).length > 0;

    if(change === true)
      return getRandomCard(itens);
    else
      return {index:index, character:Texts.Characters[index]};
  }

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], 
        array[currentIndex]
      ];
    }
  
    return array;
  }

  const init = (f) => {
    let cQtd = 2 + (2 * f);

    let div = f >= 3 ? 4 : cQtd*0.5;

    setWidth((screen.width - 40)/div);

    let itens = [];

    for(let i=0; i < (cQtd * 0.5); i++){
      let item = getRandomCard(itens);

      let a = {...item, id:`${item.index}`, show:false};
      let b = {...item, id:`${item.index}b`, show:false};

      itens.push(a);
      itens.push(b);
    }

    setCards(shuffle(itens));

    setBlock(false);
  }

  const handleSelection = (card) => {
    if(block === false){
      let ss = selections;

      let result = [];
      
      if(ss.length < 2){
        for(let i=0; i < cards.length; i++){
          let c = cards[i];

          if(c.id === card?.id){
            c.show = true;

            ss.push(c);
          }
          
          result.push(c);
        }
        
        setCards(result);
        setSelections(ss);
      }

      handleCombination(ss);
    }
  }

  const handleCombination = (ss) => {
    if(ss.length > 1){
      setBlock(true);

      let a = null;
      let b = null;

      for(let i=0; i < ss.length; i++){
        if(a === null)
          a = ss[i];
        else
          b = ss[i];
      }

      let ps = points;
      
      if(a.character.name === b?.character.name){
        setPoints(ps + 10);

        setBlock(false);
      } else {
        setTimeout(() => {
          let result = [];
          //turnover selecteds
          for(let i=0; i < cards.length; i++){
            let c = cards[i];
    
            if(c.id === a.id || c.id === b.id)
              c.show = false;
            
            result.push(c);
          }
  
          setCards(result);

          setBlock(false);
        }, 1500);
      }

      setSelections([]);

      handleEndFase();
    }
  }

  const handleEndFase = () => {
    let faseEnded = cards.filter(c => c.show === false).length < 1;

    if(faseEnded === true){
      let f = fase + 1;

      if(f > 15){
        ToastAndroid.show('🎉 Parabéns!', 1000);

        setEndGame(true);
      } else {
        ToastAndroid.show('🎉 Parabéns!', 300);

        setFase(f);

        setTimeout(() => init(f), 500);
      }
    }
  }

  const renderCardsOrEndGame = ()=> {
    if(endGame === true){
      return (
        <View style={styles.endGameWrap}>
          <ButtonLabel value='Parabéns!' size={32}/>
          <ButtonLabel value={'Chegamos ao final do jogo!'}
              size={22}/>
          <ButtonLabel value={'Deus abençoe!!!'}
              size={22}/>
        </View>
      );
    } else {
      return (
        <View style={styles.cardsWrap}>
          {cards.map(c => {
            return (
              <MemoryCard key={c.id} item={c} width={width}
                  show={c.show} onPress={() => handleSelection(c)}/>
            )
          })}
        </View>
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      {renderCardsOrEndGame()}

      <View style={styles.pointsWrap}>
        <ButtonLabel value={`${fase}\nFase`} style={styles.pointsLbl}/>

        <ButtonLabel value={`${points}\nPontos`} style={styles.pointsLbl}/>

        <ButtonLabel value={'100\nRecorde'} style={styles.pointsLbl}/>
      </View>

      <NavButton label={Texts.Buttons.leave}
          action={() => navigation.goBack()}/>
    </ScrollView>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    paddingHorizontal:10,
    height:screen.height * 2
  },
  cardsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'space-between',
  },
  card:{
    width:((screen.width - 40) * 0.5),
    height:50,//screen.height * 0.3,
    borderWidth:4,
    borderRadius:10,
    backgroundColor:Colors.orange,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  cardImg:{
    borderRadius:20,
  },
  pointsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
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
});