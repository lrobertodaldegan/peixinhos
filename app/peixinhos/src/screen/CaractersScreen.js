import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import fundo from '../assets/img/fundo-branco.png';
import ButtonLabel from '../component/ButtonLabel';
import CharacterFilterForm from '../component/CharacterFilterForm';
import CharacterResumeCard from '../component/CharacterResumeCard';
import Footer from '../component/Footer';
import NavButton from '../component/NavButton';
import { Texts } from '../utils/Texts';

export default function CaractersScreen({navigation}) {
  const [itens, setItens] = useState(null);

  useEffect(() => {
    setItens(Texts.Characters);
  }, []);

  const handleFilter = (filter) => {
    if(filter && filter !== null && filter.length > 0)
      setItens(Texts.Characters.filter(f => f.name.includes(filter)));
    else
      setItens(Texts.Characters);
  }

  return (
      <ImageBackground source={fundo} resizeMode="cover" style={styles.wrap}>

        <NavButton label={Texts.Buttons.goBack}
            action={() => navigation.goBack()}/>

        <FlatList style={styles.textWrap}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            ListHeaderComponent={
              <CharacterFilterForm onSearch={(f) => handleFilter(f)}/>
            }
            ListEmptyComponent={
              <ButtonLabel value={Texts.nothingFound} size={16}/>
            }
            data={itens}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => {
              return (
                <CharacterResumeCard character={item} />
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