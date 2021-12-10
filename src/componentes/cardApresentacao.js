import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INVESTIMENTOS_STRING, MOEDA_REAL } from '../utils/constantes';

const CardApresentacao = (props) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            marginVertical: 0.5,
        }
    });

    let descricao = props.item[0];

    let valor = "";

    if (descricao.toUpperCase().includes("SALDO")) {
        valor = MOEDA_REAL + "" + props.item[1];
    } else {
        valor = props.item[1];
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, textAlign: 'left', flex: 1, fontWeight: 'bold' }}> {descricao} </Text>
                <Text style={{ fontSize: 17, textAlign: 'right', flex: 1 }}> {valor} </Text>
            </View>
        </View>
    );
}

export default CardApresentacao;