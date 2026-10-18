import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { cancelarLembrete, cancelarTodosLembretes, listarLembretes } from '../services/notificacoes';
import { DadosLembrete } from '../types/lembrete';
import { estilosComuns } from '../styles/comuns';
import { estilosAgendados as estilos } from '../styles/agendados';

export default function TelaAgendados() {
  const [lembretes, setLembretes] = useState<Notifications.NotificationRequest[]>([]);

  const carregar = useCallback(async () => {
    setLembretes(await listarLembretes());
  }, []);

  // Recarrega sempre que a aba ganhar foco
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  async function cancelarUm(id: string) {
    await cancelarLembrete(id);
    carregar();
  }

  async function cancelarTodos() {
    await cancelarTodosLembretes();
    carregar();
  }

  return (
    <SafeAreaView style={estilosComuns.tela}>
      <Text style={estilosComuns.cabecalho}>Agendados</Text>

      <FlatList
        data={lembretes}
        keyExtractor={(item) => item.identifier}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum lembrete agendado.</Text>}
        renderItem={({ item }) => {
          const dados = item.content.data as DadosLembrete;
          return (
            <View style={estilos.cartao}>
              <View style={{ flex: 1 }}>
                <Text style={estilos.tituloCartao}>{item.content.title}</Text>
                <Text>
                  {dados?.recorrencia === 'diaria' ? 'Todo dia' : 'Única'}, {dados?.horario}
                </Text>
              </View>
              <Pressable onPress={() => cancelarUm(item.identifier)}>
                <Text style={estilosComuns.cancelar}>Cancelar</Text>
              </Pressable>
            </View>
          );
        }}
      />

      {lembretes.length > 0 && (
        <Pressable onPress={cancelarTodos}>
          <Text style={[estilosComuns.cancelar, estilos.cancelarTodos]}>Cancelar todos</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}