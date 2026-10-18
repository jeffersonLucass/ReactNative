import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { agendarLembrete } from '../services/notificacoes';
import { Recorrencia } from '../types/lembrete';
import { estilosComuns } from '../styles/comuns';
import { estilosCadastro as estilos } from '../styles/cadastro';

export default function TelaCadastro() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [recorrencia, setRecorrencia] = useState<Recorrencia>('diaria');
  const [horario, setHorario] = useState('08:00');

  async function salvar() {
    const horarioValido = /^([01]\d|2[0-3]):[0-5]\d$/.test(horario);
    if (!titulo.trim()) return Alert.alert('Atenção', 'Informe o título.');
    if (!horarioValido) return Alert.alert('Atenção', 'Horário inválido. Use HH:MM (ex: 08:00).');

    await agendarLembrete({ titulo: titulo.trim(), descricao: descricao.trim(), recorrencia, horario });

    Alert.alert('Pronto!', 'Lembrete agendado.');
    setTitulo('');
    setDescricao('');
  }

  return (
    <SafeAreaView style={estilosComuns.tela}>
      <Text style={estilosComuns.cabecalho}>Novo lembrete</Text>

      <Text style={estilos.rotulo}>Título</Text>
      <TextInput style={estilos.campo} value={titulo} onChangeText={setTitulo} placeholder="Beber água" />

      <Text style={estilos.rotulo}>Descrição</Text>
      <TextInput
        style={estilos.campo}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Um copo de 300 ml"
      />

      <Text style={estilos.rotulo}>Repetição</Text>
      <View style={estilos.linha}>
        {(['unica', 'diaria'] as const).map((opcao) => (
          <Pressable
            key={opcao}
            onPress={() => setRecorrencia(opcao)}
            style={[estilos.opcao, recorrencia === opcao && estilos.opcaoAtiva]}
          >
            <Text>{opcao === 'unica' ? 'Única' : 'Diária'}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={estilos.rotulo}>Horário (HH:MM)</Text>
      <TextInput
        style={estilos.campo}
        value={horario}
        onChangeText={setHorario}
        placeholder="08:00"
        keyboardType="numbers-and-punctuation"
        maxLength={5}
      />

      <Pressable style={estilos.botao} onPress={salvar}>
        <Text style={estilos.textoBotao}>Agendar lembrete</Text>
      </Pressable>
    </SafeAreaView>
  );
}