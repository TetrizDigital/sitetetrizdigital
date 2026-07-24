## Objetivo
Substituir a grade retangular atual da Fase 01 — O Jogo por um tabuleiro no formato de peças de Tetris de verdade (referência: `image-3.png`) e trocar o modal do "VER PEÇA" por uma expansão in-place: conforme o usuário rola a página, a peça que está sob o cursor cresce e revela o conteúdo interno.

## Escopo (somente `src/routes/index.tsx` e um pouco de CSS inline)

### 1. Novo tabuleiro Tetris (visual)
- Substituir a grade `12 x 4` por uma grade mais fina (`14 colunas x 6 linhas`, cada célula ~70–90px) para permitir formas em L / T / S como na referência.
- Redefinir o `area` (gridArea) de cada peça para reproduzir o encaixe da imagem anexada:
  - `PRODUTO` — bloco L à esquerda (preto).
  - `MARCA` — T amarelo no topo-centro.
  - `PESSOAS` — bloco branco/off-white no topo-direito.
  - `MARKETING` — bloco longo horizontal no rodapé-esquerdo (branco).
  - `TECNOLOGIA` — bloco largo preto no rodapé-centro.
  - `DADOS` — quadrado pequeno amarelo no canto inferior direito.
- Paleta fiel à referência: preto `#0a0a0a`, mostarda `#FFBB00`, off-white `#f4f1ea`. Bordas sutis para dar a sensação de peça encaixada; sem gaps grandes (`gap: 4px`).
- Tipografia das peças em caixa-alta, `Space Grotesk 700`, alinhada ao canto superior-esquerdo, como na referência.

### 2. Interação de scroll + hover (expansão da peça)
Trocar o comportamento atual (clique → modal `setOpenPiece`) por uma expansão in-place controlada por scroll:

- Cada peça vira um "hover target". Estado local `hoveredId` mais um valor animado `expandProgress` (0 → 1) por peça.
- Enquanto o mouse estiver sobre uma peça, o progresso da peça em foco cresce proporcionalmente ao delta de scroll da página (rolar para baixo = expandir, rolar para cima = contrair). Se o mouse sair, a peça retorna suavemente para 0.
- Quando `expandProgress > 0.15`, a peça:
  - ganha `z-index` elevado, `scale` até ~1.35, sombra forte, e revela um painel interno com o texto do `popup` + link "AGENDAR CONVERSA →" (o mesmo conteúdo do modal atual).
  - as demais peças recebem `opacity: 0.35` e leve `blur` para foco visual.
- Quando `expandProgress === 1`, a peça ocupa uma área grande sobre o tabuleiro (posição absoluta, `inset` calculado a partir da célula) para caber o texto completo sem quebrar o layout.
- Implementação: `onWheel` no container do tabuleiro + `onMouseEnter/Leave` por peça, com `requestAnimationFrame` fazendo a interpolação. Fallback: em toque/mobile, mantém o clique abrindo o painel expandido no lugar.

### 3. Limpeza
- Remover o `Dialog`/modal `openPiece` desta seção (ou mantê-lo apenas como fallback mobile).
- Manter demais seções (Manifesto, Fase 02, etc.) intactas.

## Fora de escopo
- Nenhuma alteração na Hero, Manifesto, Método T-E-T-R-I-Z, Arena, CTA ou rodapé.
- Sem mudanças em conteúdo textual das peças — mesmo copy do array `PIECES`.
