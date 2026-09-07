import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type BusLine = {
  id: string;
  origin: string;
  destination: string;
  buses: number;
  passengers: number;
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
    buses: 18,
    passengers: 12840,
    averageTime: 42,
    delays: 18,
    occupancy: 84,
    revenue: 38520,
  },
  {
    id: '0.108',
    origin: 'Taguatinga Centro',
    destination: 'Asa Sul / W3 Sul',
    buses: 14,
    passengers: 9640,
    averageTime: 51,
    delays: 24,
    occupancy: 76,
    revenue: 28920,
  },
  {
    id: '0.116',
    origin: 'Ceilandia Centro',
    destination: 'Rodoviaria do Plano Piloto',
    buses: 22,
    passengers: 15320,
    averageTime: 68,
    delays: 31,
    occupancy: 91,
    revenue: 45960,
  },
  {
    id: '0.167',
    origin: 'Samambaia Sul',
    destination: 'Aguas Claras',
    buses: 11,
    passengers: 7340,
    averageTime: 38,
    delays: 12,
    occupancy: 69,
    revenue: 22020,
  },
  {
    id: '0.220',
    origin: 'Planaltina',
    destination: 'Sobradinho',
    buses: 9,
    passengers: 5210,
    averageTime: 47,
    delays: 28,
    occupancy: 63,
    revenue: 15630,
  },
];

type RootStackParamList = {
  Linhas: undefined;
  Detalhes: { line: BusLine };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const formatNumber = (value: number) => value.toLocaleString('pt-BR');
const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricAccent, { backgroundColor: accent }]} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function DashboardScreen({ navigation }: { navigation: any }) {
  const busiestLines = [...lines].sort((a, b) => b.passengers - a.passengers).slice(0, 3);
  const delayedLines = [...lines].sort((a, b) => b.delays - a.delays).slice(0, 3);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MOBILIDADE DF</Text>
        <Text style={styles.heroTitle}>Visao geral da operacao</Text>
        <Text style={styles.heroSubtitle}>Dados consolidados de hoje, 07 de setembro</Text>
      </View>

      <SectionTitle title="Indicadores gerais" />
      <View style={styles.metricsGrid}>
        <MetricCard label="Linhas ativas" value="42" accent="#F2B84B" />
        <MetricCard label="Onibus em operacao" value="386" accent="#4AB7A9" />
        <MetricCard label="Passageiros hoje" value="184 mil" accent="#E86D5C" />
        <MetricCard label="Atrasos medios" value="22%" accent="#6B8FD4" />
      </View>

      <SectionTitle title="Mais passageiros" action="Hoje" />
      <View style={styles.panel}>
        {busiestLines.map((line, index) => (
          <Pressable key={line.id} style={styles.rankRow} onPress={() => navigation.navigate('Linhas', { screen: 'Detalhes', params: { line } })}>
            <Text style={styles.rankNumber}>{index + 1}</Text>
            <View style={styles.rankInfo}>
              <Text style={styles.lineCode}>{line.id}</Text>
              <Text style={styles.mutedText}>{line.origin} - {line.destination}</Text>
            </View>
            <Text style={styles.rankValue}>{formatNumber(line.passengers)}</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle title="Linhas com mais atrasos" action="Percentual" />
      <View style={styles.panel}>
        {delayedLines.map((line) => (
          <Pressable key={line.id} style={styles.delayRow} onPress={() => navigation.navigate('Linhas', { screen: 'Detalhes', params: { line } })}>
            <View style={styles.rankInfo}>
              <Text style={styles.lineCode}>{line.id}</Text>
              <Text style={styles.mutedText}>{line.origin} - {line.destination}</Text>
            </View>
            <Text style={styles.delayValue}>{line.delays}%</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function LinesScreen({ navigation }: { navigation: any }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Linhas de onibus</Text>
      <Text style={styles.pageSubtitle}>Selecione uma linha para consultar os detalhes.</Text>
      {lines.map((line) => (
        <Pressable key={line.id} style={styles.lineCard} onPress={() => navigation.navigate('Detalhes', { line })}>
          <View style={styles.lineCardTop}>
            <View>
              <Text style={styles.lineCodeLarge}>{line.id}</Text>
              <Text style={styles.route}>{line.origin}</Text>
              <Text style={styles.route}>ate {line.destination}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
          <View style={styles.lineStats}>
            <Text style={styles.statText}><Text style={styles.statStrong}>{line.buses}</Text> onibus</Text>
            <Text style={styles.statText}><Text style={styles.statStrong}>{formatNumber(line.passengers)}</Text> passageiros</Text>
            <Text style={styles.statText}><Text style={styles.statStrong}>{line.averageTime} min</Text> medio</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function DetailsScreen({ route }: { route: { params: { line: BusLine } } }) {
  const { line } = route.params;
  const details = [
    ['Passageiros no dia', formatNumber(line.passengers)],
    ['Tempo medio das viagens', `${line.averageTime} minutos`],
    ['Percentual de atrasos', `${line.delays}%`],
    ['Ocupacao media', `${line.occupancy}%`],
    ['Arrecadacao estimada', formatCurrency(line.revenue)],
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.detailHeader}>
        <Text style={styles.eyebrow}>DETALHE DA LINHA</Text>
        <Text style={styles.detailCode}>{line.id}</Text>
        <Text style={styles.detailRoute}>{line.origin}</Text>
        <Text style={styles.detailRoute}>ate {line.destination}</Text>
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
        <Text style={styles.infoValue}>{line.buses} onibus</Text>
        <Text style={styles.mutedText}>Dados ficticios armazenados localmente para o desafio.</Text>
      </View>
    </ScrollView>
  );
}

function AnalysesScreen() {
  const totalRevenue = lines.reduce((total, line) => total + line.revenue, 0);
  const bestRevenueLine = [...lines].sort((a, b) => b.revenue - a.revenue)[0];
  const maxRevenue = bestRevenueLine.revenue;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Analises</Text>
      <Text style={styles.pageSubtitle}>Indicadores financeiros e de desempenho.</Text>

      <View style={styles.analysisHighlight}>
        <Text style={styles.analysisLabel}>Arrecadacao total estimada</Text>
        <Text style={styles.analysisTotal}>{formatCurrency(totalRevenue)}</Text>
        <Text style={styles.analysisHint}>Soma das linhas monitoradas hoje</Text>
      </View>

      <SectionTitle title="Arrecadacao por linha" />
      <View style={styles.panel}>
        {lines.map((line) => (
          <View key={line.id} style={styles.chartRow}>
            <View style={styles.chartLabelRow}>
              <Text style={styles.lineCode}>{line.id}</Text>
              <Text style={styles.chartValue}>{formatCurrency(line.revenue)}</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.bar, { width: `${(line.revenue / maxRevenue) * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <SectionTitle title="Destaque financeiro" />
      <View style={styles.winnerCard}>
        <Text style={styles.winnerLabel}>Linha com maior arrecadacao</Text>
        <Text style={styles.winnerCode}>{bestRevenueLine.id}</Text>
        <Text style={styles.winnerRoute}>{bestRevenueLine.origin} - {bestRevenueLine.destination}</Text>
        <Text style={styles.winnerRevenue}>{formatCurrency(bestRevenueLine.revenue)}</Text>
      </View>
    </ScrollView>
  );
}

function LinesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Linhas" component={LinesScreen} options={{ title: 'Linhas' }} />
      <Stack.Screen name="Detalhes" component={DetailsScreen} options={{ title: 'Detalhes da linha' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#163B52', tabBarInactiveTintColor: '#8A9AA3', tabBarLabelStyle: styles.tabLabel }}>
        <Tab.Screen name="Inicio" component={DashboardScreen} />
        <Tab.Screen name="Linhas" component={LinesStack} />
        <Tab.Screen name="Analises" component={AnalysesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F7F6' },
  content: { paddingBottom: 28 },
  hero: { backgroundColor: '#163B52', paddingHorizontal: 20, paddingTop: 58, paddingBottom: 26 },
  eyebrow: { color: '#F2B84B', fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginTop: 8 },
  heroSubtitle: { color: '#C5D5DB', fontSize: 14, marginTop: 8 },
  pageTitle: { color: '#163B52', fontSize: 28, fontWeight: '800', marginHorizontal: 20, marginTop: 28 },
  pageSubtitle: { color: '#65747C', fontSize: 14, marginHorizontal: 20, marginTop: 7, marginBottom: 22 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 24, marginBottom: 12 },
  sectionTitle: { color: '#163B52', fontSize: 18, fontWeight: '800' },
  sectionAction: { color: '#71838B', fontSize: 12, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  metricCard: { backgroundColor: '#FFFFFF', borderRadius: 12, width: '48%', minHeight: 112, padding: 15, shadowColor: '#163B52', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  metricAccent: { width: 24, height: 4, borderRadius: 4, marginBottom: 16 },
  metricValue: { color: '#163B52', fontSize: 22, fontWeight: '800' },
  metricLabel: { color: '#71838B', fontSize: 12, marginTop: 5 },
  panel: { backgroundColor: '#FFFFFF', borderRadius: 12, marginHorizontal: 20, paddingHorizontal: 16, shadowColor: '#163B52', shadowOpacity: 0.05, shadowRadius: 8, elevation: 1 },
  rankRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EDF1F0' },
  rankNumber: { color: '#E86D5C', fontSize: 18, fontWeight: '800', width: 28 },
  rankInfo: { flex: 1 },
  lineCode: { color: '#163B52', fontSize: 15, fontWeight: '800' },
  mutedText: { color: '#71838B', fontSize: 12, marginTop: 4 },
  rankValue: { color: '#163B52', fontSize: 14, fontWeight: '700' },
  delayRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EDF1F0' },
  delayValue: { color: '#E86D5C', fontSize: 16, fontWeight: '800' },
  lineCard: { backgroundColor: '#FFFFFF', borderRadius: 12, marginHorizontal: 20, marginBottom: 12, padding: 17, shadowColor: '#163B52', shadowOpacity: 0.05, shadowRadius: 8, elevation: 1 },
  lineCardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  lineCodeLarge: { color: '#163B52', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  route: { color: '#65747C', fontSize: 13, lineHeight: 20 },
  chevron: { color: '#E86D5C', fontSize: 34, fontWeight: '300' },
  lineStats: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#EDF1F0', marginTop: 15, paddingTop: 13 },
  statText: { color: '#71838B', fontSize: 11 },
  statStrong: { color: '#163B52', fontSize: 13, fontWeight: '800' },
  detailHeader: { backgroundColor: '#163B52', paddingHorizontal: 20, paddingTop: 30, paddingBottom: 28 },
  detailCode: { color: '#FFFFFF', fontSize: 36, fontWeight: '800', marginTop: 10 },
  detailRoute: { color: '#D5E2E5', fontSize: 14, marginTop: 4 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: '#EDF1F0' },
  detailLabel: { color: '#71838B', fontSize: 13 },
  detailValue: { color: '#163B52', fontSize: 15, fontWeight: '800' },
  infoBox: { backgroundColor: '#E5F1EE', borderRadius: 12, margin: 20, padding: 18 },
  infoTitle: { color: '#2C6E65', fontSize: 13, fontWeight: '700' },
  infoValue: { color: '#163B52', fontSize: 26, fontWeight: '800', marginVertical: 5 },
  analysisHighlight: { backgroundColor: '#163B52', borderRadius: 14, marginHorizontal: 20, padding: 22, marginBottom: 6 },
  analysisLabel: { color: '#C5D5DB', fontSize: 13 },
  analysisTotal: { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginTop: 8 },
  analysisHint: { color: '#F2B84B', fontSize: 12, marginTop: 8 },
  chartRow: { paddingVertical: 13 },
  chartLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  chartValue: { color: '#65747C', fontSize: 12, fontWeight: '600' },
  barTrack: { height: 9, backgroundColor: '#E8EFED', borderRadius: 5, overflow: 'hidden' },
  bar: { height: '100%', backgroundColor: '#4AB7A9', borderRadius: 5 },
  winnerCard: { backgroundColor: '#FFFFFF', borderRadius: 12, marginHorizontal: 20, padding: 18, borderLeftWidth: 5, borderLeftColor: '#F2B84B' },
  winnerLabel: { color: '#71838B', fontSize: 12 },
  winnerCode: { color: '#163B52', fontSize: 28, fontWeight: '800', marginTop: 8 },
  winnerRoute: { color: '#65747C', fontSize: 13, marginTop: 4 },
  winnerRevenue: { color: '#2C6E65', fontSize: 20, fontWeight: '800', marginTop: 14 },
  tabLabel: { fontSize: 11, fontWeight: '700' },
});
