import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionTitle } from '../components/SectionTitle';
import { linhasOnibus } from '../data/LinhasDeOnibus';
import { cores } from '../theme/cores';
import { formatarMoeda } from '../utils/formatters';

export function TelaAnalises() {
  const arrecadacaoTotal = linhasOnibus.reduce((total, linha) => total + linha.arrecadacao, 0);
  const linhaComMaiorArrecadacao = [...linhasOnibus].sort((a, b) => b.arrecadacao - a.arrecadacao)[0];
  const maiorArrecadacao = linhaComMaiorArrecadacao.arrecadacao;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>Analises</Text>
        <Text style={styles.subtituloCabecalho}>Indicadores financeiros e de desempenho.</Text>
      </View>
      <View style={styles.highlight}>
        <Text style={styles.analysisLabel}>Arrecadacao total estimada</Text>
        <Text style={styles.analysisTotal}>{formatarMoeda(arrecadacaoTotal)}</Text>
        <Text style={styles.analysisHint}>Soma das linhas monitoradas hoje</Text>
      </View>
      <SectionTitle title="Arrecadacao por linha" />
      <View style={styles.panel}>
        {linhasOnibus.map((linha) => (
          <View key={linha.id} style={styles.chartRow}>
            <View style={styles.chartLabelRow}>
              <Text style={styles.lineCode}>{linha.id}</Text>
              <Text style={styles.chartValue}>{formatarMoeda(linha.arrecadacao)}</Text>
            </View>
            <View style={styles.barTrack}><View style={[styles.bar, { width: `${(linha.arrecadacao / maiorArrecadacao) * 100}%` }]} /></View>
          </View>
        ))}
      </View>
      <SectionTitle title="Destaque financeiro" />
      <View style={styles.winnerCard}>
        <Text style={styles.winnerLabel}>Linha com maior arrecadacao</Text>
        <Text style={styles.winnerCode}>{linhaComMaiorArrecadacao.id}</Text>
        <Text style={styles.winnerRoute}>{linhaComMaiorArrecadacao.origem} - {linhaComMaiorArrecadacao.destino}</Text>
        <Text style={styles.winnerRevenue}>{formatarMoeda(linhaComMaiorArrecadacao.arrecadacao)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cabecalho: {backgroundColor: cores.azulEscuro,paddingHorizontal: 20,paddingTop: 60,paddingBottom: 26,},
  tituloCabecalho: {color: cores.branco,fontSize: 28,fontWeight: '800'},
  subtituloCabecalho: {color: '#C5D5DB',fontSize: 14,marginTop: 8},
  screen: { flex: 1, backgroundColor: cores.fundo },
  content: { paddingBottom: 28 },
  pageTitle: { color: cores.azulEscuro, fontSize: 28, fontWeight: '800', marginHorizontal: 20, marginTop: 60 },
  pageSubtitle: { color: cores.texto, fontSize: 14, marginHorizontal: 20, marginTop: 7, marginBottom: 22 },
  highlight: { backgroundColor: cores.azulEscuro, borderRadius: 14, marginHorizontal: 20, padding: 22, marginBottom: 6 , marginTop: 20},
  analysisLabel: { color: '#C5D5DB', fontSize: 13 },
  analysisTotal: { color: cores.branco, fontSize: 30, fontWeight: '800', marginTop: 8 },
  analysisHint: { color: cores.amarelo, fontSize: 12, marginTop: 8 },
  panel: { backgroundColor: cores.branco, borderRadius: 12, marginHorizontal: 20, paddingHorizontal: 16 },
  chartRow: { paddingVertical: 13 },
  chartLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lineCode: { color: cores.azulEscuro, fontSize: 15, fontWeight: '800' },
  chartValue: { color: cores.texto, fontSize: 12, fontWeight: '600' },
  barTrack: { height: 9, backgroundColor: '#E8EFED', borderRadius: 5, overflow: 'hidden' },
  bar: { height: '100%', backgroundColor: cores.verdeAgua, borderRadius: 5 },
  winnerCard: { backgroundColor: cores.branco, borderRadius: 12, marginHorizontal: 20, padding: 18, borderLeftWidth: 5, borderLeftColor: cores.amarelo },
  winnerLabel: { color: cores.textoSuave, fontSize: 12 },
  winnerCode: { color: cores.azulEscuro, fontSize: 28, fontWeight: '800', marginTop: 8 },
  winnerRoute: { color: cores.texto, fontSize: 13, marginTop: 4 },
  winnerRevenue: { color: '#2C6E65', fontSize: 20, fontWeight: '800', marginTop: 14 },
});
