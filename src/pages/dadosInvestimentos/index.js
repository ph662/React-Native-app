import React, { useState } from 'react';
import { View, FlatList, Text, Modal, ImageBackground, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Cabecalho from '../../componentes/cabecalho';
import { useNavigation } from '@react-navigation/native';
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
    ERRO_VALOR_MAIOR,
    MSG_SUCESSO_RESGATE,
    MSG_RESGATE_EFETUADO,
    MSG_ERRO_RESGATE,
    MSG_DADOS_INVALIDOS,
    COR_AZUL,
    COR_BRANCO,
    COR_AMARELO,
    BTN_NOVO_RESGATE,
    BTN_CORRIGIR,
    BTN_CONFIRMAR_RESGATE
} from '../../utils/constantes';
import Utils from '../../utils/utils';
import Big from 'big.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


const DadosInvestimentosPage = (props) => {

    const [valores, setValores] = useState([]);
    const [erro, setErro] = useState([]);
    console.log()
    const [loading, setLoading] = useState(false);
    const [modalErroVisivel, setModalErroVisivel] = useState(false);
    const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: COR_BRANCO,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            marginVertical: 0.5,
        },
        square: {
            position: 'absolute',
            width: '100%',
            height: 3,
            backgroundColor: COR_AMARELO
        },
        inputContainer: {
            alignItems: 'center',
            backgroundColor: COR_AMARELO,
            padding: 15
        },
        saveButtonText: {
            fontSize: 19,
            color: COR_AZUL
        },
        tituloModal: {
            fontSize: 27,
            textAlign: 'center',
            color: COR_AZUL,
            marginTop: 15
        },
        msgModal: {
            fontSize: 14,
            textAlign: 'left',
            color: COR_AZUL,
            marginTop: 10
        },
        btnNovoResgate: {
            backgroundColor: COR_AMARELO,
            width: '100%',
            padding: 10,
            alignItems: 'center',
            marginTop: 30,
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        textStyle: {
            color: COR_AZUL,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20
        },
    });

    let utils = new Utils();

    const data = props.route.params.item;

    const handleInput = (value, index, acaoValorFormatado) => {
        setLoading(true)
        const verifyIndex = valores.filter((item) => item.index === index);

        if (verifyIndex.length > 0) {

            const verifyDiffIndex = valores.filter((item) => item.index !== index);
            const obj = [
                ...verifyDiffIndex,
                { value, index }
            ]

            const verifyIndexErro = obj.filter((item) => item.index === index);
            if (verifyIndexErro[0].value > acaoValorFormatado) {
                const verifyDiffIndex = erro.filter((item) => item !== index);
                const erros = [
                    ...verifyDiffIndex,
                    { value: index }
                ]

                console.log("increment")
                setErro(erros);
                return;
            }

            if (erro.filter((item) => item.value === index).length > 0) {
                const a = erro.filter((item) => item.value !== index);
                console.log("decremetn")
                setErro(a);
            }

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
    const voltarHome = () => {
        navigation.navigate('Home')
    }

    const getDataActions = () => {

        let actions = [];
        data.acoes.map((item, index) => {

            const obj = {
                acaoValorFormatado: retornarAcaoValorFormatado(item),
                id: item.id,
                index: index,
                nome: item.nome,
                percentual: item.percentual,
                onPress: handleInput,
                accessibilityLabel: 'Informe valor de resgate',
                erro: false,
            }
            actions.push(obj);
        })

        return actions;
    }

    const retornarAcaoValorFormatado = (item) => {
        let bigSaldoTotal = new Big(data.saldoTotal);
        let bigPercentual = new Big(item.percentual);
        let bigAcaoValor = new Big(bigSaldoTotal.times(bigPercentual.div(100))).toFixed(2);
        return (Number(bigAcaoValor));
    }

    const abrirModalConfirmacao = () => {
        setModalSucessoVisivel(true)
        // setModalErroVisivel(true);
    }

    const renderItem = ({ item }) => {

        let erroValorMaior = <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, textAlign: 'left', flex: 1, color: 'red' }}> {ERRO_VALOR_MAIOR + item.acaoValorFormatado} </Text>
        </View>

        let acaoNome = item.nome;

        // let erro = '';
        // so consegui setar true no item.erro
        // quando eu vou pra outro campo ele sobrescreve todos, ai fica sempre SÓ 1 TRUE
        // if(erro.contains(item.index)) {
        //     item.erro = indexoi.value === item.index;
        // }

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
                        <Text style={{ fontSize: 17, textAlign: 'right', flex: 1 }}> {utils.formatarMoedaRealComCifrao(item.acaoValorFormatado)} </Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, textAlign: 'left', flex: 1, color: COR_AZUL }}> {VALOR_RESGATAR} </Text>
                    </View>

                    <CardForm item={item}></CardForm>
                    {item.erro ? erroValorMaior : null}
                </View>
                <View style={{ backgroundColor: '#f2f2f2', marginBottom: 15 }}></View>
            </View>
        );
    };

    var modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };

    return (

        <SafeAreaView>

            <View style={styles.square} />

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalSucessoVisivel}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.tituloModal}>{MSG_RESGATE_EFETUADO}</Text>
                        <Text style={styles.msgModal}>{MSG_SUCESSO_RESGATE}</Text>
                        <TouchableWithoutFeedback onPress={voltarHome}>
                            <View style={styles.btnNovoResgate}>
                                <Text style={styles.textStyle}>{BTN_NOVO_RESGATE}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalErroVisivel}
                statusBarTranslucent={true} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.tituloModal}>{MSG_DADOS_INVALIDOS}</Text>
                        <Text style={styles.msgModal}>{MSG_ERRO_RESGATE}</Text>
                        <TouchableWithoutFeedback onPress={() => { setModalErroVisivel(false) }}>
                            <View style={styles.btnNovoResgate}>
                                <Text style={styles.textStyle}>{BTN_CORRIGIR}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <Cabecalho item={DADOS_DO_INVESTIMENTO_STRING}> </Cabecalho>

                <CardApresentacao item={[NOME_STRING, data.nome]}></CardApresentacao>
                <CardApresentacao item={[SALDO_TOTAL_DISPONIVEL_STRING, utils.formatarMoedaReal(data.saldoTotal)]}></CardApresentacao>

                <Cabecalho item={RESGATE_DO_SEU_JEITO_STRING}> </Cabecalho>

                <FlatList data={getDataActions()} renderItem={renderItem} />

                <CardApresentacao item={["Valor total a resgatar", utils.formatarMoedaRealComCifrao(getTotal())]}></CardApresentacao>

                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={abrirModalConfirmacao}>
                        <Text style={styles.saveButtonText}>{BTN_CONFIRMAR_RESGATE}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DadosInvestimentosPage;