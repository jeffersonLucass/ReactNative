import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';

type SectionTitleProps = { title: string; action?: string };

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 24, marginBottom: 12 },
  title: { color: cores.azulEscuro, fontSize: 18, fontWeight: '800' },
  action: { color: cores.textoSuave, fontSize: 12, fontWeight: '600' },
});
