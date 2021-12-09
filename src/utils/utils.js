import { MOEDA_REAL } from "./constantes";

export default class Utils {
    formatarMoedaReal (valor) {
        return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace(MOEDA_REAL,'');
    }
}