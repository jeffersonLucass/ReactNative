export const formatarNumero = (valor: number) => valor.toLocaleString('pt-BR');

export const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
