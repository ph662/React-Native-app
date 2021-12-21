import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {formatStringToPtBrLocaleValueFormat} from '../utils/utils';

const CardForm = props => {
  const {acaoValorFormatado, accessibilityLabel, onPress, index, value} = props.item;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      marginVertical: 0.5,
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={{fontSize: 17, textAlign: 'left', flex: 1}}
        value={`R$ ${formatStringToPtBrLocaleValueFormat(value)}`}
        onChangeText={value => onPress(value, index, acaoValorFormatado)}
        accessibilityLabel={accessibilityLabel}
        keyboardType="numeric"
      />
    </View>
  );
};

export default CardForm;
