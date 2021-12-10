import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INVESTIMENTOS_STRING, MOEDA_REAL } from '../utils/constantes';

const Cabecalho = (props) => {

    const styles = StyleSheet.create({
        containerCabecalho: {
            backgroundColor: '#f2f2f2',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            marginTop: 10,
            marginBottom: 10,
        }
    });

    let isInvestimentos = props.item.toUpperCase() === INVESTIMENTOS_STRING;

    let textSimboloReal = isInvestimentos ? <Text style={{ fontSize: 17, textAlign: 'right', flex: 1 }}> {MOEDA_REAL} </Text> : <View></View>;

    return (
        <View style={styles.containerCabecalho}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, textAlign: 'left', flex: 1 }}> {props.item} </Text>
                {textSimboloReal}
            </View>
        </View>
    );
}

export default Cabecalho;