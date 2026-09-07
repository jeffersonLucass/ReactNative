import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { linhasOnibus } from '../data/LinhasDeOnibus';
import { MetricCard } from '../components/MetricCard';
import { SectionTitle } from '../components/SectionTitle';
import { cores } from '../theme/cores';
import { formatarNumero } from '../utils/formatters';
import { ParametrosNavegacaoLinhas, ParametrosAbas } from '../navigation/types';

type DashboardNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<ParametrosAbas, 'Inicio'>,
  NativeStackNavigationProp<ParametrosNavegacaoLinhas>
>;

type Props = { navigation: DashboardNavigation };

export function TelaPainel({ navigation }: Props) {
  const linhasMaisMovimentadas = [...linhasOnibus].sort((a, b) => b.passageiros - a.passageiros).slice(0, 3);
  const linhasMaisAtrasadas = [...linhasOnibus].sort((a, b) => b.atrasos - a.atrasos).slice(0, 3);
  const mostrarDetalhes = (idLinha: string) => {
    const linha = linhasOnibus.find((item) => item.id === idLinha);
    if (linha) navigation.navigate('Linhas', { screen: 'Detalhes', params: { linha } });
  };
  const dataHoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>DF ONIBUS</Text>
        <Text style={styles.heroTitle}>Visao geral da operacao</Text>
        <Text style={styles.heroSubtitle}>Dados consolidados de {dataHoje}</Text>
      </View>
      <SectionTitle title="Indicadores gerais" />
      <View style={styles.metricsGrid}>
        <MetricCard label="Linhas ativas" value="42" accent={cores.amarelo} />
        <MetricCard label="Onibus em operacao" value="386" accent={cores.verdeAgua} />
        <MetricCard label="Passageiros hoje" value="184 mil" accent={cores.coral} />
        <MetricCard label="Atrasos medios" value="22%" accent={cores.azul} />
      </View>
      <SectionTitle title="Mais passageiros" action="Hoje" />
      <View style={styles.panel}>
        {linhasMaisMovimentadas.map((linha, index) => (
          <Pressable key={linha.id} style={styles.rankRow} onPress={() => mostrarDetalhes(linha.id)}>
            <Text style={styles.rankNumber}>{index + 1}</Text>
            <View style={styles.rankInfo}>
              <Text style={styles.lineCode}>{linha.id}</Text>
              <Text style={styles.mutedText}>{linha.origem} - {linha.destino}</Text>
            </View>
            <Text style={styles.rankValue}>{formatarNumero(linha.passageiros)}</Text>
          </Pressable>
        ))}
      </View>
      <SectionTitle title="Linhas com mais atrasos" action="Percentual" />
      <View style={styles.panel}>
        {linhasMaisAtrasadas.map((linha) => (
          <Pressable key={linha.id} style={styles.delayRow} onPress={() => mostrarDetalhes(linha.id)}>
            <View style={styles.rankInfo}>
              <Text style={styles.lineCode}>{linha.id}</Text>
              <Text style={styles.mutedText}>{linha.origem} - {linha.destino}</Text>
            </View>
            <Text style={styles.delayValue}>{linha.atrasos}%</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: cores.fundo },
  content: { paddingBottom: 28 },
  hero: { backgroundColor: cores.azulEscuro, paddingHorizontal: 20, paddingTop: 58, paddingBottom: 26 },
  eyebrow: { color: cores.amarelo, fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  heroTitle: { color: cores.branco, fontSize: 28, fontWeight: '800', marginTop: 8 },
  heroSubtitle: { color: '#C5D5DB', fontSize: 14, marginTop: 8 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  panel: { backgroundColor: cores.branco, borderRadius: 12, marginHorizontal: 20, paddingHorizontal: 16, shadowColor: cores.azulEscuro, shadowOpacity: 0.05, shadowRadius: 8, elevation: 1 },
  rankRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: cores.borda },
  rankNumber: { color: cores.coral, fontSize: 18, fontWeight: '800', width: 28 },
  rankInfo: { flex: 1 },
  lineCode: { color: cores.azulEscuro, fontSize: 15, fontWeight: '800' },
  mutedText: { color: cores.textoSuave, fontSize: 12, marginTop: 4 },
  rankValue: { color: cores.azulEscuro, fontSize: 14, fontWeight: '700' },
  delayRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: cores.borda },
  delayValue: { color: cores.coral, fontSize: 16, fontWeight: '800' },
});
