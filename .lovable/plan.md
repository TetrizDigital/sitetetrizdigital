## Ajustes de layout da Hero + Manifesto

**1. Hero (`src/routes/index.tsx`)**
- Mudar o container do conteúdo de `justify-center` para `justify-end` + `pb-16 md:pb-24`, jogando o kicker "TETRIZ DIGITAL" + palavra rotativa para o canto inferior esquerdo, sem atrapalhar a visualização do vídeo.
- Remover os botões "AGENDAR CONVERSA" e "CONHECER O JOGO" da Hero.

**2. Seção Manifesto (logo abaixo)**
- Manter kicker + `MARKETING · BRANDING · PERFORMANCE` + parágrafo "Cada peça no lugar certo…".
- Adicionar, abaixo do parágrafo, os dois CTAs realocados da Hero:
  - `AGENDAR CONVERSA →` (mustard, fundo amarelo, link `#agendar`).
  - `CONHECER O JOGO` (outline branco, link `#jogo`).
- Centralizados horizontalmente, com `gap` e `flex-wrap`, e `data-reveal` para entrar no scroll.

## Fora de escopo
- Nenhuma outra seção é alterada.
- Vídeo, cores, palavras rotativas e animação seguem como estão.