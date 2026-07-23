# Vídeo Hero Manifesto — Tetriz Digital

Vou montar um MP4 cinematográfico de ~12 segundos (1920x1080, sem áudio) usando as 16 imagens noir do projeto, no estilo "manifesto" — cortes ritmados, Ken Burns, flashes em amarelo #FFBB00 e palavras-chave sobrepostas.

## Entrega
- Arquivo único em `/mnt/documents/tetriz-hero-manifesto.mp4` para download (não altera o site).

## Direção
- **Duração**: ~12s a 30fps (360 frames).
- **Paleta**: preto, cinza, amarelo mostarda #FFBB00.
- **Tipografia**: Space Grotesk Bold, palavras rotativas grandes no canto (ATRAÇÃO, CRIATIVIDADE, ESTRATÉGIA, PERFORMANCE, RESULTADO, TETRIZ).
- **Ritmo**:
  - 0–2s: abertura lenta (hero-manifesto) com fade-in + Ken Burns.
  - 2–9s: 10 cortes rápidos (0.5–0.9s cada) das demais imagens, com zoom sutil e flash amarelo entre alguns cortes.
  - 9–12s: fechamento em `variation-trophy-moment` / `variation-horizon-line` com palavra final "TETRIZ" segurando na tela.
- **Efeitos**: Ken Burns (zoom/pan), vinheta preta, grão sutil, flashes de 2 frames em #FFBB00 nos cortes principais, letterbox opcional para reforçar o cinema.

## Execução técnica
- Uso o skill `video-creator` (Remotion) para ter controle total sobre timing, tipografia e overlays — mais confiável que ffmpeg puro para as sobreposições de texto e flashes.
- Setup do projeto Remotion em `/tmp/remotion-hero/`, carregando as 16 imagens de `src/assets/*.jpg` via `staticFile`.
- Componentes: `KenBurnsImage` (transform baseado em frame), `WordOverlay` (rotação sincronizada com cortes), `FlashCut` (frame amarelo).
- Render headless para `/mnt/documents/tetriz-hero-manifesto.mp4` via script programático (`renderMedia`).
- QA: extrair 6 frames-chave com `bunx remotion still` e inspecionar antes de entregar.

## Resultado
Vídeo pronto para download com `<presentation-artifact>`. Não altera nenhum arquivo do site.
