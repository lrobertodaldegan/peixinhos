import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import { Provider } from "react-redux";
import {store} from './src/redux/store';
import HomeScreen from './src/screen/HomeScreen';
import AboutScreen from './src/screen/AboutScreen';
import BibleScreen from './src/screen/BibleScreen';
import CaractersScreen from './src/screen/CaractersScreen';
import GamesScreen from './src/screen/GamesScreen';
import MemoryScreen from './src/screen/game/MemoryScreen';
import DiffGameScreen from './src/screen/game/DiffGameScreen';
import MemoryGameScreen from './src/screen/game/MemoryGameScreen';
import CardScreen from './src/screen/game/CardScreen';
import CardGameScreen from './src/screen/game/CardGameScreen';
import BibleBookGameScreen from './src/screen/game/BibleBookGameScreen';
import WordsGameScreen from './src/screen/game/WordsGameScreen';
import RankingScreen from './src/screen/RankingScreen';
import AdScreen from './src/screen/AdScreen';

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false
}

export default function App(): JSX.Element {
  mobileAds().initialize();

  useEffect(()=>{
    SplashScreen.hide();
  },[]);

  return (
    <>
      <StatusBar barStyle='dark-content' translucent={true} backgroundColor={'transparent'}/>
      
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={ScreenOptions} />
            <Stack.Screen name="About" component={AboutScreen} options={ScreenOptions} />
            <Stack.Screen name="Bible" component={BibleScreen} options={ScreenOptions} />
            <Stack.Screen name="Characters" component={CaractersScreen} options={ScreenOptions} />
            <Stack.Screen name="Games" component={GamesScreen} options={ScreenOptions} />
            <Stack.Screen name="Memory" component={MemoryScreen} options={ScreenOptions} />
            <Stack.Screen name="MemoryGame" component={MemoryGameScreen} options={ScreenOptions} />
            <Stack.Screen name="Card" component={CardScreen} options={ScreenOptions} />
            <Stack.Screen name="CardGame" component={CardGameScreen} options={ScreenOptions} />
            <Stack.Screen name="DiffGame" component={DiffGameScreen} options={ScreenOptions} />
            <Stack.Screen name="BibleBookGame" component={BibleBookGameScreen} options={ScreenOptions} />
            <Stack.Screen name="WordsGame" component={WordsGameScreen} options={ScreenOptions} />
            <Stack.Screen name="Ranking" component={RankingScreen} options={ScreenOptions} />
            <Stack.Screen name="Ads" component={AdScreen} options={ScreenOptions} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}