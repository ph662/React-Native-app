import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InvestimentoService from '../../services/investimentoService';
import {formatarMoedaReal} from '../../utils/utils.js';
import Cabecalho from '../../componentes/cabecalho';
import {INVESTIMENTOS_STRING} from '../../utils/constantes';

const HomePage = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fazerRequest().then(data => setData(data));
  }, []);

  const Card = ({item, onPress}) => {
    let indicadorCarencia = item.indicadorCarencia.toUpperCase() === 'S';

    return (
      <TouchableOpacity
        style={styles.item}
        disabled={indicadorCarencia}
        onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.saldo}>{formatarMoedaReal(item.saldoTotal)}</Text>
        </View>
        <Text style={styles.objetivo}>{item.objetivo}</Text>
      </TouchableOpacity>
    );
  };

  const fazerRequest = async () => {
    return await new InvestimentoService().getInvestimentoRequest();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    item: {
      width: '100%',
      height: 80,
      backgroundColor: '#fff',
      marginVertical: 1,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        height: 1,
      },
      padding: 7,
      elevation: 5,
    },
    square: {
      position: 'absolute',
      width: '100%',
      height: 3,
      backgroundColor: 'yellow',
    },
    saldo: {
      fontSize: 20,
      maxHeight: 400,
      textAlign: 'right',
      flex: 1,
    },
    nome: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      flex: 1,
    },
    objetivo: {
      fontSize: 17,
      alignSelf: 'flex-start',
      marginTop: 1,
    },
  });

  const renderItem = ({item}) => {
    return (
      <View>
        <Card
          item={item}
          onPress={() => navigation.navigate('DadosInvestimentos', {item})}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.square} />
      <Cabecalho item={INVESTIMENTOS_STRING}> </Cabecalho>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default HomePage;
