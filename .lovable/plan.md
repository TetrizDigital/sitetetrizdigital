## Objetivo
Gerar uma imagem única PNG do tabuleiro Tetriz — exatamente no layout da referência (image-5.png) — sem bordas, para depois substituir o SVG atual da Fase 01 do site.

## Especificação da imagem
- **Arquivo**: `src/assets/tetriz-board.png`
- **Dimensões**: 1600x720 (proporção ~2.22:1, igual à referência)
- **Fundo**: transparente (`transparent_background: true`)
- **Sem bordas / sem contornos / sem sombras externas** — peças se tocando perfeitamente
- **Modelo**: `premium` (garantir legibilidade dos rótulos)

### Layout (idêntico ao anexo image-5.png)
Linha superior:
- PRODUTO — bloco preto (quadrado, canto sup. esq.)
- MARCA — peça amarela em formato T invertido no centro-superior
- PESSOAS — bloco off-white (bege claro) à direita

Linha inferior:
- MARKETING — bloco off-white à esquerda
- TECNOLOGIA — bloco preto largo ao centro
- DADOS — bloco amarelo pequeno à direita

### Estilo
- Cores exatas: preto `#0A0A0A`, amarelo mostarda `#FFBB00`, off-white `#F2ECDF`
- Rótulos em Space Grotesk Bold, brancos sobre preto/amarelo e pretos sobre off-white
- Peças encaixadas como Tetris real, sem gaps, sem bordas visíveis, sem stroke
- Aparência flat/vetorial limpa, sem gradientes nem sombras

## Próximos passos (após aprovação)
1. Gerar a imagem com `imagegen--generate_image` (premium, transparente).
2. Verificar visualmente (view do arquivo) — se rótulos/formato divergirem, refazer com prompt ajustado ou usar `imagegen--edit_image` sobre a referência.
3. Entregar a imagem final para revisão antes de qualquer integração no site (a integração será um passo separado).
