import { StyleSheet } from 'react-native';

export const estilosCadastro = StyleSheet.create({
  rotulo: { marginTop: 12, marginBottom: 4, color: '#555' },
  campo: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  linha: { flexDirection: 'row', gap: 8 },
  opcao: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  opcaoAtiva: { backgroundColor: '#cfe3ff', borderColor: '#6aa0f0' },
  botao: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginTop: 24, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '600' },
});