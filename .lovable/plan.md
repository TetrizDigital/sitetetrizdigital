## Objetivo
Trocar a seção atual `#trofeus` (bloco simples "Marcas em movimento, times em jogo.") pela nova seção **03 — TROFÉUS** com título grande, subtítulo e grade 2×4 de cards de projetos, exatamente no espírito das imagens anexadas.

## Onde mexer
- Arquivo único: `src/routes/index.tsx`
- Substituir o bloco entre as linhas ~1220–1238 (o `<section id="trofeus">` atual). Nada mais é alterado.

## Estrutura da nova seção

### Cabeçalho (bloco preto, centralizado)
- Eyebrow amarelo `03 — TROFÉUS`.
- Título em duas linhas:
  - Linha 1 branca: **Não chamamos de cases.**
  - Linha 2 amarela mostarda: **Chamamos de troféus.**
- Subtítulo cinza: *Porque ganhamos o jogo. Passe o mouse e clique para ver a vitória.*
- Tipografia Space Grotesk 700, `clamp(2.5rem, 6vw, 5.5rem)`, letter-spacing negativo, igual ao restante do site.

### Grade de troféus (2 linhas × 4 colunas em desktop, 2 col em tablet, 1 col em mobile)
- 8 cards em grid, gap fino de 1px com linhas divisórias tracejadas cinza-escuro (efeito do anexo).
- Cada card: `aspect-[4/5]`, fundo preto profundo, imagem coberta com filtro escuro (opacity ~0.35), nome do troféu no rodapé em Space Grotesk 600 branco.
- **Hover**: imagem clareia (opacity 0.75), o card ganha destaque com o nome em branco 100% e aparece um botão amarelo **VER TROFÉU →** (Space Grotesk bold, preto sobre mostarda, cantos retos), tudo com transição suave 400ms — o efeito imita o anexo (image-18).
- Cursor pointer no card inteiro. Clique abre o modal (item abaixo).

### Placeholders (8 cards) — reutilizam imagens já existentes em `src/assets/`
| # | Nome | Cliente fictício | Categoria | Imagem base |
|---|---|---|---|---|
| 1 | Reposiciona Varejo | Marca de moda regional | Rebranding + Performance | `service-project.jpg` |
| 2 | Lançamento X | Startup SaaS | Campanha de Lançamento | `service-campaign.jpg` |
| 3 | Performance 360 | E-commerce nacional | Mídia + CRO | `hero-blocks.jpg` |
| 4 | Rebrand Norte | Rede alimentícia | Identidade + Naming | `service-consulting.jpg` |
| 5 | Campanha Verão | Brand D2C | Sazonal Multiplataforma | `method-falling.jpg` |
| 6 | Impacto Social | ONG | Branding + Ativação | `cta-final.jpg` |
| 7 | E-commerce Up | Marketplace B2B | Site + Performance | `service-operation.jpg` |
| 8 | Institucional | Indústria familiar | Vídeo + Site | `tetris-field.jpg` |

Todas essas imagens já estão importadas no topo do arquivo — nenhuma nova asset será criada.

### Modal de detalhes (clique em qualquer card)
- Overlay preto 92%, `position: fixed inset-0`, `z-[100]`, fecha ao clicar fora, tecla ESC ou no botão ✕.
- Painel centralizado, `max-w-5xl`, fundo `#0a0a0a`, sem borda amarela (respeitando a preferência já estabelecida — apenas sombra suave).
- Layout do modal: imagem grande à esquerda (aspect 4/3), coluna direita com:
  - Categoria em eyebrow mostarda.
  - Nome do troféu como H3 grande (Space Grotesk 700).
  - Cliente fictício em cinza.
  - Parágrafo curto (placeholder: "Case em construção. Em breve, os detalhes desta vitória.")
  - Lista de 3 resultados mock ("+ X% de conversão", etc.) em bullets amarelos.
  - Botão CTA `FALAR SOBRE ESTE JOGO →` linkando para `#agendar`.
- Animação de entrada: fade + subtle scale (0.98 → 1) em 250ms via CSS transition (sem GSAP novo).

### Estado React
- Um único `useState<string | null>` para `openTrophyId`.
- Array `TROPHIES` declarado no topo do arquivo (junto de `SERVICES`, `FAQ`, etc.) para manter o padrão.
- Handler ESC dentro de `useEffect` quando o modal está aberto; `document.body.style.overflow = "hidden"` enquanto aberto.

## O que NÃO muda
- Âncoras `#jogadores` e `#times` continuam existindo dentro da nova seção (spans invisíveis), para o menu não quebrar.
- Nenhum outro bloco (Manifesto, Fase 01, Método, FAQ, CTA final) é alterado.
- Sem novas dependências, sem novas assets, sem alterar `styles.css`.

## Verificação
1. `bun run build` para garantir que a substituição compila.
2. Playwright rápido navegando para `/#trofeus` e capturando screenshot desktop e mobile para conferir a grade, hover state (via `page.hover`) e abertura do modal.
