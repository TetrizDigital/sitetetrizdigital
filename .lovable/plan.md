# Tetriz — Versão Cinematográfica "Director's Cut"

Objetivo: transformar a landing atual num **filme interativo de 7 atos**, onde cada seção é uma cena com câmera, luz, som e transição contínuas — mantendo toda a estrutura, textos e assets que já existem.

---

## Ato 0 — Preloader Cinematográfico (novo)
- Cortina preta com contador `00 → 100` em Space Grotesk mono, linha mostarda varrendo a tela.
- "TETRIZ PICTURES PRESENTS" fade-in/out (2s) antes de liberar a Hero.
- Bloqueia scroll até o vídeo da Hero estar `readyState >= 3`.

## Ato 1 — Hero (existente, potencializada)
- Mantém vídeo em cores originais + palavras rotativas no canto inferior esquerdo.
- Adiciona: **grain film** sutil (SVG turbulence), **letterbox 2.39:1** que abre em 21:9 no scroll, **chromatic aberration** leve nas bordas.
- Cursor custom: mira mostarda com coordenadas tipo câmera (X/Y).
- HUD discreto no canto: `REC ● 00:00` incrementando.

## Ato 2 — Manifesto
- "MARKETING · BRANDING · PERFORMANCE" entra letra a letra com **mask-reveal vertical** (como legenda de filme).
- Fundo ganha **spotlight** que segue o mouse (radial-gradient mostarda 4% opacity).

## Ato 3 — Fase 01 · O Jogo
- Tabuleiro entra com **câmera dolly-in** (scale 1.4→1 + perspective tilt) via ScrollTrigger scrub.
- Peça em hover projeta **luz volumétrica** (conic-gradient) atrás dela.
- Modal abre com **iris-wipe** (clip-path circle expandindo do ponto do clique).

## Ato 4 — Fase 02 · Método T-E-T-R-I-Z
- Letras caem com **física** (stagger + ease bounce) e projetam sombra longa.
- Linha de tempo horizontal mostarda conecta as 6 letras conforme scroll.

## Ato 5 — Troféus
- Grid entra em **split-flap** (cada card vira como painel de aeroporto).
- Modal do troféu: **push-3D** (card cresce e o resto do grid recua em z).

## Ato 6 — Jogadores / Arena / Times
- Jogadores: cards com **duotone preto+mostarda**, viram para cor real no hover com **RGB split** de 200ms.
- Arena: células com **parallax interno** (imagem se move contra o card no mousemove).
- Times: logos entram em **cascade wave** diagonal; faixa de stats com **count-up** já existente ganha ticker sonoro opcional.

## Ato 7 — CTA Final + Créditos
- CTA atual mantido, centralizado.
- Abaixo: **rolo de créditos** estilo cinema (Direção, Estratégia, Design, Performance…) subindo lento em loop.
- Corte final: tela preta + logo Tetriz + "FIM · 2026".

---

## Camadas globais (aplicadas ao site todo)

**Câmera de scroll**
- Lenis já instalado; adicionar `wrapper` com `perspective: 1200px`.
- Cada `<section>` recebe leve `rotateX` conforme entra/sai do viewport (±3°) — sensação de "trilho de câmera".

**Grão + Vignette + Letterbox**
- Overlay fixo `pointer-events:none` com SVG grain animado (8% opacity) e vignette radial.
- Barras letterbox top/bottom que respiram (12px → 40px) em seções-chave.

**Progress HUD**
- Substitui a barra atual por: timecode `SCENE 03/07 · 00:42` + mini-scrubber lateral com marcadores de cena clicáveis.

**Áudio (opcional, toggle no canto)**
- Trilha ambiente low-drone + SFX curtos em transições (whoosh nos pins, click nos modais). Muted por padrão com botão `SOUND ON`.

**Cursor**
- Mira custom global; vira "▶" sobre elementos clicáveis, "+" sobre peças do tabuleiro.

**Performance**
- Grain e spotlight só em `(min-width: 1024px)` e `prefers-reduced-motion: no-preference`.
- Vídeo Hero mantém autoplay/loop — sem scrubbing (já validado que ficou ruim).
- Todos os efeitos GSAP com `will-change` e cleanup nos `ScrollTrigger.getAll()`.

---

## Detalhes técnicos

- **GSAP**: já instalado. Adicionar plugin `SplitText` alternativa manual (split por span) — sem paid plugin.
- **Novo componente**: `<CinematicShell>` em `src/components/` (grain + vignette + letterbox + HUD + cursor).
- **Novo componente**: `<Preloader>` com `useEffect` liberando scroll.
- **Trilha**: 1 arquivo `ambient.mp3` (~200KB, 30s loop) + 3 SFX curtos em `src/assets/audio/`.
- **Sem mudanças** em: conteúdo, cores, fontes, rotas, backend.

---

## Entrega em 3 fases (posso fazer tudo ou parar em qualquer uma)

1. **Shell cinematográfico**: preloader + grain + letterbox + cursor + HUD timecode. (impacto visual imediato, ~1 iteração)
2. **Cenas turbinadas**: dolly-in Fase 01, mask-reveal Manifesto, split-flap Troféus, duotone Jogadores, parallax Arena.
3. **Créditos + áudio + câmera 3D global** (rotateX por seção).

Me diga se quer as 3 fases, só a 1, ou uma combinação — e se quer áudio incluído.
