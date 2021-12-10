import axios from "axios";
import { API_INVESTIMENTOS } from "../utils/constantes";

export default class InvestimentoService {
    async getInvestimentoRequest() {
        return new Promise(async (resolve, reject) => {
            const url = API_INVESTIMENTOS;
            try {
                const response = await axios.get(url);
                resolve(response.data.response.data.listaInvestimentos);
            } catch (error) {
                reject(new Error('Ocorreu um erro ao recuperar a lista de investimentos'))
            }
        })
    }
}