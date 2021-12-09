import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import Cabecalho from '../../componentes/cabecalho';
import { RESGATE_DO_SEU_JEITO_STRING, DADOS_DO_INVESTIMENTO_STRING } from '../../utils/constantes';

const DadosInvestimentosPage = () => {
    return (
        <View>
            <Cabecalho item={DADOS_DO_INVESTIMENTO_STRING}> </Cabecalho>

            <Cabecalho item={RESGATE_DO_SEU_JEITO_STRING}> </Cabecalho>
        </View>
    );
};

export default DadosInvestimentosPage;