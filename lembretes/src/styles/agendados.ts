import { StyleSheet } from 'react-native';

export const estilosAgendados = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  tituloCartao: { fontWeight: '600', fontSize: 16 },
  vazio: { textAlign: 'center', color: '#888', marginTop: 40 },
  cancelarTodos: { textAlign: 'center', padding: 16 },
});