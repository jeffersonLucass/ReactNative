export type Recorrencia = 'unica' | 'diaria';

export type DadosLembrete = {
  titulo: string;
  descricao: string;
  recorrencia: Recorrencia;
  horario: string; // formato HH:MM
};