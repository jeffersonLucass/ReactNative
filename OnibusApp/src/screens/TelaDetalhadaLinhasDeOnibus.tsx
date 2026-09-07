import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ParametrosNavegacaoLinhas } from '../navigation/types';
import { cores } from '../theme/cores';
import { formatarMoeda, formatarNumero } from '../utils/formatters';

type Props = NativeStackScreenProps<ParametrosNavegacaoLinhas, 'Detalhes'>;

export function TelaDetalhesLinha({ route }: Props) {
  const { linha } = route.params;
  const details = [
    ['Passageiros no dia', formatarNumero(linha.passageiros)],
    ['Tempo medio das viagens', `${linha.tempoMedio} minutos`],
    ['Percentual de atrasos', `${linha.atrasos}%`],
    ['Ocupacao media', `${linha.ocupacao}%`],
    ['Arrecadacao estimada', formatarMoeda(linha.arrecadacao)],
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>DETALHE DA LINHA</Text>
        <Text style={styles.code}>{linha.id}</Text>
        <Text style={styles.route}>{linha.origem}</Text>
        <Text style={styles.route}>ate {linha.destino}</Text>
      </View>
      <View style={styles.panel}>
        {details.map(([label, value]) => (
          <View key={label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Frota em operacao</Text>
        <Text style={styles.infoValue}>{linha.quantidadeOnibus} onibus</Text>
        <Text style={styles.mutedText}>Dados ficticios armazenados localmente para o desafio.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: cores.fundo },
  content: { paddingBottom: 28 },
  header: { backgroundColor: cores.azulEscuro, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 28 },
  eyebrow: { color: cores.amarelo, fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  code: { color: cores.branco, fontSize: 36, fontWeight: '800', marginTop: 10 },
  route: { color: '#D5E2E5', fontSize: 14, marginTop: 4 },
  panel: { backgroundColor: cores.branco, borderRadius: 12, marginHorizontal: 20, paddingHorizontal: 16, marginTop: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: cores.borda },
  detailLabel: { color: cores.textoSuave, fontSize: 13 },
  detailValue: { color: cores.azulEscuro, fontSize: 15, fontWeight: '800' },
  infoBox: { backgroundColor: cores.verdeAguaClaro, borderRadius: 12, margin: 20, padding: 18 },
  infoTitle: { color: '#2C6E65', fontSize: 13, fontWeight: '700' },
  infoValue: { color: cores.azulEscuro, fontSize: 26, fontWeight: '800', marginVertical: 5 },
  mutedText: { color: cores.textoSuave, fontSize: 12, marginTop: 4 },
});
