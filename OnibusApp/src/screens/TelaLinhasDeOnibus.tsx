import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { linhasOnibus } from '../data/LinhasDeOnibus';
import { ParametrosNavegacaoLinhas } from '../navigation/types';
import { cores } from '../theme/cores';
import { formatarNumero } from '../utils/formatters';

type Props = NativeStackScreenProps<ParametrosNavegacaoLinhas, 'Lista'>;

export function TelaLinhas({ navigation }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Linhas de onibus</Text>
      <Text style={styles.pageSubtitle}>Selecione uma linha para consultar os detalhes.</Text>
      {linhasOnibus.map((linha) => (
        <Pressable key={linha.id} style={styles.lineCard} onPress={() => navigation.navigate('Detalhes', { linha })}>
          <View style={styles.lineCardTop}>
            <View>
              <Text style={styles.lineCodeLarge}>{linha.id}</Text>
              <Text style={styles.route}>{linha.origem}</Text>
              <Text style={styles.route}>ate {linha.destino}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
          <View style={styles.lineStats}>
            <Text style={styles.statText}><Text style={styles.statStrong}>{linha.quantidadeOnibus}</Text> onibus</Text>
            <Text style={styles.statText}><Text style={styles.statStrong}>{formatarNumero(linha.passageiros)}</Text> passageiros</Text>
            <Text style={styles.statText}><Text style={styles.statStrong}>{linha.tempoMedio} min</Text> medio</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: cores.fundo },
  content: { paddingBottom: 28 },
  pageTitle: { color: cores.azulEscuro, fontSize: 28, fontWeight: '800', marginHorizontal: 20, marginTop: 28 },
  pageSubtitle: { color: cores.texto, fontSize: 14, marginHorizontal: 20, marginTop: 7, marginBottom: 22 },
  lineCard: { backgroundColor: cores.branco, borderRadius: 12, marginHorizontal: 20, marginBottom: 12, padding: 17, shadowColor: cores.azulEscuro, shadowOpacity: 0.05, shadowRadius: 8, elevation: 1 },
  lineCardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  lineCodeLarge: { color: cores.azulEscuro, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  route: { color: cores.texto, fontSize: 13, lineHeight: 20 },
  chevron: { color: cores.coral, fontSize: 34, fontWeight: '300' },
  lineStats: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: cores.borda, marginTop: 15, paddingTop: 13 },
  statText: { color: cores.textoSuave, fontSize: 11 },
  statStrong: { color: cores.azulEscuro, fontSize: 13, fontWeight: '800' },
});
