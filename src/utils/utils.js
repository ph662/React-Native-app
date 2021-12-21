import {MOEDA_REAL} from './constantes';

export const formatarMoedaReal = valor => {
  return valor
    .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    .replace(MOEDA_REAL, '');
};
export const formatarMoedaRealComCifrao = valor => {
  return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
};

export const formatNumericStringToDecimalString = string => {
  if (string) {
    const clearValue = string.replace(/[^\w\s]/gi, '');
    const newValue = `${clearValue.substring(
      0,
      clearValue.length - 2,
    )}.${clearValue.substring(clearValue.length - 2, clearValue.length)}`;
    return newValue;
  }

  return string;
};

export const formatStringToPtBrLocaleValueFormat = string => {
  if (string) {
    return Number(string)
      .toFixed(2)
      .toString()
      .split('.')
      .join(',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '0,00';
};

const keepOnlyNumbers = string => {
  if (string) {
    return string.replace(/\D+/g, '');
  }

  return string;
};

export const onChangeInputMoney = text => {
  const formatText = keepOnlyNumbers(text);
  const index = formatText.length - 2;
  return (
    formatText.substring(0, index) +
    '.' +
    formatText.substring(index, formatText.length)
  );
};
