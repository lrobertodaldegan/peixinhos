import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import Button from '../../component/Button';
import NavButton from '../../component/NavButton';
import {Texts} from '../../utils/Texts';
import {Colors} from '../../utils/Colors';
import ButtonLabel from '../ButtonLabel';
import Label from '../Label';
import DiffGameBlockOpt from '../DiffGameBlockOpt';

export default function DiffGame({navigation}) {
  const [card, setCard] = useState(null);
  const [fase, setFase] = useState(1);
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [blockIdSlctd, setBlockIdSlctd] = useState([]);
  const [blockIdWrongSlctd, setBlockIdWrongSlctd] = useState([]);
  const [mainComp, setMainComp] = useState(<></>);
  const [err, setErr] = useState(0); 
  
  useEffect(() => {
    randomCard();
  }, []);

  useEffect(() => {
    init();
  }, [fase, gameOver]);

  const init = () => {
    let c = randomCard();

    renderMainComponent(c, false);
  }

  const randomCard = () => {
    let index = Math.floor(Math.random() * Texts.DiffCards.length);

    let caard = Texts.DiffCards[index];

    let change = caard.name === card?.name;

    if(change === true)
      return randomCard();

    setCard(caard);

    return caard;
  }

  const handleSelection = (index, caard) => {
    if(!blockIdSlctd.includes(index)){
      let slctd = blockIdSlctd;

      if(caard.diff1 === index || caard.diff2 === index || caard.diff3 === index ||
         caard.diff4 === index || caard.diff5 === index || caard.diff6 === index ||
         caard.diff7 === index){

        slctd.push(index);
        
        setBlockIdSlctd(slctd);

        setPoints(points + (slctd.length * 10));

        if(slctd.length > 6){
          let f = fase+1;

          if(f < 8){
            setFase(f);

            setBlockIdSlctd([]);
            setBlockIdWrongSlctd([]);
            setErr(0);
          } else {
            setGameOver(true);
          }
        }
      } else {
        let ers = blockIdWrongSlctd;

        ers.push(index);

        setBlockIdWrongSlctd(ers);

        setErr(ers.length);

        if(ers.length > 2)
          setGameOver(true);

        return false;
      }
    }

    return true;
  }

  const handleStartGame = (caard) => {
    renderMainComponent(caard, true);
  }

  const renderMainComponent = (caard, gameStart) => {
    let mc = <></>

    if(gameOver === true){
      let lbl = `Ah! Que pena!\nTente outra vez!`;

      if(err < 3){
        lbl = `Parabéns!\nÓtimo jogo!!!\n Deus te abençoe!`;
      }

      mc = <ButtonLabel value={lbl} style={styles.goLbl} size={28}/>
    } else {
      if(gameStart === true){
        let blocks = [];

        for(let i=0; i<16; i++){
          blocks.push(
            <DiffGameBlockOpt key={`block_${i}`} index={i}
                card={caard} onSelectionValidate={handleSelection}/>
          );
        }

        mc = (
          <View style={styles.gameWrap}>
            <ImageBackground source={caard.img} resizeMode='contain'
                style={styles.img}>

              <View style={styles.blockWrap}>
                {blocks}
              </View>

            </ImageBackground>
          </View>
        );
      } else {
        mc = (
          <View style={styles.preGameWrap}>
            <ButtonLabel value={caard.name} />

            <ImageBackground source={caard.preimg} resizeMode='contain'
              style={styles.preImg}/>

            <View style={styles.resumeWrap}>
              <Label value={caard.resume} size={14}/>
            </View>

            <Button label={Texts.Buttons.continue} color={Colors.blue}
                action={() => handleStartGame(caard)}/>
          </View>
        );
      }
    }

    setMainComp(mc);
  }

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      {mainComp}

      <View style={styles.pointsWrap}>
        <ButtonLabel value={`${fase}\nFase`} style={styles.pointsLbl}/>

        <ButtonLabel value={`${err}/3\nErros`} style={styles.pointsLbl}/>

        <ButtonLabel value={`${points}\nPontos`} style={styles.pointsLbl}/>
      </View>

      <NavButton label={Texts.Buttons.leave}
          action={() => navigation.navigate('Ads', {nextScreen:'Games'})}/>
    </ScrollView>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    minHeight: screen.height,
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
  preGameWrap:{
    backgroundColor:Colors.orange,
    borderWidth:4,
    borderRadius:10,
    marginTop:40,
    padding:20,
    alignItems:'center',
  },
  preImg:{
    height:screen.width - 70,
    width:screen.width - 70,
    marginTop:20,
  },
  img:{
    height:(screen.width - 10) * 1.7,
    width:screen.width - 10,
    marginTop:20,
  },
  resumeWrap:{
    backgroundColor:Colors.white,
    padding:10,
    width:screen.width - 70,
    marginBottom:20
  },
  blockWrap:{
    flexDirection:"row",
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center',
    width:screen.width * 0.83,
    marginHorizontal:screen.width * 0.075,
    marginTop:((screen.width * 0.83) * 0.25) * 4,
  },
  diffBlocks:{
    backgroundColor:'red',
    height:(screen.width * 0.83) * 0.25,
    width:(screen.width * 0.83) * 0.25,
    backgroundColor:'rgba(255,255,255,0.5)',
  },
  diffBlockSlctd:{
    backgroundColor:'blue',
  },
  goLbl:{
    textAlign:"center",
    marginBottom:screen.width * 0.7,
    marginTop:screen.width * 0.7
  },
});