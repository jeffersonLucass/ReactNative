import { LinhaOnibus } from '../types/onibus';

export const linhasOnibus: LinhaOnibus[] = [
  { id: '0.030', origem: 'Rodoviaria do Plano Piloto', destino: 'UnB / Campus Darcy Ribeiro', quantidadeOnibus: 18, passageiros: 12840, tempoMedio: 42, atrasos: 18, ocupacao: 84, arrecadacao: 38520 },
  { id: '0.108', origem: 'Taguatinga Centro', destino: 'Asa Sul / W3 Sul', quantidadeOnibus: 14, passageiros: 9640, tempoMedio: 51, atrasos: 24, ocupacao: 76, arrecadacao: 28920 },
  { id: '0.116', origem: 'Ceilandia Centro', destino: 'Rodoviaria do Plano Piloto', quantidadeOnibus: 22, passageiros: 15320, tempoMedio: 68, atrasos: 31, ocupacao: 91, arrecadacao: 45960 },
  { id: '0.167', origem: 'Samambaia Sul', destino: 'Aguas Claras', quantidadeOnibus: 11, passageiros: 7340, tempoMedio: 38, atrasos: 12, ocupacao: 69, arrecadacao: 22020 },
  { id: '0.220', origem: 'Planaltina', destino: 'Sobradinho', quantidadeOnibus: 9, passageiros: 5210, tempoMedio: 47, atrasos: 28, ocupacao: 63, arrecadacao: 15630 },
];
