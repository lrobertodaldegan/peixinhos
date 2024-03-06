import React, {useState} from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors } from "../utils/Colors";


export default function DiffGameBlockOpt({
                                      index, 
                                      card,
                                      onSelectionValidate=(i)=>null
                                    }){
  const [selected, setSelected] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleSelection = () => {
    let ok = onSelectionValidate(index, card);

    setSelected(true);
    setCorrect(ok);
  }

  return (
    <TouchableHighlight
        style={[
          styles.diffBlocks, 
          selected === true
            ? {backgroundColor:correct === true ? Colors.green : Colors.orange}
            : {},
        ]}
        underlayColor='transparent' onPress={handleSelection}>
      <></>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  diffBlocks:{
    height:(screen.width * 0.83) * 0.25,
    width:(screen.width * 0.83) * 0.25,
    opacity:0.2,
  },
});