import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const frases: Record<number, string> = {
  1: 'Pessimo !',
  2: 'Você consegue!',
  3: 'Melhore',
  4: 'Continue assim!',
  5: 'Vai Brasilll!',
  6: 'Parabéns, você tirou 6!',
};

export default function App() {
  const [nome, setNome] = useState('');
  const [numeroDado, setNumeroDado] = useState(1);
  const [frase, setFrase] = useState('Clique em sortear');
  const imagensDados = [
      'dice-1',
      'dice-2',
      'dice-3',
      'dice-4',
      'dice-5',
      'dice-6',
  ] as const;

  function sortearDado() {
    const novoNumero = Math.floor(Math.random() * 6) + 1;

    setNumeroDado(novoNumero);
    setFrase(frases[novoNumero]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo de Dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.nome}>
        {nome ? `Olá, ${nome}!` : 'Olá!'}
      </Text>

      <Text style={styles.subtitulo}>Hora de atacar!</Text>
      <Text style={styles.frase}>{frase}</Text>

      <MaterialCommunityIcons
        name={imagensDados[numeroDado-1]} //utilizo o -1 pois o array se inicia na posição 0 e o numero Dado é de 1 a 6.
        size={130}
        color="#bd123f"
      />

      <Button title="Sortear" onPress={sortearDado} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff8fc',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c65388',
    marginBottom: 30,
  },

  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    padding: 8,
    marginBottom: 20,
  },

  nome: {
    fontSize: 18,
    marginBottom: 25,
  },

  subtitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  frase: {
    fontSize: 16,
    marginBottom: 25,
  },
});