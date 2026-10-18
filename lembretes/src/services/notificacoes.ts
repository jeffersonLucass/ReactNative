import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { DadosLembrete } from '../types/lembrete';

const CATEGORIA = 'lembrete';
const CANAL = 'lembretes';
const ACAO_CONCLUIR = 'concluir';
const ACAO_ADIAR = 'adiar';
const MINUTOS_ADIAR = 10;

// Como a notificação se comporta com o app aberto.
// Roda assim que este arquivo é importado.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configurarNotificacoes() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CANAL, {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  await Notifications.setNotificationCategoryAsync(CATEGORIA, [
    {
      identifier: ACAO_CONCLUIR,
      buttonTitle: 'Concluir',
      options: { opensAppToForeground: false },
    },
    {
      identifier: ACAO_ADIAR,
      buttonTitle: `Adiar ${MINUTOS_ADIAR} min`,
      options: { opensAppToForeground: false },
    },
  ]);

  await Notifications.requestPermissionsAsync();
}

export async function agendarLembrete(dados: DadosLembrete) {
  const [hora, minuto] = dados.horario.split(':').map(Number);

  const conteudo = {
    title: dados.titulo,
    body: dados.descricao,
    categoryIdentifier: CATEGORIA,
    data: { ...dados },
  };

  if (dados.recorrencia === 'diaria') {
    await Notifications.scheduleNotificationAsync({
      content: conteudo,
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hora,
        minute: minuto,
        channelId: CANAL,
      },
    });
    return;
  }

  // Única: próxima vez que der esse horário (hoje ou amanhã)
  const data = new Date();
  data.setHours(hora, minuto, 0, 0);
  if (data.getTime() <= Date.now()) data.setDate(data.getDate() + 1);

  await Notifications.scheduleNotificationAsync({
    content: conteudo,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: data,
      channelId: CANAL,
    },
  });
}

export function listarLembretes() {
  return Notifications.getAllScheduledNotificationsAsync();
}

export function cancelarLembrete(id: string) {
  return Notifications.cancelScheduledNotificationAsync(id);
}

export function cancelarTodosLembretes() {
  return Notifications.cancelAllScheduledNotificationsAsync();
}

// Escuta os toques nos botões Concluir / Adiar.
// Devolve uma função para parar de escutar.
export function escutarAcoesDaNotificacao() {
  const assinatura = Notifications.addNotificationResponseReceivedListener(async (resposta) => {
    const acao = resposta.actionIdentifier;
    const { identifier, content } = resposta.notification.request;

    if (acao === ACAO_CONCLUIR) {
      await Notifications.dismissNotificationAsync(identifier);
    }

    if (acao === ACAO_ADIAR) {
      await Notifications.dismissNotificationAsync(identifier);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: content.title,
          body: content.body,
          categoryIdentifier: CATEGORIA,
          data: content.data,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: MINUTOS_ADIAR * 60,
          channelId: CANAL,
        },
      });
    }
  });

  return () => assinatura.remove();
}