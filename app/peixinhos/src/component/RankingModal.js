import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { postRanking } from '../service/RankingService';
import Button from './Button';
import Label from './Label';
import Modal from './Modal';

export default function RankingModal({
                                  onClose=()=>null, 
                                  show=false,
                                  points=0,
                                  game=''
                                }){
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  
  const handleSubmit = () => {
    if(points !== null && points > 0){
      if(player && player !== null){
        setLoading(true);

        let body = {
          player:player,
          game:game,
          score:points,
        };

        postRanking(body).then(response => {
          if(response && response !== null && response.status == 200){
            setLoading(false);

            onClose();
          } else {
            setErr('Houve um erro ao tentar enviar para o ranking! Tente novamente mais tarde!');    
          }
        });
      } else {
        setErr('Preencha seu nome para o ranking!');
        setLoading(false);
      }
    } else {
      onClose();
    }
  }

  const renderErr = () => {
    if(err && err !== null)
      return <Label value={err}/>

    return <></>;
  }

  if(show === true){
    return (
      <Modal onClose={onClose} 
        closable={true}
        content={
          <View style={styles.wrap}>
            <Label value='Informe seu nome de usuário para o ranking:'
              size={18}/>

            <TextInput 
              onSubmitEditing={handleSubmit}
              autoFocus={true}
              value={player}
              onChangeText={setPlayer}
              style={[styles.input, err && err !== null ? styles.inputErr : {}]}
            />

            {renderErr()}

            <View style={styles.legendWrap}>
              <Label value={`Jogo:\n${game}`} size={14}/>
              <Label value={`Score:\n${points} pontos`} size={14}/>
            </View>

            <Button label='Salvar' action={handleSubmit}
              loading={loading}/>
          </View>
        }
      />
    );
  } else {
    return <></>
  }
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  input:{
    borderWidth:4,
    borderRadius:10,
    borderColor:Colors.black,
    backgroundColor:Colors.white,
    color:Colors.black,
    marginVertical:10,
    fontSize:16,
    paddingHorizontal:10
  },
  inputErr:{
    borderColor:'red'
  },
  legendWrap:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10
  }
});