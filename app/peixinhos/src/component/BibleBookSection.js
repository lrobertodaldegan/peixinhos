import React, {useState, useEffect} from 'react';
import {
  TouchableHighlight,
  Dimensions,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getBook, getChapter } from '../service/BibleService';
import {Colors} from '../utils/Colors';
import BibleBookLabel from './BibleBookLabel';
import ButtonLabel from './ButtonLabel';
import Label from './Label';

export default function BibleBookSection({section={}}) {
  const [bookSlctd, setBookSlctd] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [chapterSlctd, setChapterSlctd] = useState(null);
  const [verses, setVerses] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBookSlctd(null);
    setChapters(null);
    setChapterSlctd(null);
    setVerses(null);
  }, []);

  const handleBookSelection = (newBook) => {
    if(bookSlctd?.title === newBook?.title){
      setBookSlctd(null);
    } else {
      setLoading(true);
      setBookSlctd(newBook);

      getBook(newBook.abrev).then((response) => {
        setChapters(response?.content?.chapters);
        setLoading(false);
      });
    }
  }

  const renderBooks = () => {
    if(section && section.books){
      let bks = [];

      for(let i=0;i<section.books.length;i++){
        let abrev = section.books[i].abrev;
        let lbl = section.books[i].title;

        bks.push(
          <BibleBookLabel key={`${abrev}${lbl}`}
              abrev={abrev} value={lbl} 
              color={bookSlctd?.title === lbl ? Colors.orange : Colors.white}
              onSelect={() => handleBookSelection(section.books[i])}/>
        );
      }

      return bks;
    }
  }

  const handleChapterSelection = (chap) => {
    if(chapterSlctd && chapterSlctd === chap){
      setChapterSlctd(null);
      setVerses(null);
    } else {
      setVerses(null);
      setLoading(true);
      setChapterSlctd(chap);

      getChapter(bookSlctd.abrev, chap).then((response) => {
        setVerses(response.content);
        setLoading(false);
      });
    }
  }

  const renderChapters = () => {
    if(bookSlctd && bookSlctd !== null && chapters && chapters > 0){
      let chapBtns = [];

      for(let i=0; i < chapters;i++){
        let color = chapterSlctd && chapterSlctd === i+1 
                                      ? Colors.orange 
                                      : Colors.white;
        chapBtns.push(
          <TouchableHighlight underlayColor='transparent'
              style={styles.chapter} key={`${bookSlctd.abrev}${i+1}`}
              onPress={() => handleChapterSelection(i+1)}>
            <ButtonLabel value={i+1} size={22} color={color}/>
          </TouchableHighlight>
        );
      }

      return chapBtns;
    } else {
      return <></>
    }
  }

  const renderVerses = () => {
    if(verses && verses?.verses){
      let vrs = [];

      for(let i=0; i<verses?.verses?.length;i++){
        vrs.push(
          <View key={`v${i}${i}${i}`} style={styles.verse}>
            <Label size={16} 
                value={`${verses?.verses[i].number} ${verses?.verses[i].text}`} 
            />
          </View>
        );
      }

      return vrs;
    } else {
      return <></>
    }
  }

  const renderLoading = () => {
    if(loading === true){
      return <ActivityIndicator color={Colors.white} />
    } else {
      return <></>
    }
  }

  return (
    <View style={[styles.wrap, {backgroundColor:section.color}]}>
      <ButtonLabel value={section.section} size={20}/>

      <View style={styles.booksWrap}>
        {renderBooks()}
      </View>

      <View style={styles.booksWrap}>
        {renderChapters()}
      </View>

      <View style={verses ? styles.versesWrap : {}}>
        {renderVerses()}
      </View>

      {renderLoading()}
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    padding:10,
    width:screen.width - 20,
    borderRadius:25,
    borderWidth:4,
    borderColor:Colors.black,
    alignItems:'center',
    marginVertical:5
  },
  booksWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom:10,
  },
  booksLblWrap:{
    width:(screen.width - 20) * 0.45,
    alignItems:'center',
    marginVertical:2
  },
  chapter:{
    width:(screen.width - 20) * 0.09,
    marginHorizontal:5,
    alignItems:'center',
  },
  versesWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginVertical:10,
    borderRadius:10,
    borderWidth:3,
    backgroundColor:Colors.white,
    padding:10
  },
  verse:{
    marginVertical:5
  },
});