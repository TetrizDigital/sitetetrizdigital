## Objetivo
Transformar o site em uma experiência de scroll cinematográfica, com suspense e revelações progressivas em TODAS as dobras — sem quebrar layouts, tipografia, cores (preto/branco/mostarda) nem funcionalidades já aprovadas (vídeo scrubbing, peças de Tetris, modais de troféus, etc.).

## Escopo (somente `src/routes/index.tsx` + adição opcional de utilitários em `src/styles.css`)
Nenhuma nova dependência. Uso do GSAP + ScrollTrigger + Lenis já instalados.

## Princípios de motion
- Ease padrão: `power3.out` para entradas, `power2.inOut` para pins.
- Duração base 0.9s, stagger 0.08s.
- Sempre com `will-change: transform, opacity` só durante a animação.
- Respeitar `prefers-reduced-motion`: registrar `gsap.matchMedia()` e desabilitar transforms grandes.
- Nada de bordas amarelas em cards/modais (constraint já estabelecida).

## Efeitos por dobra

### 1. Global (chrome)
- Barra de progresso amarela no topo, já existente, refinada com glow suave.
- Cursor "spotlight" opcional (radial gradient mostarda 6% seguindo o mouse em `<body>::before`) — desligado em mobile.
- Ao trocar de seção, um flash horizontal fino (linha 1px mostarda) percorre a viewport (Stripe-like divider).

### 2. HERO (vídeo scrubbing) — manter como está
- Adicionar apenas fade-out do texto rotativo e CTAs quando o scroll passa de 85% da hero (opacity/translateY 20px).

### 3. MANIFESTO ("MARKETING · BRANDING · PERFORMANCE")
- Split das 3 palavras: cada uma entra de baixo com blur 12px → 0, stagger 0.15s, pinada por 60% da altura da seção.
- Bullets mostarda escalam de 0 → 1 no meio da timeline.
- Parágrafo de apoio e CTAs revelam por último com fade + translateY.

### 4. FASE 01 — O JOGO (tabuleiro Tetris)
- Manter scrub existente do popup.
- Adicionar: título "FASE 01" com máscara de clip-path revelando letra por letra no enter.
- Tabuleiro entra com scale 0.9 → 1 + leve rotação 3D (rotateX 8deg → 0) enquanto a seção é pinada nos primeiros 30%.

### 5. Faixa amarela
- Texto com efeito "marquee reveal": cada palavra sobe atrás de uma máscara preta ao entrar no viewport.

### 6. FASE 02 — MÉTODO (T-E-T-R-I-Z)
- Manter falling letters.
- Adicionar linha vertical mostarda que "desenha" (scaleY 0→1) do topo ao fundo conforme scroll da seção (ScrollTrigger scrub).
- Cada linha de descrição faz fade + slide-in lateral alternado (esquerda/direita).

### 7. ONDE ENTRAMOS (Campanha, Projeto, Consultoria, Operação)
- Cards entram em cascata diagonal (stagger 0.12s, translate x/y opostos).
- No hover mantém o brilho atual; adicionar tilt 3D sutil (perspective 1000, rotateY até 4deg) via mousemove.

### 8. TROFÉUS (grid 2×4)
- Cabeçalho: título "Não chamamos de cases / Chamamos de troféus" — segunda linha entra com clip-path wipe da esquerda p/ direita 700ms.
- Cards do grid revelam com stagger em ondas (4+4), scale 0.96 → 1 + fade.
- Ao passar por cima, imagem faz parallax interno de 8px (mousemove).
- Modal: entrada já existe; refinar para blur backdrop animado (backdrop-filter 0 → 12px).

### 9. JOGADORES
- Título com destaque mostarda entra por word-split.
- Cards de jogadores em cascata vertical (stagger 0.08s), placeholder faz scale-in.
- Ao chegar no fim, aparece linha "TODO MUNDO JOGA" varrendo horizontalmente.

### 10. ARENA (bento grid)
- Cada célula do bento entra individualmente com escala/opacidade dependendo do seu tamanho (célula maior demora mais).
- Ícones fazem "draw" (stroke-dashoffset) se forem SVG; se forem emoji/placeholder, pulsam 1x.

### 11. TIMES
- Cabeçalho branco: título entra com word-split.
- Grid de logos: cada slot revela em stagger 0.05s com filtro `grayscale(1) → grayscale(0.2)`.
- Faixa de estatísticas: números fazem count-up (0 → valor final) via ScrollTrigger + `gsap.to({val})` quando entram no viewport.

### 12. CTA FINAL ("Quer jogar o nosso jogo?")
- Palavras destacadas em mostarda pulsam 1x na entrada.
- Botão CTA com glow ambar pulsante contínuo (loop suave 2s).

## Implementação técnica
- Consolidar TUDO dentro do `gsap.context()` existente (linha ~763) para cleanup automático.
- Adicionar `data-*` hooks nos elementos: `data-word-split`, `data-cascade`, `data-tilt`, `data-count-up`, `data-clip-reveal`, `data-draw-line`.
- Helpers no topo do arquivo:
  - `splitWords(el)` — divide innerText em `<span>` por palavra.
  - `initTilt(el)` — mousemove listener com cleanup.
  - `initCountUp(el)` — lê `data-value` e anima.
- `gsap.matchMedia()` com breakpoint `(min-width: 768px)` para efeitos pesados; mobile mantém apenas fades simples.
- Todos os ScrollTriggers usam `start: "top 80%"`, `end: "bottom 20%"`, `toggleActions: "play none none reverse"` — exceto os com `scrub: true` explicitamente.

## O que NÃO muda
- Estrutura HTML das seções, textos, imagens, cores, fontes.
- Vídeo scrubbing da hero, tabuleiro de Tetris, modais de troféus.
- Nenhuma nova dependência npm; sem alterar `router.tsx`, `__root.tsx`, ou `styles.css` além de eventual bloco de utilitários (`.will-animate`, keyframe de glow do CTA).

## Verificação
1. `bun run build` para garantir 0 erros.
2. Playwright: scroll programático `window.scrollTo` em passos, screenshot em cada seção (hero, manifesto, fase01, troféus, jogadores, arena, times, cta) desktop 1440 e mobile 390.
3. Conferir ausência de bordas amarelas em modais e cards de troféus.
4. Testar `prefers-reduced-motion` via Playwright emulate para garantir fallback.
