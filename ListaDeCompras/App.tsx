import { StatusBar } from 'expo-status-bar';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Item = {
  id: string;
  nome: string;
  comprado: boolean;
};

type ListaContextType = {
  nome: string;
  itens: Item[];
  login: (nome: string) => void;
  adicionarItem: (nome: string) => void;
  marcarComoComprado: (id: string) => void;
};

const ListaContext = createContext<ListaContextType | null>(null);

function ListaProvider({ children }: { children: ReactNode }) {
  const [nome, setNome] = useState('');
  const [itens, setItens] = useState<Item[]>([]);

  const login = useCallback((nomeDigitado: string) => {
    if (nomeDigitado.trim()) {
      setNome(nomeDigitado.trim());
    }
  }, []);

  const adicionarItem = useCallback((nomeItem: string) => {
    if (!nomeItem.trim()) return;

    setItens((itensAtuais) => [
      ...itensAtuais,
      {
        id: Date.now().toString(),
        nome: nomeItem.trim(),
        comprado: false,
      },
    ]);
  }, []);

  const marcarComoComprado = useCallback((id: string) => {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === id
          ? { ...item, comprado: !item.comprado }
          : item
      )
    );
  }, []);

  const valor = useMemo(
    () => ({
      nome,
      itens,
      login,
      adicionarItem,
      marcarComoComprado,
    }),
    [nome, itens, login, adicionarItem, marcarComoComprado]
  );

  return (
    <ListaContext.Provider value={valor}>
      {children}
    </ListaContext.Provider>
  );
}

function useLista() {
  const contexto = useContext(ListaContext);

  if (!contexto) {
    throw new Error('useLista deve ser usado dentro de ListaProvider');
  }

  return contexto;
}

function Login() {
  const [nomeDigitado, setNomeDigitado] = useState('');
  const { login } = useLista();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Compras</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nomeDigitado}
        onChangeText={setNomeDigitado}
      />

      <Pressable
        style={styles.botao}
        onPress={() => login(nomeDigitado)}
      >
        <Text style={styles.textoBotao}>Entrar</Text>
      </Pressable>
    </View>
  );
}

function ListaDeCompras() {
  const [novoItem, setNovoItem] = useState('');
  const [busca, setBusca] = useState('');

  const { nome, itens, adicionarItem, marcarComoComprado } = useLista();

  const itensFiltrados = useMemo(() => {
    return itens.filter((item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [itens, busca]);

  const pendentes = useMemo(() => {
    return itens.filter((item) => !item.comprado).length;
  }, [itens]);

  function adicionar() {
    adicionarItem(novoItem);
    setNovoItem('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, {nome}!</Text>
      <Text style={styles.pendentes}>
        Itens pendentes: {pendentes}
      </Text>

      <View style={styles.linha}>
        <TextInput
          style={[styles.input, styles.inputItem]}
          placeholder="Novo item"
          value={novoItem}
          onChangeText={setNovoItem}
        />

        <Pressable style={styles.botaoAdicionar} onPress={adicionar}>
          <Text style={styles.textoBotao}>+</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Buscar item"
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={itensFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => marcarComoComprado(item.id)}
          >
            <Text
              style={[
                styles.nomeItem,
                item.comprado && styles.itemComprado,
              ]}
            >
              {item.comprado ? '✓ ' : '○ '}
              {item.nome}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

function AppContent() {
  const { nome } = useLista();

  return nome ? <ListaDeCompras /> : <Login />;
}

export default function App() {
  return (
    <ListaProvider>
      <AppContent />
      <StatusBar style="dark" />
    </ListaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    padding: 24,
    paddingTop: 60,
  },
  titulo: {
    color: '#173F35',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pendentes: {
    color: '#61736D',
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D5DED9',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 12,
    padding: 13,
  },
  linha: {
    flexDirection: 'row',
  },
  inputItem: {
    flex: 1,
    marginRight: 8,
  },
  botao: {
    alignItems: 'center',
    backgroundColor: '#227A5B',
    borderRadius: 8,
    padding: 14,
  },
  botaoAdicionar: {
    alignItems: 'center',
    backgroundColor: '#227A5B',
    borderRadius: 8,
    height: 49,
    justifyContent: 'center',
    width: 49,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    padding: 16,
  },
  nomeItem: {
    color: '#173F35',
    fontSize: 17,
  },
  itemComprado: {
    color: '#7A8A84',
    textDecorationLine: 'line-through',
  },
});
