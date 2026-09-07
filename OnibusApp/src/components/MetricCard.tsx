import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';

type MetricCardProps = { label: string; value: string; accent: string };

export function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: cores.branco, borderRadius: 12, width: '48%', minHeight: 112, padding: 15, shadowColor: cores.azulEscuro, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  accent: { width: 24, height: 4, borderRadius: 4, marginBottom: 16 },
  value: { color: cores.azulEscuro, fontSize: 22, fontWeight: '800' },
  label: { color: cores.textoSuave, fontSize: 12, marginTop: 5 },
});
