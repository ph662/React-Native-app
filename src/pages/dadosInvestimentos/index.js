/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
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
  BTN_CONFIRMAR_RESGATE,
} from '../../utils/constantes';
import {
  formatarMoedaReal,
  formatarMoedaRealComCifrao,
  onChangeInputMoney,
} from '../../utils/utils';
import Big from 'big.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const DadosInvestimentosPage = props => {
  const data = props.route.params.item;
  const [valores, setValores] = useState([
    { value: 0.0, index: 0 },
    { value: 0.0, index: 1 },
    { value: 0.0, index: 2 },
    { value: 0.0, index: 3 },
    { value: 0.0, index: 4 },
  ]);

  const [modalErroVisivel, setModalErroVisivel] = useState(false);
  const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);
  const [actions, setActions] = useState([]);
  const [erroResgate, setErroResgate] = useState([]);
  let erros = [];

  useEffect(() => {
    dataActionsFormatter();
  }, []);

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
      backgroundColor: COR_AMARELO,
    },
    inputContainer: {
      alignItems: 'center',
      backgroundColor: COR_AMARELO,
      padding: 15,
    },
    saveButtonText: {
      fontSize: 19,
      color: COR_AZUL,
    },
    tituloModal: {
      fontSize: 27,
      textAlign: 'center',
      color: COR_AZUL,
      marginTop: 15,
    },
    msgModal: {
      fontSize: 14,
      textAlign: 'left',
      color: COR_AZUL,
      marginTop: 10,
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
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textStyle: {
      color: COR_AZUL,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
    },
  });

  const handleInput = (value, index) => {
    valores.forEach(item => {
      if (item.index === index) {
        const replaceValue = onChangeInputMoney(value);
        if (value !== '') {
          item.value = replaceValue;
          return;
        }
        item.value = 0.0;
      }
    });

    dataActionsFormatter();
  };

  const getTotal = () => {
    let valorTotalInicial = 0;
    valores.forEach(item => {
      valorTotalInicial = Number(valorTotalInicial) + Number(item.value);
    });
    return valorTotalInicial;
  };

  const voltarHome = () => {
    navigation.navigate('Home');
  };

  const dataActionsFormatter = () => {
    let actions = [];
    data.acoes.map((item, index) => {
      const valor = valores.filter(valueIndex => valueIndex.index === index);
      const obj = {
        acaoValorFormatado: retornarAcaoValorFormatado(item),
        id: item.id,
        index: index,
        value: valor[0].value,
        nome: item.nome,
        percentual: item.percentual,
        onPress: handleInput,
        accessibilityLabel: 'Informe valor de resgate',
      };
      actions.push(obj);
    });

    setActions(actions);
  };

  useEffect(() => {
    dataActionsFormatter();
  }, []);

  const retornarAcaoValorFormatado = item => {
    let bigSaldoTotal = new Big(data.saldoTotal);
    let bigPercentual = new Big(item.percentual);
    let bigAcaoValor = new Big(
      bigSaldoTotal.times(bigPercentual.div(100)),
    ).toFixed(2);
    return Number(bigAcaoValor);
  };

  const abrirModalConfirmacao = () => {
    setErroResgate(erros);
    if (erros.length > 0) {
      setModalSucessoVisivel(false);
      setModalErroVisivel(true);
      return;
    }
    setModalErroVisivel(false);
    setModalSucessoVisivel(true);
  };

  const renderItem = ({ item }) => {
    if (item.value > retornarAcaoValorFormatado(item)) {
      const erro = erros.filter(itemA => itemA !== item);
      const obj = [...erro, item];
      erros = obj;
    } else {
      const erro = erros.filter(itemA => itemA !== item);
      erros = erro;
    }

    let erroValorMaior = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 13, textAlign: 'left', flex: 1, color: 'red' }}>
          {' '}
          {`${ERRO_VALOR_MAIOR} ${formatarMoedaRealComCifrao(
            item.acaoValorFormatado,
          )}`}
        </Text>
      </View>
    );

    let acaoNome = item.nome;

    return (
      <View>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'left',
                flex: 1,
                fontWeight: 'bold',
              }}>
              {' '}
              {ACAO_STRING}{' '}
            </Text>
            <Text
              numberOfLines={1}
              style={{ fontSize: 17, textAlign: 'right', flex: 1 }}>
              {' '}
              {acaoNome}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'left',
                flex: 1,
                fontWeight: 'bold',
              }}>
              {' '}
              {SALDO_ACUMULADO_STRING}{' '}
            </Text>
            <Text style={{ fontSize: 17, textAlign: 'right', flex: 1 }}>
              {' '}
              {formatarMoedaRealComCifrao(item.acaoValorFormatado)}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'left',
                flex: 1,
                color: COR_AZUL,
              }}>
              {' '}
              {VALOR_RESGATAR}{' '}
            </Text>
          </View>

          <CardForm item={item} />
          {item.value > retornarAcaoValorFormatado(item)
            ? erroValorMaior
            : null}
        </View>
        <View style={{ backgroundColor: '#f2f2f2', marginBottom: 15 }} />
      </View>
    );
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
        statusBarTranslucent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.tituloModal}>{MSG_DADOS_INVALIDOS}</Text>
            <Text style={styles.msgModal}>{MSG_ERRO_RESGATE}</Text>
            {
              erroResgate.map((item) => (
                <Text style={styles.msgModal}>{`${item.nome}: ${formatarMoedaRealComCifrao(item.acaoValorFormatado)}`}</Text>
              )
              )
            }
            <TouchableWithoutFeedback
              onPress={() => {
                setModalErroVisivel(false);
              }}>
              <View style={styles.btnNovoResgate}>
                <Text style={styles.textStyle}>{BTN_CORRIGIR}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <Cabecalho item={DADOS_DO_INVESTIMENTO_STRING}> </Cabecalho>

        <CardApresentacao item={[NOME_STRING, data.nome]} />
        <CardApresentacao
          item={[
            SALDO_TOTAL_DISPONIVEL_STRING,
            formatarMoedaReal(data.saldoTotal),
          ]}
        />

        <Cabecalho item={RESGATE_DO_SEU_JEITO_STRING}> </Cabecalho>

        {actions.length > 0 && (
          <FlatList data={actions} renderItem={renderItem} />
        )}

        <CardApresentacao
          item={[
            'Valor total a resgatar',
            formatarMoedaRealComCifrao(getTotal()),
          ]}
        />

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