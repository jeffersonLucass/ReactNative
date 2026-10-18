import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configurarNotificacoes, escutarAcoesDaNotificacao } from './src/services/notificacoes';
import TelaCadastro from './src/screens/TelaCadastro';
import TelaAgendados from './src/screens/TelaAgendados';

const Aba = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    configurarNotificacoes();
    return escutarAcoesDaNotificacao();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Aba.Navigator screenOptions={{ headerShown: false }}>
          <Aba.Screen name="Cadastro" component={TelaCadastro} />
          <Aba.Screen name="Agendados" component={TelaAgendados} />
        </Aba.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}