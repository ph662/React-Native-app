import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Cabecalho from '../../componentes/cabecalho';
import CardApresentacao from '../../componentes/cardApresentacao';
import CardForm from '../../componentes/cardForm';
import {
    RESGATE_DO_SEU_JEITO_STRING,
    DADOS_DO_INVESTIMENTO_STRING,
    ACAO_STRING,
    SALDO_ACUMULADO_STRING,
    NOME_STRING,
    SALDO_TOTAL_DISPONIVEL_STRING,
    VALOR_RESGATAR,
} from '../../utils/constantes';
import Utils from '../../utils/utils';
import Big from 'big.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const DadosInvestimentosPage = (props) => {

    const [valores, setValores] = useState([]);
    const [loading, setLoading] = useState(false);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            marginVertical: 0.5,
        },
        square: {
            position: 'absolute',
            width: '100%',
            height: 3,
            backgroundColor: "yellow"
        },
        inputContainer: {
            alignItems: 'center',
            backgroundColor: 'yellow',
            padding: 15
        },
        saveButtonText: {
            fontSize: 19,
            color: '#3d80f4'
        }
    });

    let utils = new Utils();

    const data = props.route.params.item;



    const handleInput = (value, index) => {
        setLoading(true)
        const verifyIndex = valores.filter((item) => item.index === index);

        if (verifyIndex.length > 0) {
            const verifyDiffIndex = valores.filter((item) => item.index !== index);
            const obj = [
                ...verifyDiffIndex,
                { value, index }
            ]
            setValores(obj);
        } else if (valores.length > 0) {
            const obj = [
                ...valores,
                { value, index }
            ]
            setValores(obj)
        } else {
            setValores([{ value, index }])
        }
        setLoading(false)
    }

    const getTotal = () => {
        let valorTotalInicial = 0;
        valores.forEach((item) => {
            valorTotalInicial = Number(valorTotalInicial) + Number(item.value);
        })
        return valorTotalInicial;
    }

    const getDataActions = () => {

        let actions = [];
        data.acoes.map((item, index) => {
            const getItem = valores.find((item) => item.index === index);
            const verifyValue = getItem ? getItem.value : '0.0'

            const obj = {
                id: item.id,
                index: index,
                nome: item.nome,
                percentual: item.percentual,
                onPress: handleInput,
                accessibilityLabel: 'Informe valor de resgate'
            }
            actions.push(obj);
        })

        return actions;
    }

    const renderItem = ({ item }) => {
        function retornarAcaoValorFormatado() {
            //Calculo com precisao BigDecimal
            let bigSaldoTotal = new Big(data.saldoTotal);
            let bigPercentual = new Big(item.percentual);
            let bigAcaoValor = new Big(bigSaldoTotal.times(bigPercentual.div(100))).toFixed(2);
            return utils.formatarMoedaRealComCifrao(Number(bigAcaoValor));
        }
        let acaoNome = item.nome;
        let acaoValorFormatado = retornarAcaoValorFormatado();

        return (
            <View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, textAlign: 'left', flex: 1, fontWeight: 'bold' }}> {ACAO_STRING} </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, textAlign: 'right', flex: 1 }}> {acaoNome} </Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, textAlign: 'left', flex: 1, fontWeight: 'bold' }}> {SALDO_ACUMULADO_STRING} </Text>
                        <Text style={{ fontSize: 17, textAlign: 'right', flex: 1 }}> {acaoValorFormatado} </Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, textAlign: 'left', flex: 1, color: '#3d80f4' }}> {VALOR_RESGATAR} </Text>
                    </View>

                    <CardForm item={item}></CardForm>

                </View>
                <View style={{ backgroundColor: '#f2f2f2', marginBottom: 15 }}></View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <View style={styles.square} />
            <ScrollView>
                <Cabecalho item={DADOS_DO_INVESTIMENTO_STRING}> </Cabecalho>

                <CardApresentacao item={[NOME_STRING, data.nome]}></CardApresentacao>
                <CardApresentacao item={[SALDO_TOTAL_DISPONIVEL_STRING, utils.formatarMoedaReal(data.saldoTotal)]}></CardApresentacao>

                <Cabecalho item={RESGATE_DO_SEU_JEITO_STRING}> </Cabecalho>

                <FlatList data={getDataActions()} renderItem={renderItem} />

                <CardApresentacao item={["Valor total a resgatar", utils.formatarMoedaRealComCifrao(getTotal())]}></CardApresentacao>

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Confirmar Resgate</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DadosInvestimentosPage;