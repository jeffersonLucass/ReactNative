import { NavigatorScreenParams } from '@react-navigation/native';
import { LinhaOnibus } from '../types/onibus';

export type ParametrosNavegacaoLinhas = {
  Lista: undefined;
  Detalhes: { linha: LinhaOnibus };
};

export type ParametrosAbas = {
  Inicio: undefined;
  Linhas: NavigatorScreenParams<ParametrosNavegacaoLinhas> | undefined;
  Analises: undefined;
};
