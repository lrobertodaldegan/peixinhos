import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import AboutScreen from './src/screen/AboutScreen';
import BibleScreen from './src/screen/BibleScreen';
import CaractersScreen from './src/screen/CaractersScreen';
import GamesScreen from './src/screen/GamesScreen';
import PlayersScreen from './src/screen/PlayersScreen';
import DiffScreen from './src/screen/game/DiffScreen';
import MemoryScreen from './src/screen/game/MemoryScreen';
import DiffGameScreen from './src/screen/game/DiffGameScreen';
import MemoryGameScreen from './src/screen/game/MemoryGameScreen';
import CardScreen from './src/screen/game/CardScreen';
import CardGameScreen from './src/screen/game/CardGameScreen';
import EndGameScreen from './src/screen/game/EndGameScreen';

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
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={ScreenOptions} />
          <Stack.Screen name="About" component={AboutScreen} options={ScreenOptions} />
          <Stack.Screen name="Bible" component={BibleScreen} options={ScreenOptions} />
          <Stack.Screen name="Characters" component={CaractersScreen} options={ScreenOptions} />
          <Stack.Screen name="Games" component={GamesScreen} options={ScreenOptions} />
          <Stack.Screen name="Players" component={PlayersScreen} options={ScreenOptions} />
          <Stack.Screen name="Memory" component={MemoryScreen} options={ScreenOptions} />
          <Stack.Screen name="MemoryGame" component={MemoryGameScreen} options={ScreenOptions} />
          <Stack.Screen name="Card" component={CardScreen} options={ScreenOptions} />
          <Stack.Screen name="CardGame" component={CardGameScreen} options={ScreenOptions} />
          <Stack.Screen name="Diff" component={DiffScreen} options={ScreenOptions} />
          <Stack.Screen name="DiffGame" component={DiffGameScreen} options={ScreenOptions} />
          <Stack.Screen name="EndGame" component={EndGameScreen} options={ScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}