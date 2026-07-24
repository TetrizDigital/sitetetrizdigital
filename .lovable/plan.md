## Objetivo
Trocar o vídeo da Hero pelo novo `Video_Hero_site-2.mp4`, mantendo as cores originais dele (sem grayscale), com as palavras-chave rotativas sobrepostas na frente. Mover a tagline "Marketing · Branding · Performance" para uma dobra logo abaixo, centralizada.

## Passos

**1. Upload do novo vídeo para o CDN**
- `lovable-assets create --file /mnt/user-uploads/Video_Hero_site-2.mp4 --filename hero-video-final.mp4` → gera `src/assets/hero-video-final.mp4.asset.json`.

**2. Editar `src/routes/index.tsx` — Hero limpa**
- Substituir o import do vídeo atual (`tetriz-hero-manifesto`) pelo novo pointer.
- Remover os filtros CSS `grayscale/contrast/brightness` do `<video data-hero-img>` → cores originais.
- Suavizar/remover a vinheta escura para não sujar as cores.
- Manter `autoplay muted loop playsinline` + fallback poster já existente.
- Manter a rotação automática das palavras (ATRAÇÃO, CRIATIVIDADE, ESTRATÉGIA, PERFORMANCE, RESULTADO, TETRIZ) em ~1.8s, sobrepostas em Space Grotesk Bold amarelo #FFBB00.
- Remover da Hero o texto fixo "Marketing · Branding · Performance" e qualquer subtítulo redundante — deixar só logo/nav + palavra rotativa.

**3. Nova dobra: "Manifesto" (logo abaixo da Hero)**
- Inserir uma seção curta full-width, fundo preto, altura ~40–50vh, texto centralizado:
  - Linha grande: **MARKETING · BRANDING · PERFORMANCE** (Space Grotesk Bold, branco com ponto amarelo entre as palavras).
  - Uma sublinha curta de assinatura (ex.: "Tetriz Digital — onde cada peça se encaixa.").
- Animação de entrada suave via GSAP (já existente no projeto, usando `data-scale-in` / auto-reveal).

**4. QA**
- Verificar autoplay no preview.
- Confirmar que não há mais faixa preta vazia e que a próxima seção aparece na sequência natural.

## Fora de escopo
- Não altero as demais seções (Fase 01, Fase 02, Arena, CTA).
- Não mexo em lógica de scroll/GSAP fora da Hero e da nova dobra.