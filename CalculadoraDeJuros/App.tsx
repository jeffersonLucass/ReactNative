import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const pessoas = [
  { id: 'melhor-amigo', nome: 'Melhor amigo', taxa: 0 },
  { id: 'amigo', nome: 'Amigo', taxa: 5 },
  { id: 'colega', nome: 'Colega', taxa: 10 },
  { id: 'desconhecido', nome: 'Desconhecido', taxa: 25 },
];

function converterNumero(valor: string) {
  return Number(valor.replace(',', '.')) || 0;
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function App() {
  const [dinheiro, setDinheiro] = useState('');
  const [pessoaSelecionada, setPessoaSelecionada] = useState('melhor-amigo');
  const [arredondar, setArredondar] = useState(false);
  const [resultado, setResultado] = useState(0);

  function calcular() {
    const pessoa = pessoas.find((item) => item.id === pessoaSelecionada);
    const valor = converterNumero(dinheiro);
    const valorCalculado = valor * (1 + (pessoa?.taxa || 0) / 100);
    setResultado(arredondar ? Math.ceil(valorCalculado) : valorCalculado);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.barraSuperior} />

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Calculadora de juros</Text>

        <TextInput
          style={styles.input}
          value={dinheiro}
          onChangeText={setDinheiro}
          placeholder="Dinheiro emprestado"
          placeholderTextColor="#76747c"
          keyboardType="decimal-pad"
        />

        <Text style={styles.pergunta}>Quanto a pessoa é sua amiga?</Text>

        {pessoas.map((pessoa) => (
          <TouchableOpacity
            key={pessoa.id}
            style={styles.opcao}
            onPress={() => setPessoaSelecionada(pessoa.id)}
          >
            <View style={styles.radio}>
              {pessoaSelecionada === pessoa.id && <View style={styles.radioSelecionado} />}
            </View>
            <Text style={styles.textoOpcao}>
              {pessoa.nome} ({pessoa.taxa === 0 ? 'Sem juros para os brothers' : `${pessoa.taxa}%`})
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.linhaArredondar}>
          <Text style={styles.textoArredondar}>Arredondar?</Text>
          <Switch
            value={arredondar}
            onValueChange={setArredondar}
            trackColor={{ false: '#d7d5da', true: '#b9a9e2' }}
            thumbColor={arredondar ? '#6546a5' : '#f1f0f2'}
          />
        </View>

        <Text style={styles.textoResultado}>A pessoa deve te pagar:</Text>
        <Text style={styles.resultado}>{formatarMoeda(resultado)}</Text>

        <TouchableOpacity style={styles.botao} onPress={calcular}>
          <Text style={styles.textoBotao}>Calcular</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaff',
  },
  barraSuperior: {
    height: 70,
    backgroundColor: '#6546a5',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  titulo: {
    color: '#4d4b52',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 22,
  },
  input: {
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: '#9a989e',
    color: '#48464d',
    fontSize: 14,
    paddingHorizontal: 2,
    marginBottom: 14,
  },
  pergunta: {
    color: '#bf4937',
    fontSize: 11,
    marginBottom: 10,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 29,
  },
  radio: {
    width: 13,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#4c4a50',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioSelecionado: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#6546a5',
  },
  textoOpcao: {
    color: '#4d4b52',
    fontSize: 10,
  },
  linhaArredondar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 15,
  },
  textoArredondar: {
    color: '#4d4b52',
    fontSize: 10,
  },
  textoResultado: {
    color: '#69676e',
    fontSize: 10,
    marginBottom: 14,
  },
  resultado: {
    color: '#42a34f',
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 68,
  },
  botao: {
    height: 38,
    borderRadius: 20,
    backgroundColor: '#6546a5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});
