import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Colors } from '../../utils/Colors';
import { Texts } from '../../utils/Texts';
import ButtonLabel from '../ButtonLabel';
import CardGameOptionCard from '../CardGameOptionCard';
import NavButton from '../NavButton';

export default function CardGame({navigation, mode}) {
  const [topCards, setTopCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [topSelection, setTopSelection] = useState(null);
  const [botSelection, setBotSelection] = useState(null);
  const [block, setBlock] = useState(false);
  const [topBlock, setTopBlock] = useState(false);
  const [botBlock, setBotBlock] = useState(false);
  const [attribute, setAttribute] = useState(null);
  const [topScore, setTopScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [lWin, setLWin] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [singlePLbl, setSinglePLbl] = useState('Sua vez!');

  useEffect(() => {
    init();
  }, []);

  const getMessage = (good) => {
    let msgs = good === true ? Texts.Games.Messages.good : Texts.Games.Messages.bad;

    let index = Math.floor(Math.random() * msgs.length);

    return msgs[index];
  }

  const getRandomCard = (itens) => {
    let index = Math.floor(Math.random() * Texts.CardGame.cards.length);

    let change = itens.filter(i => i.index == index).length > 0;

    if(change === true)
      return getRandomCard(itens);
    else
      return {index:index, card:Texts.CardGame.cards[index]};
  }

  const init = () => {
    setTopSelection(null);
    setBotSelection(null);

    let cQtd = Math.floor(Texts.CardGame.cards.length * 0.5);
    
    let itens = [];

    let topItens = [];

    if(topCards.length < 1 && mode === Texts.Games.Modes.multiple){  
      for(let i=0; i < cQtd; i++){
        let item = getRandomCard(itens);
        
        if(itens.indexOf(item) > -1)
        item = getRandomCard(itens);
        
        itens.push(item);
        topItens.push(item);
      }
      
      setTopCards(topItens);
    }

    if(botCards.length < 1){
      let botItens = [];

      for(let i=0; i < cQtd; i++){
        let item = getRandomCard(itens);
        
        itens.push(item);
        botItens.push(item);
      }

      setBotCards(botItens);
    }

    setAttribute(getRandomAttribute());

    setBlock(false);
    setTopBlock(mode === Texts.Games.Modes.single);
    setBotBlock(false);
    setLWin(null);
  }

  const getRandomAttribute = () => {
    let index = Math.floor(Math.random() * Texts.CardGame.atributes.length);

    return Texts.CardGame.atributes[index];
  }

  const handleSelection = (origin, card) => {
    let turnOver = false;

    let pcSelection = null;

    if(mode === Texts.Games.Modes.single){
      setBotBlock(true);
      setBotSelection(card);
      //select automatically
      pcSelection = getRandomCard(botCards);
      
      setTopSelection(pcSelection);
      
      turnOver = true;
    } else {
      if(origin === 'top'){
        setTopBlock(true);
        setTopSelection(card);

        turnOver = card !== null && (botSelection && botSelection !== null);
      } else {
        setBotBlock(true);
        setBotSelection(card);

        turnOver = card !== null && (topSelection && topSelection !== null);
      }
    }

    if(turnOver === true){
      setBlock(true);

      let scoreTarget = Texts.CardGame.atributes.indexOf(attribute);

      let bot = botSelection && botSelection !== null ? botSelection : card;
      let top = topSelection && topSelection !== null ? topSelection : card;

      if(mode === Texts.Games.Modes.single)
        top = pcSelection;

      let topPoints = Object.values(top.card)[scoreTarget+1];
      let botPoints = Object.values(bot.card)[scoreTarget+1];

      if(topPoints > botPoints){
        setTopScore(topScore + 1);
        setLWin('top');
        setSinglePLbl(getMessage(false));
      } else if(topPoints < botPoints){
        setBotScore(botScore + 1);
        setLWin('bot');
        setSinglePLbl(getMessage(true));
      } else if(topPoints === botPoints){
        setTopScore(topScore + 1);
        setBotScore(botScore + 1);
        setLWin('draw');
        setSinglePLbl(getMessage(true));
      }

      if(topScore === 9 || botScore === 9)
        setGameOver(true);
      else
        setTimeout(() => init(), 2500);
    }
  }

  const renderTopSelection = () => {
    if(topSelection !== null && block === true){
      let lbl = lWin === 'bot' ? 'Você perdeu!' : 'Voce ganhou!';

      if(lWin === 'draw')
        lbl = 'Empate!';

      return (
        <View style={styles.topSelection}>
          <ButtonLabel value={lbl} size={20}/>

          <ImageBackground source={topSelection.card.img} resizeMode='contain' 
              style={styles.img}/>
        </View>
      );
    } else {
      return <></>
    }
  }

  const renderBotSelection = () => {
    if(botSelection !== null && block === true){
      let lbl = lWin === 'top' ? 'Você perdeu!' : 'Voce ganhou!';

      if(lWin === 'draw')
        lbl = 'Empate!';

      return (
        <View style={styles.botSelection}>
          <ButtonLabel value={lbl} size={20}/>
          
          <ImageBackground source={botSelection.card.img} resizeMode='contain' 
              style={styles.img}/>
        </View>
      );
    } else {
      return <></>
    }
  }

  const renderGameOver = () => {
    if(gameOver === true){
      let stl = topScore > botScore ? styles.topWin : styles.botWin;

      return (
        <View style={[styles.GOWrap, stl]}>
          <ButtonLabel value={'Você ganhou!\n'} size={38} />
          <ButtonLabel value={Texts.Games.Messages.end.title} size={32} />
          <ButtonLabel value={Texts.Games.Messages.end.subtitle} size={22} />

          <NavButton action={() => navigation.goBack()} 
              label={Texts.Buttons.goBack}/>
        </View>
      );
    } else {
      return <></>
    }
  }

  const getStatusBarColor = () => {
    if(gameOver === true)
      return topScore > botScore ? Colors.blue : Colors.orange;
    else
      return Colors.blue;
  }

  return (
    <>
    <StatusBar backgroundColor={getStatusBarColor()} barStyle={'light-content'}/>

    <View style={styles.wrap}>
      <FlatList style={{backgroundColor:Colors.blue}} 
          contentContainerStyle={styles.topListWrap}
          horizontal={true}
          data={topCards}
          keyExtractor={(item) => `top${item.card.name}`}
          ListEmptyComponent={
            <View style={styles.topListEmpty}>
              <ButtonLabel value={singlePLbl}/>
            </View>
          }
          renderItem={({item}) => {
            let c = (
              <CardGameOptionCard item={item} flipped={true}
                          block={block || topBlock}
                          press={item.card === topSelection?.card}
                          onPress={() => handleSelection('top', item)}/>
            );

            if(topSelection !== null){
              if(topSelection === item){
                return c;
              } else {
                return (
                  <View style={{opacity:0.5}}>
                    {c}
                  </View>
                );
              }
            }
            
            return c;
          }}
      />

      <View style={styles.boardWrap}>
        {renderTopSelection()}

        <View style={styles.scoreBoard}>
          <ButtonLabel value={attribute}/>

          <View style={styles.scoreWrap}>
            <ButtonLabel value={botScore} size={30}
                color={Colors.orange}/>
            <ButtonLabel value={'x'} style={styles.scoreDiv} size={14}/>
            <ButtonLabel value={topScore} size={30}
                color={Colors.blue}/>
          </View>
        </View>

        {renderBotSelection()}
      </View>

      <FlatList style={{backgroundColor:Colors.orange}} 
          contentContainerStyle={styles.bottomListWrap}
          horizontal={true}
          data={botCards}
          keyExtractor={(item) => `bot${item.card.name}`}
          renderItem={({item}) => {
            let c = (
              <CardGameOptionCard item={item}
                      block={block || botBlock}
                      press={item.card === botSelection?.card}
                      onPress={() => handleSelection('bot', item)}/>
            );
            
            if(botSelection !== null){
              if(botSelection === item){
                return c;
              } else {
                return (
                  <View style={{opacity:0.5}}>
                    {c}
                  </View>
                );
              }
            }

            return c;
          }}
      />
    </View>

    {renderGameOver()}
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
    height:(screen.height - 100) * 0.333,
  },
  bottomListWrap:{
    backgroundColor:Colors.orange,
    height:(screen.height + 100) * 0.333
  },
  boardWrap:{
    flexDirection:'row',
    borderTopWidth:4,
    borderBottomWidth:4,
    height:screen.height * 0.333,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  scoreBoard:{
    borderWidth:4,
    borderRadius:10,
    padding:5,
    transform:'rotateZ(270deg)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.gray,
  },
  scoreWrap:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreDiv:{
    marginHorizontal:5,
    marginTop:7
  },
  topSelection:{
    alignItems:'center',
    transform:'rotateZ(180deg)',
  },
  botSelection:{
    alignItems:'center',
  },
  img:{
    height:screen.height * 0.18,
    width:screen.height * 0.15,
    marginTop:10
  },
  GOWrap:{
    width:screen.width,
    height:screen.height,
    position:'absolute',
    top:0,
    alignItems:'center',
    justifyContent:"center"
  },
  topWin:{
    backgroundColor:Colors.blue,
    transform:'rotateZ(180deg)',
  },
  botWin:{
    backgroundColor:Colors.orange,
  },
  topListEmpty:{
    alignItems:'center',
    justifyContent:'center',
    width:screen.width
  },
});