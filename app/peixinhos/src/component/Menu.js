import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/Colors';
import Button from './Button';

export default function Menu({navigation}) {
  return (
    <View style={styles.wrap}>
      <Button label='Vamos jogar!'
          action={() => navigation.navigate('Games')}/>

      <Button label='Bíblia' color={Colors.blue}
          action={() => navigation.navigate('Bible')}/>

      <Button label='Sobre' color={Colors.lightGreen}
          action={() => navigation.navigate('About')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
  },
});