# MeuFLIP

App para flip de console. Um arquivo HTML, sem build, sem dependência de CDN.
Roda offline, no celular e no PC.

**Cinco abas**

| | |
|---|---|
| **Início** | Saudação pelo horário, nível, o que precisa de atenção hoje, atalhos, próximas insígnias e o painel de resultado |
| **Negócios** | Cada compra e venda, com markup, margem, dias em estoque e R$/hora calculados |
| **Régua** | Teto de compra com veredito ao vivo: pode comprar, negocie até X, ou vá embora |
| **Insígnias** | 18 conquistas que premiam giro, margem e honestidade — nunca faturamento |
| **Manual** | Método, métricas, fotografia, vistoria, primeiros 30 dias, simulador de giro, calendário de sazonalidade e as três curvas ABC |

**No PC** a navegação vira barra lateral e o conteúdo abre em colunas.
Atalhos de teclado: `1`–`5` trocam de aba, `N` lança um negócio, `T` abre a régua,
`Esc` fecha o formulário.

---

## 1. Subir no GitHub Pages

1. Crie um repositório novo (pode ser público ou privado com Pages habilitado).
2. Envie **todos** os arquivos desta pasta para a raiz do repositório:

   ```
   index.html
   manifest.webmanifest
   sw.js
   .nojekyll
   icon-16.png  icon-32.png   icon-48.png   icon-152.png
   icon-167.png icon-180.png  icon-192.png  icon-512.png
   icon-maskable-512.png
   ```

   ### Sobre o `.nojekyll`

   Ele começa com ponto, então o Finder do Mac **esconde** por padrão e você não
   consegue arrastar o que não vê. Três saídas, escolha uma:

   - **Mostrar arquivos ocultos:** no Finder, `Cmd + Shift + .` (ponto final).
     O `.nojekyll` aparece acinzentado. Arraste junto com o resto e aperte de novo
     para voltar a esconder.
   - **Criar direto no GitHub:** *Add file › Create new file*, digite `.nojekyll`
     no nome, deixe o conteúdo vazio, *Commit*.
   - **Pular.** Neste projeto ele é opcional: o `.nojekyll` só faz diferença quando
     existe arquivo ou pasta começando com `_` ou `.`, e aqui não existe nenhum.
     É seguro, não obrigatório — evita o Jekyll rodar à toa a cada publicação.

   Se você usar GitHub Desktop ou `git` no terminal, o arquivo vai junto sozinho.
   O problema é só com arrastar-e-soltar no navegador.

3. **Settings › Pages › Source: Deploy from a branch**, branch `main`, pasta `/ (root)`. Salve.
4. Em um ou dois minutos o endereço fica disponível em
   `https://<seu-usuario>.github.io/<nome-do-repo>/`

Todos os caminhos são relativos (`./`), então funciona em qualquer nome de repositório,
sem ajuste.

## 2. Instalar no iPhone

1. Abra o endereço **no Safari** (não funciona pelo Chrome no iOS).
2. Toque no botão de compartilhar (o quadrado com a seta para cima).
3. **Adicionar à Tela de Início** → Adicionar.
4. O ícone aparece na tela inicial. Abrindo por ali, o app roda em tela cheia,
   sem a barra do Safari, e funciona sem internet.

## 3. Atualizar depois

Substitua os arquivos no repositório **e suba o número do cache**: no `sw.js`,
troque `const CACHE = 'meuflip-v12';` para `'meuflip-v13'`, e assim por diante.
A versão atual é a **v12**.

Isso não é opcional. O service worker guarda tudo localmente e serve do cache
antes de perguntar ao servidor — é o que faz o app abrir offline. Enquanto o nome
do cache não mudar, o navegador continua entregando a versão velha para sempre,
mesmo com o arquivo novo publicado.

**Se ficou preso numa versão antiga:**

- *No PC:* `Ctrl + Shift + R` (ou `Cmd + Shift + R` no Mac). Se insistir, abra
  DevTools → **Application › Service Workers › Unregister**, depois
  **Storage › Clear site data**, e recarregue.
- *No iPhone:* remova o app da tela de início, feche a aba no Safari e adicione
  de novo. O iOS guarda o ícone em cache com afinco e não troca sozinho.

## 4. Onde ficam os seus dados

Os negócios, as marcações e os valores das calculadoras ficam guardados **no próprio
aparelho** (localStorage) — não sobem para lugar nenhum e ninguém mais vê.

Isso tem uma consequência: se você limpar os dados do Safari, trocar de celular ou
remover o app da tela inicial, os registros vão junto.

**Exporte um backup uma vez por mês.** Toque no ícone de banco de dados no topo direito:

- **Backup (.json)** — restaura tudo exatamente como estava.
- **Planilha (.csv)** — abre no Excel ou no Numbers, com markup, margem, dias e R$/hora
  já calculados por linha.

No iPhone o arquivo cai em *Arquivos › Downloads*. Mande para você mesmo no WhatsApp
ou salve no iCloud.

---

## Taxas embutidas (verificadas em 17/09/2026)

| Canal | Taxa |
|---|---|
| PIX / dinheiro | 0% |
| Débito (InfiniteTap) | 1,37% |
| Crédito 1x | 3,15% |
| Crédito 10x | 11,06% |
| Crédito 12x | 12,40% |
| Mercado Livre Clássico | 13% + R$ 55 de frete |
| Shopee | 14% + R$ 26 fixos |

Taxas mudam. Reconfira a cada trimestre e ajuste em `index.html`,
na constante `CANAIS` (perto do início do `<script>`).

Deslocamento fica **fora** de todas as contas, por escolha: o custo é abatido
rodando Uber no trajeto.

---

## Paleta

Definida em `:root` no topo do `index.html`, com os três temas (claro, escuro
automático e escuro forçado) logo abaixo. Para mudar a identidade inteira do app
basta trocar essas variáveis — nenhuma cor está escrita à mão no meio do código.

| | Claro | Escuro |
|---|---|---|
| Barra e navegação | `--chrome` `#101F38` | mesmo |
| Fundo | `--bg` `#EFF1F6` | `#0D131E` |
| Destaque / positivo | `--go` `#1863B8` | `#5BA8F2` |
| Texto em cima do destaque | `--on-go` `#FFFFFF` | `#0B1220` |
| Atenção | `--warn` `#8C5D09` | `#D6A040` |
| Recusa | `--stop` `#A63A2D` | `#DE7765` |

Todos os pares de texto e fundo passam em WCAG AA (4,5:1 ou mais).
Se trocar `--go` por outra cor, confira o `--on-go` junto: é ele que garante
que o texto em cima do botão continue legível nos dois temas.

## Dados salvos

Ficam no `localStorage` do navegador, na chave `meubrick-v1`. **Não renomeie
essa chave** — o nome é antigo, de antes do app virar MeuFLIP, mas é onde estão
os negócios já lançados. Trocar o nome apaga o histórico. Para levar os dados
para outro aparelho, use o botão de backup na barra do topo (ícone de banco de
dados), que exporta um `.json`.

## Celular e PC

O app é o mesmo arquivo nos dois, mas algumas coisas mudam conforme o aparelho.

**Só no celular**

- **Barra fixa do teto na Régua.** Quando o card grande sai da tela, uma faixa
  desce embaixo do cabeçalho com o teto e o veredito, acompanhando a cor. Ela
  vive fora de `#v-regua` de propósito: `.view` tem animação com `transform`, e
  `transform` em um ancestral quebra `position:fixed`.
- Alvos de toque maiores no slider (40px) e nos chips.
- Carrossel de insígnias com `scroll-snap`.

**Só no PC (a partir de 920px)**

- Navegação vira barra lateral, atalhos `1`–`5`, `N`, `T`, `Esc`.
- Controles da Régua com largura limitada — sem isso um campo de 4 dígitos
  esticava para 650px.
- Estado vazio ocupa a largura toda e mostra os atalhos de teclado.

**Texto que muda sozinho**

`.p-toque` e `.p-fino` trocam "Toque" por "Clique" via `@media (hover:hover) and
(pointer:fine)`. A dica de atalho (`.empty .dica`) segue a mesma regra. Se for
mexer nisso, cuidado com a **ordem** das regras: elas têm a mesma
especificidade, então a última do arquivo vence.

**Uma armadilha do Início**

Já teve ali uma grade de duas colunas com faixa de 330px à direita. Não use: a
grade é implícita, então `grid-row: 2 / -1` volta para a linha 1 e `span 50`
inventa 49 gaps. Coluna única com larguras limitadas resolve melhor.
