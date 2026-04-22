# AWS Cloud Practitioner — Trilha de Aprendizado

Sistema de estudos para a certificação **AWS Certified Cloud Practitioner (CLF-C02)** construído com HTML, CSS e JavaScript puro, sem dependências de framework.

---

## Funcionalidades

### Simulados
- **325 questões** distribuídas em **5 simulados** de 65 questões cada
- Três modos de estudo: **Sequencial**, **Aleatório** e **Revisar Erradas**
- Dicas por questão e conceito-chave após responder
- Navegação livre entre questões via barra de pontos
- Contagem de acertos/erros por sessão
- **Retomada automática**: ao sair e voltar, o sistema pergunta se deseja continuar de onde parou
- Progresso salvo automaticamente no `localStorage`

### 7 Passos AWS
Mapa de conhecimento baseado nos 7 domínios essenciais para o CLF-C02 com **31 sub-tópicos** no total.

| Passo | Domínio |
|-------|---------|
| 01 | Conceitos Gerais de Cloud |
| 02 | Monitoração e Analytics |
| 03 | Storage e Database |
| 04 | Computação em Nuvem |
| 05 | Preço e Suporte |
| 06 | Segurança |
| 07 | Networking |

**Modo Visão Resumo** — grade com todos os 7 blocos abertos simultaneamente para leitura rápida pré-prova. O passo 7 é exibido centralizado entre os dois anteriores.

**Modo Interativo** — árvore expansível onde cada domínio revela seus sub-tópicos com resumo completo e tags ao clicar. Animação de abertura/fechamento suave.

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Markup | HTML5 semântico |
| Estilo | CSS3 com custom properties, `backdrop-filter`, `grid`, `flex` |
| Lógica | JavaScript ES Modules (sem bundler) |
| Ícones | [Lucide](https://lucide.dev) via CDN (UMD) |
| Fonte | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Deploy | Vercel (zero config — arquivo estático) |

---

## Estrutura do Projeto

```
aws-simulados/
├── index.html                  # Shell da aplicação
└── src/
    ├── main.js                 # Roteador principal (view: home | study | sevensteps)
    ├── state.js                # Estado global + localStorage (chave: aws_v4)
    ├── toast.js                # Toasts e modais de confirmação
    ├── styles.css              # Design system completo
    ├── data/
    │   ├── questions.js        # GAB (gabarito) + QDB (325 questões detalhadas)
    │   └── seven-steps-data.js # 7 domínios com 31 sub-tópicos
    └── ui/
        ├── simulator.js        # Home, tela de estudo e todas as ações
        └── seven-steps.js      # Mapa de conhecimento (Modo Resumo + Interativo)
```

---

## Design System

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-0` | `#050a14` | Fundo base |
| `--bg-card` | `rgba(13,25,50,0.75)` | Cards com glassmorphism |
| `--blue-400` | `#60a5fa` | Texto de destaque |
| `--blue-600` | `#2563eb` | Ações primárias |
| `--green` | `#22c55e` | Acertos |
| `--red` | `#ef4444` | Erros |
| `--amber` | `#f59e0b` | Alertas |
| AWS Orange | `#FF9900` | Acento Retrowave / 7 Passos |

Todos os cards utilizam `backdrop-filter: blur` + `rgba` para glassmorphism. Efeitos de glow via `box-shadow` com `rgba` das cores de acento.

---

## Estado e Persistência

O estado global vive em `src/state.js` e é serializado no `localStorage` com a chave `aws_v4`.

```js
// Formato salvo (v2)
{
  v: 2,
  progress: { "s1q1": true, "s1q2": false, ... },  // histórico de respostas
  resume: {                                          // posição da última sessão
    sim, qNum, sel, answered, sessionOk, sessionFail
  }
}
```

O campo `resume` só é gravado em modo sequencial (`studyMode === 'seq'`). Modos aleatório e revisão de erros não geram ponto de retomada.

---

## Como Executar

O projeto usa ES Modules nativos — é necessário um servidor HTTP (não abre via `file://`).

```bash
# Qualquer servidor estático funciona
npx serve .
# ou
python3 -m http.server 3000
# ou abrir no VS Code com Live Server
```

### Deploy no Vercel

```bash
# Na raiz do projeto (onde está index.html)
vercel
```

Nenhum `package.json`, `vercel.json` ou configuração adicional é necessária.

---

## Adicionando Questões

Todas as questões ficam em `src/data/questions.js`.

```js
// GAB: gabarito por simulado e número de questão
export const GAB = {
  1: { 1: [0], 2: [1, 3], ... },  // simulado 1, Q1 = opção A, Q2 = opções B e D
};

// QDB: questão detalhada (função A)
function A(q, opts, ans, hint, just, concept, multi = false) { ... }
```

Para adicionar uma questão ao Simulado 5, por exemplo:
1. Adicione a resposta em `GAB[5][66]`
2. Chame `A(...)` dentro do bloco correspondente em `QDB[5]`

---

## Licença

Uso educacional pessoal.
