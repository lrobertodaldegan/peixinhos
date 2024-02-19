import React, {useState, useEffect} from 'react';
import {
  TouchableHighlight,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Colors} from '../utils/Colors';
import ButtonLabel from './ButtonLabel';
import { Texts } from '../utils/Texts';

export default function CharacterFilterForm({onSearch=(f)=>null}) {
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setFilter(null);
  }, []);

  return (
    <View style={styles.wrap}>
      <TextInput value={filter} placeholder={Texts.Input.characters}
          onChangeText={(v) => setFilter(v)}
          style={styles.input}/>

      <TouchableHighlight underlayColor={Colors.white}
          style={styles.inputWrap}
          onPress={() => onSearch(filter)}>
        <ButtonLabel value={Texts.Buttons.search} size={22}/>
      </TouchableHighlight>
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    padding:10,
    width:screen.width - 20,
    borderRadius:15,
    borderWidth:4,
    borderColor:Colors.black,
    alignItems:'center',
    marginVertical:5,
    backgroundColor:Colors.orange,
    flexDirection:'row',
  },
  inputWrap:{
    borderRadius:10,
    padding:5
  },
  input:{
    backgroundColor:Colors.white,
    borderRadius:10,
    borderWidth:3,
    borderColor:Colors.black,
    width:(screen.width - 20) * 0.6,
    marginRight:(screen.width - 20) * 0.045,
    paddingHorizontal:20,
    fontFamily:'EncodeSans-Medium',
  },
});