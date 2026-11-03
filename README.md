# Checkout — Nexo Pro

Aplicação frontend desenvolvida em Angular que simula um fluxo de checkout. Apresenta a assinatura de um plano fictício e um fluxo de pagamento por cartão de crédito, cartão de débito ou Pix, com respostas simuladas e feedback de processamento, sucesso e erro.

## Tecnologias

- **Angular 22** com componentes standalone, signals e carregamento de páginas sob demanda.
- **Tailwind CSS 4** para layout, responsividade e estilização. 
- **Signal Forms** (`@angular/forms/signals`) para o formulário de cartão.
- **RxJS** e **HttpClient** para as operações assíncronas.
- **Mock Service Worker (MSW)** para interceptar requisições HTTP no desenvolvimento.

As versões exatas das dependências estão registradas no `package-lock.json`.

## Pré-requisitos

- Node.js compatível com o Angular instalado: `^22.22.3`, `^24.15.0` ou `>=26.0.0`.
- npm. O `package.json` declara a versão `11.20.0` como gerenciador do projeto.
- Navegador atualizado com suporte a Service Workers. O ambiente local utiliza `localhost`.

Para conferir as versões disponíveis na sua máquina:

```bash
node --version
npm --version
```

## Instalação e execução

Clone este repositório ou baixe seu código-fonte. No terminal, entre na pasta `checkout` e execute:

```bash
npm ci
npm start
```

Acesse [http://localhost:4200](http://localhost:4200). Não é necessário instalar o Angular CLI globalmente: os scripts utilizam a versão local do projeto.

No modo de desenvolvimento, o MSW inicia antes da aplicação e fornece os dados fictícios. Não é necessário iniciar uma API ou configurar credenciais de gateway.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera o build de produção em `dist/checkout/`. |

## Fluxo e rotas

| Rota | Conteúdo |
| --- | --- |
| `/checkout/pedido` | Resumo do produto, características e valores da assinatura. |
| `/checkout/pagamento` | Escolha do meio de pagamento e formulário de cartão ou instruções Pix. |
| `/checkout/confirmacao` | Processamento e resultado da tentativa de pagamento, com apresentação de sucesso ou erro. |

A rota inicial e os caminhos desconhecidos redirecionam para o resumo do pedido. A etapa de pedido complementa as apresentações de pagamento, sucesso e erro solicitadas no desafio.

Sucesso e erro compartilham a página de confirmação e são apresentados condicionalmente a partir do estado do checkout. Em caso de erro, a interface oferece **Tentar novamente** e **Escolher outro meio**.

### Cartão de crédito e débito

O mesmo componente de formulário atende às duas modalidades. As validações implementadas incluem:

- Preenchimento obrigatório de número, titular, validade e CVV.
- Número com 16 dígitos, apresentação em grupos de quatro e verificação pelo algoritmo de Luhn.
- Identificação e aceitação de Visa e Mastercard.
- Titular com letras e espaços, entre 10 e 500 caracteres.
- Validade no formato `MM/AA`, com mês válido e cartão não vencido.
- CVV com exatamente três dígitos.

O botão de pagamento permanece desabilitado enquanto o formulário está inválido. As mensagens dos campos aparecem após a interação com eles.

Exemplos de dados fictícios para preencher o formulário:

| Campo | Exemplo |
| --- | --- |
| Número Visa | `4111 1111 1111 1111` |
| Número Mastercard | `5555 5555 5555 4444` |
| Titular | `Maria Silva Santos` |
| Validade | `12/35` — substitua por uma data futura caso necessário. |
| CVV | `123` |

Esses números servem apenas para testar a interface. Não utilize dados reais de cartão. O estado atual mantém os dados preenchidos, inclusive o CVV, em memória durante o fluxo; não existe tokenização nem processamento financeiro real.

### Pix

A seleção de Pix solicita um código simulado. A interface apresenta:

- QR Code decorativo, identificado como simulado e sem valor de pagamento.
- Código Pix fictício com ação de copiar e feedback da operação.
- Botão **Concluir pagamento**, que solicita a validação simulada e abre a confirmação.

Nenhuma transferência bancária é realizada ou consultada.

## Simulação de sucesso, erro e processamento

Os dados fictícios estão em `src/mocks/data/`. Os endpoints simulados estão em `src/mocks/handlers/`:

| Método | Endpoint | Operação |
| --- | --- | --- |
| GET | `/api/Pedido/:pedidoId` | Consulta do pedido. |
| POST | `/api/Pagamento/Pagar/:pedidoId/Cartao` | Pagamento por cartão. |
| GET | `/api/Pagamento/Pix/:pedidoId/Codigo` | Geração de código Pix. |
| GET | `/api/Pagamento/Pix/:pedidoId/ValidarPagamento` | Validação do pagamento Pix. |

**Por padrão, os handlers ativos retornam sucesso.** Não há sorteio de resultados nem regra de recusa por número de cartão.

Para reproduzir uma recusa de pagamento:

1. Abra `src/mocks/handlers/pagamento-handler-mock.ts`.
2. No handler `enviarPagamentoCartao`, substitua a declaração ativa de `response` pela resposta abaixo. Mantenha o `HttpResponse.json(response, { status: 200 })` existente.
3. Salve o arquivo, recarregue a aplicação e realize uma tentativa com um cartão fictício válido.

```ts
const response: RetornoApi = {
  sucesso: false,
  mensagem:
    'Seu banco recusou esta transação. Confira os dados e o limite disponível ou use outro meio de pagamento.',
};
```

Para simular falha na conclusão do Pix, use uma resposta equivalente no handler `validarPagamentoPix`. Para simular falha ao obter o código, altere `obterCodigoPix`.

Para observar o processamento, transforme o callback do handler desejado em `async` e adicione `await delay(1500)` antes de retornar a resposta. A função `delay` já está importada nesse arquivo.

Restaure a resposta de sucesso para testar a recuperação. Enquanto o handler continuar retornando erro, a ação **Tentar novamente** receberá uma nova recusa.

## Organização do código

```text
src/
├── app/
│   ├── pages/
│   │   ├── pedido-page/
│   │   ├── pagamento-page/
│   │   └── confirmacao-page/
│   ├── shared/
│   │   ├── components/    # Formulário, Pix, resumo, valores e feedback
│   │   ├── enums/         # Meios de pagamento, bandeiras e planos
│   │   ├── guards/        # Controle de acesso à confirmação
│   │   ├── models/        # Contratos de dados
│   │   ├── services/      # Consultas e envio de operações
│   │   └── stores/        # Estado do checkout e sessão fictícia
│   ├── app.config.ts
│   └── app.routes.ts
├── mocks/
│   ├── data/
│   ├── handlers/
│   └── browser.ts
└── styles.css
```

## Decisões técnicas

- **Estado compartilhado com signals:** a `CheckoutStore` concentra pedido, meio de pagamento, dados preenchidos, código Pix e feedback das operações. Propriedades `computed` expõem os dados para as telas. Para esse fluxo pequeno, uma biblioteca adicional de estado não é necessária.
- **Escopo do checkout:** a store e os serviços de pedido e pagamento são fornecidos na rota pai e compartilhados por suas páginas filhas.
- **Acesso direto sem dados:** o `confirmacaoGuard` redireciona para `/checkout/pagamento` quando não há dados de cartão nem código Pix. O layout solicita novamente o pedido fictício.
- **Componentização:** formulário, seletor de pagamento, Pix, resumo do pedido e mensagens são componentes separados para permitir reutilização e reduzir a responsabilidade das páginas.
- **Layout com Tailwind CSS:** utilitários e breakpoints organizam o conteúdo em uma ou mais colunas de acordo com o espaço disponível.
- **Simulação HTTP com MSW:** a aplicação utiliza serviços HTTP, enquanto os handlers substituem a API durante o desenvolvimento.
- **Pedido e sessão fictícios:** o pedido utiliza o identificador padrão `1`, e o usuário é carregado de dados locais para manter o foco no checkout.

## Escopo e limitações conhecidas

### Funcionalidades fora do escopo

- Integração com gateway, cobrança real, tokenização, antifraude e webhooks.
- Autenticação real, cadastro e gestão de assinaturas: a sessão é fictícia para concentrar a implementação no pagamento.
- Envio de e-mail, geração de recibo e área do assinante: as referências visuais não correspondem a serviços implementados. Os botões **Ver recibo** e **Acessar meu espaço** ainda não executam ações.
- Persistência de transações: o fluxo mantém os dados apenas em memória e trata o acesso sem estado por redirecionamento.

### Pendências da implementação

- **Melhoria na verificação dos estados do pagamento:** é necessário distinguir os estados inicial, processando, sucesso e erro para cumprir integralmente a restrição de acesso ao sucesso. 
- **Cobertura automatizada:** os testes existentes são principalmente de criação de componentes e serviços. Ainda é necessário revisar configurações e expectativas antigas e cobrir validações, guarda, transições e recuperação. Não há suíte end-to-end configurada.

