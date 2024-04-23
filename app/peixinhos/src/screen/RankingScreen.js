import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import logo from '../assets/img/logo.png';
import Footer from '../component/Footer';
import NavButton from '../component/NavButton';
import { Texts } from '../utils/Texts';
import { getRanking } from '../service/RankingService';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import ButtonLabel from '../component/ButtonLabel';
import ListItemButton from '../component/ListItemButton';
import { Colors } from '../utils/Colors';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9312913429';

const FILTER_OPTIONS = [
  Texts.Games.Menus.bibleBook,
  Texts.Games.Menus.cards,
  Texts.Games.Menus.erros,
  Texts.Games.Menus.memory,
  Texts.Games.Menus.words,
];

export default function RankingScreen({navigation}) {
  const [game, setGame] = useState(Texts.Games.Menus.bibleBook);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [game]);

  const load = () => {
    setLoading(true);

    getRanking().then(response => {
      if(response && response !== null && response.status === 200){
        let is = [];

        if(response.data?.ranking && response.data?.ranking !== null){

          response.data.ranking.map(r => {
            if(r.game === game)
              is.push(r);
          });
        }

        setItens(is);
      } else {
        setItens([]);
      }

      setLoading(false);
    });
  }

  return (
    <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>
      

      <FlatList 
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={load}/>
        }
        ListHeaderComponent={
          <View style={styles.listH}>
            <Image source={logo} style={styles.logo} resizeMode="contain"/>

            <ButtonLabel value='Ranking'/>

            <FlatList horizontal
              contentContainerStyle={styles.filterList}
              data={FILTER_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({item}) => 
                <ListItemButton label={item}
                  color={item === game ? Colors.orange : Colors.blue}
                  action={() => setGame(item)}
                />
              }
            />

            <View style={styles.listItemWrap}>
              <ButtonLabel value={'Jogador'}/>
              <ButtonLabel value={'Pontuação'}/>
            </View>
          </View>
        }
        data={itens}
        keyExtractor={(item) => item._id}
        renderItem={({item}) =>
          <View style={styles.listItemWrap}>
            <ButtonLabel value={item.player}/>
            <ButtonLabel value={item.score}/>
          </View>
        }
        ListFooterComponent={
          <View style={styles.listFoot}>
            <NavButton label={Texts.Buttons.goBack}
              action={() => navigation.navigate('Ads', {nextScreen:'Games'})}/>

            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{requestNonPersonalizedAdsOnly: false,}}
            />
          </View>
        }
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
  },
  listH:{ 
    alignItems:'center'
  },
  listFoot:{
    alignItems:'center',
    marginBottom:100
  },
  filterList:{
    marginVertical:10,
    paddingHorizontal:10
  },
  logo:{
    height:screen.height * 0.25,
    width:screen.width * 0.25, 
    marginTop:screen.height * 0.02,
  },
  listItemWrap:{
    flexWrap:'wrap',
    width:screen.width * 0.85,
    marginLeft:screen.width * 0.05,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
});