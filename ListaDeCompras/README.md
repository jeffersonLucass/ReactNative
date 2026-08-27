# Lista de Compras

Este projeto e um aplicativo simples de lista de compras feito com React Native, Expo e TypeScript.

O objetivo principal nao e criar um aplicativo complexo. O objetivo e praticar os Hooks do React em situacoes reais:

- `useState` para guardar informacoes que mudam;
- `useContext` para compartilhar dados entre componentes;
- `useMemo` para memorizar calculos;
- `useCallback` para memorizar funcoes.

## O que o aplicativo faz

O usuario pode:

1. Informar seu nome para entrar no aplicativo;
2. Adicionar produtos a lista;
3. Tocar em um produto para marcar como comprado;
4. Tocar novamente para voltar o produto para pendente;
5. Pesquisar produtos pelo nome;
6. Ver quantos produtos ainda estao pendentes.

Este login e apenas uma identificacao local. Ele nao usa senha, banco de dados ou servidor.

## Tecnologias

- React Native: cria a interface para celular;
- Expo: facilita executar e testar o projeto;
- TypeScript: adiciona tipos ao JavaScript;
- React Hooks: organizam estado, dados compartilhados e calculos.

## Como executar

Abra o terminal dentro da pasta `ListaDeCompras` e execute:

```bash
npm install
npm start
```

Depois que o Expo iniciar:

- pressione `w` para abrir no navegador;
- pressione `a` para abrir no Android;
- escaneie o QR Code com o aplicativo Expo Go.

O arquivo principal do aplicativo e `App.tsx`.

## Como ler o `App.tsx`

O arquivo esta organizado em algumas partes:

1. Importacoes;
2. Tipos do TypeScript;
3. Criacao do contexto;
4. Provider, que guarda os dados;
5. Hook personalizado para acessar o contexto;
6. Tela de login;
7. Tela da lista de compras;
8. Escolha da tela que sera exibida;
9. Componente principal;
10. Estilos.

## 1. Importacoes

```tsx
import { StatusBar } from 'expo-status-bar';
```

Importa a barra de status do Expo. Ela controla a aparencia da area superior do celular, onde ficam horario, bateria e sinal.

```tsx
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
```

Aqui sao importadas ferramentas do React:

- `createContext`: cria um contexto para compartilhar dados;
- `ReactNode`: tipo do TypeScript usado para representar conteudo que pode ser renderizado;
- `useCallback`: memoriza funcoes;
- `useContext`: acessa dados de um contexto;
- `useMemo`: memoriza valores calculados;
- `useState`: cria estados.

```tsx
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
```

Esses sao componentes do React Native:

- `View`: funciona como um container, parecido com uma `div`;
- `Text`: exibe textos;
- `TextInput`: campo onde o usuario digita;
- `Pressable`: area que pode ser pressionada;
- `FlatList`: exibe uma lista de forma eficiente;
- `StyleSheet`: organiza os estilos da tela.

## 2. Tipos do TypeScript

### Tipo de um item

```tsx
type Item = {
  id: string;
  nome: string;
  comprado: boolean;
};
```

Esse tipo descreve o formato de cada produto.

- `id`: identificador do item;
- `nome`: nome do produto;
- `comprado`: indica se o produto foi comprado.

Um item poderia ser representado assim:

```tsx
{
  id: '123',
  nome: 'Arroz',
  comprado: false,
}
```

### Tipo dos dados do contexto

```tsx
type ListaContextType = {
  nome: string;
  itens: Item[];
  login: (nome: string) => void;
  adicionarItem: (nome: string) => void;
  marcarComoComprado: (id: string) => void;
};
```

Esse tipo descreve tudo que sera compartilhado pelo contexto:

- `nome`: nome do usuario;
- `itens`: array de produtos;
- `login`: funcao que recebe um nome e faz a entrada;
- `adicionarItem`: funcao que recebe o nome de um produto;
- `marcarComoComprado`: funcao que recebe o id de um produto.

A parte `(nome: string) => void` significa que a funcao recebe um texto e nao retorna nenhum valor.

## 3. Criando o contexto

```tsx
const ListaContext = createContext<ListaContextType | null>(null);
```

Essa linha cria um espaco compartilhado chamado `ListaContext`.

`createContext` e uma funcao do React usada para permitir que varios componentes acessem os mesmos dados sem receber tudo por propriedades (`props`).

A parte `<ListaContextType | null>` e uma informacao do TypeScript:

- o contexto pode conter um objeto no formato `ListaContextType`;
- ou pode estar vazio, representado por `null`.

O `null` entre parenteses e o valor inicial. O valor real sera fornecido mais adiante pelo `ListaContext.Provider`.

## 4. O `ListaProvider`

```tsx
function ListaProvider({ children }: { children: ReactNode }) {
```

`ListaProvider` e um componente que guarda os dados da aplicacao e os disponibiliza para seus componentes filhos.

`children` representa tudo que for colocado dentro de `ListaProvider`.

Neste trecho:

```tsx
<ListaProvider>
  <AppContent />
</ListaProvider>
```

`<AppContent />` e o `children`.

### Estados do Provider

```tsx
const [nome, setNome] = useState('');
const [itens, setItens] = useState<Item[]>([]);
```

Aqui existem dois estados:

- `nome`: guarda o nome atual do usuario;
- `itens`: guarda todos os produtos da lista.

A primeira parte de cada par e o valor atual. A segunda parte e a funcao que altera esse valor.

Por exemplo, `setNome('Maria')` muda o valor de `nome` para `Maria`.

O `Item[]` informa que `itens` e um array formado por objetos do tipo `Item`.

## 5. Funcao de login

```tsx
const login = useCallback((nomeDigitado: string) => {
  if (nomeDigitado.trim()) {
    setNome(nomeDigitado.trim());
  }
}, []);
```

Essa funcao recebe o texto digitado pelo usuario.

`trim()` remove espacos no inicio e no fim do texto. Assim, um nome formado apenas por espacos nao sera aceito.

Se o texto nao estiver vazio, `setNome` salva o nome no estado.

O segundo argumento de `useCallback` e `[]`. Isso significa que a funcao nao precisa ser recriada entre renderizacoes, pois nao depende de nenhum valor externo que mude.

## 6. Funcao para adicionar produtos

```tsx
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
```

Primeiro, a funcao verifica se o campo esta vazio. Se estiver, `return` encerra a funcao.

Depois, `setItens` recebe uma funcao com o array atual, chamado `itensAtuais`.

```tsx
[...itensAtuais, novoItem]
```

Os tres pontos fazem uma copia dos itens atuais. Em seguida, o novo produto e colocado no final do array.

O novo produto recebe:

- um `id` baseado no horario atual;
- o nome digitado;
- `comprado: false`, pois acabou de ser adicionado.

A lista nao e alterada diretamente. Em React, criamos um novo array e passamos esse novo valor para o estado.

## 7. Funcao para marcar produtos

```tsx
const marcarComoComprado = useCallback((id: string) => {
  setItens((itensAtuais) =>
    itensAtuais.map((item) =>
      item.id === id
        ? { ...item, comprado: !item.comprado }
        : item
    )
  );
}, []);
```

Essa funcao recebe o `id` do produto pressionado.

`map` percorre todos os produtos:

- se o id for igual ao id recebido, cria uma copia do item e inverte o valor de `comprado`;
- se o id for diferente, mantem o item como esta.

O operador `!` inverte um valor booleano:

- `!false` vira `true`;
- `!true` vira `false`.

Por isso, a mesma funcao consegue marcar e desmarcar um item.

## 8. Valor compartilhado pelo contexto

```tsx
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
```

Aqui e criado o objeto que sera compartilhado com os outros componentes.

Esse objeto contem:

- o nome do usuario;
- os itens da lista;
- as funcoes que alteram esses dados.

O `useMemo` memoriza esse objeto e so cria outro quando algum item da lista de dependencias mudar.

As dependencias sao os valores entre colchetes:

```tsx
[nome, itens, login, adicionarItem, marcarComoComprado]
```

Como `nome` e `itens` podem mudar, eles precisam estar nessa lista. As funcoes criadas com `useCallback` tambem aparecem nela.

## 9. Disponibilizando os dados

```tsx
return (
  <ListaContext.Provider value={valor}>
    {children}
  </ListaContext.Provider>
);
```

`Provider` significa fornecedor.

Ele fornece o objeto `valor` para todos os componentes que estiverem dentro dele. Assim, `Login`, `ListaDeCompras` e `AppContent` podem acessar os dados do aplicativo.

## 10. O hook personalizado `useLista`

```tsx
function useLista() {
  const contexto = useContext(ListaContext);

  if (!contexto) {
    throw new Error('useLista deve ser usado dentro de ListaProvider');
  }

  return contexto;
}
```

Esse e um Hook personalizado. Seu nome comeca com `use`, como os Hooks oficiais do React.

`useContext(ListaContext)` le os dados fornecidos pelo `ListaProvider`.

A verificacao `if (!contexto)` protege o codigo. Se alguem tentar usar `useLista` fora do `ListaProvider`, um erro explicativo sera mostrado.

Depois da verificacao, `return contexto` devolve os dados para o componente que chamou o Hook.

Por isso podemos escrever:

```tsx
const { nome, itens } = useLista();
```

## 11. Componente de login

```tsx
function Login() {
  const [nomeDigitado, setNomeDigitado] = useState('');
  const { login } = useLista();
```

O componente `Login` possui um estado local chamado `nomeDigitado`. Ele guarda o que esta sendo escrito no campo de nome.

A funcao `login` vem do contexto.

### Campo de nome

```tsx
<TextInput
  style={styles.input}
  placeholder="Digite seu nome"
  value={nomeDigitado}
  onChangeText={setNomeDigitado}
/>
```

- `placeholder`: texto mostrado quando o campo esta vazio;
- `value`: valor atual do campo;
- `onChangeText`: executado a cada alteracao. Nesse caso, atualiza `nomeDigitado`.

### Botao de entrada

```tsx
<Pressable
  style={styles.botao}
  onPress={() => login(nomeDigitado)}
>
  <Text style={styles.textoBotao}>Entrar</Text>
</Pressable>
```

Quando o botao e pressionado, uma funcao chama `login` e envia o nome digitado.

Depois que `nome` recebe um valor, o React renderiza a tela principal no lugar da tela de login.

## 12. Componente da lista

```tsx
function ListaDeCompras() {
  const [novoItem, setNovoItem] = useState('');
  const [busca, setBusca] = useState('');
```

Esse componente possui dois estados locais:

- `novoItem`: texto que sera adicionado;
- `busca`: texto usado para pesquisar produtos.

Depois ele acessa dados do contexto:

```tsx
const { nome, itens, adicionarItem, marcarComoComprado } = useLista();
```

Assim, o componente recebe o nome do usuario, os itens e as funcoes necessarias.

### Filtrando os itens

```tsx
const itensFiltrados = useMemo(() => {
  return itens.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );
}, [itens, busca]);
```

Esse calculo cria uma nova lista contendo apenas os produtos que combinam com a busca.

- `toLowerCase()` deixa os textos em minusculo;
- `includes()` verifica se um texto esta dentro de outro;
- `filter()` cria um novo array apenas com os itens aprovados.

O calculo depende de `itens` e `busca`. Portanto, o `useMemo` recalcula somente quando a lista ou o texto da busca mudar.

### Contando os pendentes

```tsx
const pendentes = useMemo(() => {
  return itens.filter((item) => !item.comprado).length;
}, [itens]);
```

Esse calculo filtra os itens que ainda nao foram comprados e conta quantos sobraram com `length`.

Ele depende apenas de `itens`, porque a quantidade pendente muda quando um produto e adicionado ou quando seu status muda.

### Adicionando um item pela tela

```tsx
function adicionar() {
  adicionarItem(novoItem);
  setNovoItem('');
}
```

Essa funcao:

1. envia o texto para a funcao `adicionarItem` do contexto;
2. limpa o campo depois da tentativa de adicionar.

### Campo e botao de adicionar

O `TextInput` recebe o nome do novo produto. O `Pressable` chama `adicionar` quando e pressionado.

O estilo `inputItem` usa `flex: 1`, fazendo o campo ocupar o espaco disponivel ao lado do botao `+`.

### Campo de busca

```tsx
<TextInput
  style={styles.input}
  placeholder="Buscar item"
  value={busca}
  onChangeText={setBusca}
/>
```

Cada letra digitada atualiza `busca`. Isso faz o `itensFiltrados` ser recalculado e a lista ser atualizada.

### Exibindo a lista

```tsx
<FlatList
  data={itensFiltrados}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    // componente de cada produto
  )}
/>
```

- `data`: dados que serao exibidos;
- `keyExtractor`: informa uma chave unica para cada item;
- `renderItem`: define como cada produto aparecera na tela.

A chave e importante para o React identificar cada item corretamente.

### Marcando um produto

```tsx
<Pressable
  style={styles.item}
  onPress={() => marcarComoComprado(item.id)}
>
```

Ao tocar no produto, seu id e enviado para `marcarComoComprado`.

O texto exibido muda conforme o status:

```tsx
{item.comprado ? '✓ ' : '○ '}
{item.nome}
```

Isso usa o operador ternario:

```tsx
condicao ? valorSeVerdadeiro : valorSeFalso
```

Se `item.comprado` for verdadeiro, aparece `✓`. Caso contrario, aparece `○`.

O estilo tambem muda quando o item esta comprado:

```tsx
item.comprado && styles.itemComprado
```

O operador `&&` aplica `styles.itemComprado` somente quando `item.comprado` for verdadeiro. Esse estilo coloca um risco sobre o nome do produto.

## 13. Escolhendo a tela

```tsx
function AppContent() {
  const { nome } = useLista();

  return nome ? <ListaDeCompras /> : <Login />;
}
```

Esse componente decide qual tela mostrar.

A linha usa o operador ternario:

- se `nome` existir, mostra `ListaDeCompras`;
- se `nome` estiver vazio, mostra `Login`.

Esse e o comportamento que simula o login.

## 14. Componente principal

```tsx
export default function App() {
  return (
    <ListaProvider>
      <AppContent />
      <StatusBar style="dark" />
    </ListaProvider>
  );
}
```

`App` e o primeiro componente usado pelo Expo.

`ListaProvider` envolve `AppContent`, permitindo que todos os componentes internos usem `useLista()`.

A `StatusBar` e configurada com texto escuro.

A palavra `export default` informa que esse e o componente principal exportado pelo arquivo.

## 15. Estilos

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    padding: 24,
    paddingTop: 60,
  },
});
```

`StyleSheet.create` organiza os estilos usados pelos componentes.

Algumas propriedades importantes:

- `flex: 1`: ocupa o espaco disponivel;
- `backgroundColor`: define a cor de fundo;
- `padding`: cria espaco interno;
- `marginBottom`: cria espaco abaixo do componente;
- `flexDirection: 'row'`: coloca elementos lado a lado;
- `alignItems`: alinha os elementos no eixo transversal;
- `justifyContent`: alinha os elementos no eixo principal;
- `fontSize`: define o tamanho do texto;
- `fontWeight`: define a espessura do texto;
- `borderRadius`: arredonda os cantos.

No React Native, os estilos sao objetos JavaScript. Por isso usamos:

```tsx
style={styles.container}
```

Para combinar mais de um estilo, usamos um array:

```tsx
style={[styles.nomeItem, item.comprado && styles.itemComprado]}
```

## Resumo dos Hooks

### `useState`

Guarda valores que mudam e fazem a tela ser renderizada novamente.

Usado para:

- nome do usuario;
- produtos;
- texto do login;
- novo produto;
- texto da busca.

### `useContext`

Permite acessar dados compartilhados pelo `ListaProvider`.

Neste projeto, ele evita que nome, produtos e funcoes precisem ser passados manualmente por varios componentes.

### `useMemo`

Memoriza resultados de calculos.

Usado para:

- criar `itensFiltrados`;
- calcular `pendentes`;
- criar o objeto `valor` do contexto.

Ele nao altera os dados. Apenas evita refazer calculos ou criar o mesmo objeto sem necessidade.

### `useCallback`

Memoriza funcoes.

Usado nas funcoes:

- `login`;
- `adicionarItem`;
- `marcarComoComprado`.

Isso ajuda a manter a mesma referencia dessas funcoes entre renderizacoes quando suas dependencias nao mudam.

## Fluxo completo do aplicativo

```text
App
  -> ListaProvider guarda os estados e funcoes
    -> AppContent verifica se existe um nome
      -> sem nome: mostra Login
      -> com nome: mostra ListaDeCompras
```

Fluxo do login:

```text
Usuario digita o nome
  -> nomeDigitado e atualizado
  -> usuario pressiona Entrar
  -> login recebe o nome
  -> nome e salvo no contexto
  -> AppContent mostra ListaDeCompras
```

Fluxo de um produto:

```text
Usuario digita um produto
  -> novoItem e atualizado
  -> usuario pressiona +
  -> adicionarItem cria um novo objeto
  -> itens e atualizado
  -> FlatList mostra o produto
```

Fluxo de compra:

```text
Usuario toca em um produto
  -> o id e enviado para marcarComoComprado
  -> comprado e invertido
  -> o texto recebe risco ou remove o risco
  -> a quantidade de pendentes e recalculada
```

## Observacao importante

O estado fica apenas na memoria enquanto o aplicativo esta aberto. Se o aplicativo for fechado ou reiniciado, o nome e os produtos serao perdidos.

Para salvar os dados depois, seria necessario usar armazenamento local, como `AsyncStorage`, ou um banco de dados. Isso nao e necessario para o objetivo atual do exercicio.
