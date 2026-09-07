import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelaAnalises } from '../screens/TelaAnalises';
import { TelaPainel } from '../screens/TelaDashboard';
import { TelaDetalhesLinha } from '../screens/TelaDetalhadaLinhasDeOnibus';
import { TelaLinhas } from '../screens/TelaLinhasDeOnibus';
import { cores } from '../theme/cores';
import { ParametrosNavegacaoLinhas, ParametrosAbas } from './types';

const Tab = createBottomTabNavigator<ParametrosAbas>();
const Stack = createNativeStackNavigator<ParametrosNavegacaoLinhas>();

function NavegadorLinhas() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={TelaLinhas} options={{ title: 'Linhas' ,headerStyle: { backgroundColor: cores.azulEscuro },headerTintColor: cores.branco,headerTitleStyle: { color: cores.branco } }} />
      <Stack.Screen name="Detalhes" component={TelaDetalhesLinha} options={{ title: 'Detalhes da linha'}} />
    </Stack.Navigator>
  );
}

export function NavegadorAplicativo() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: cores.azulEscuro, tabBarInactiveTintColor: '#8A9AA3', tabBarLabelStyle: { fontSize: 11, fontWeight: '700' } }}>
        <Tab.Screen name="Inicio" component={TelaPainel} />
        <Tab.Screen name="Linhas" component={NavegadorLinhas} />
        <Tab.Screen name="Analises" component={TelaAnalises} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
