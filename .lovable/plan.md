# Experiência "Entrando no Site" — Trilho de Câmera Cinematográfico

Objetivo: o usuário sente que está **atravessando cenários** do topo ao rodapé, como uma câmera avançando por dentro do site. Cada seção deixa de ser "uma dobra" e vira "um ambiente" com entrada, permanência e saída.

Intensidade alvo: **cinematográfico marcante** (entre sutil e experimental) — profundidade e transições claras, mas leitura preservada e nenhum pin longo que "trave" o scroll.

## O que muda na prática

### 1. Camada global de câmera (novo)
Um wrapper 3D no topo da árvore (`perspective` real) aplica leve deslocamento em Z + rotação conforme o scroll global, dando a sensação de estar dentro de um corredor.
- `perspective: 1400px` no shell, `transform-style: preserve-3d` nas seções.
- Vinheta e letterbox já existentes ganham intensidade dinâmica (respiram com a velocidade do scroll).
- Grão sutil animado por cima para reforçar o filme.

### 2. Transições entre seções = "portais"
Cada troca de seção vira uma passagem de câmera, não um corte:
- **Hero → Manifesto**: dolly-in que atravessa o gradiente inferior; o texto do Manifesto surge "de dentro" da tela vindo do fundo (Z negativo → 0).
- **Manifesto → Fase 01 (O Jogo)**: câmera recua, o tabuleiro entra rotacionado e se endireita.
- **Fase 01 → Fase 02 (Método TETRIZ)**: transição por letras — as letras do acróstico caem "por cima" da câmera antes de se assentarem.
- **Fase 02 → Troféus**: iris-wipe (já existe nos modais) reaproveitado como transição de sala.
- **Troféus → Jogadores**: já tem duotone→RGB; reforçar com leve push-in.
- **Jogadores → Arena → Times → Agendar**: cada uma entra por um eixo diferente (Z, Y, escala) para o passeio não ficar repetitivo.

### 3. Entrada de cada seção
Padrão único aplicado a todas via ScrollTrigger:
- Fundo entra primeiro (parallax lento, Z distante).
- Camada de mídia/visual entra em seguida (parallax médio).
- Texto/UI entra por último, mais próximo da câmera (Z=0), com stagger.
- Saída espelhada: ao sair, o conteúdo recua em Z antes de sumir — reforça "a câmera passou por aqui".

### 4. Scroll e ritmo
- Lenis continua cuidando da suavidade; ajustar `lerp` levemente para dar peso.
- Velocidade do scroll alimenta a intensidade da vinheta e do leve motion blur (filtro CSS).
- Sem novos pins longos: as animações são scrubbed no range natural de cada seção para não travar a navegação (respeitando o ajuste recente do tabuleiro).

### 5. Abertura reforçada (portal inicial)
Preloader existente ganha um "abrir de cortina" 3D: quando termina, a Hero entra vinda de Z distante em ~800ms, dando o gatilho de "entrei no site". Sem alongar o preload.

### 6. Acessibilidade e performance
- `prefers-reduced-motion`: desliga transformações 3D, mantém fades simples.
- Transformações apenas em `transform`/`opacity`/`filter` (GPU).
- `will-change` aplicado só nos elementos animados no viewport.
- Mobile: reduz profundidade (perspective maior, deslocamentos menores) para não enjoar.

## Escopo do que NÃO muda
- Conteúdo, textos, cores, tipografia, vídeos e imagens permanecem.
- Estrutura de rotas, SEO e componentes de negócio intactos.
- Botão WhatsApp, CTAs e modais funcionam igual.

## Arquivos afetados
- `src/routes/index.tsx` — novo wrapper de câmera, timelines de entrada/saída por seção, ajustes de transições.
- `src/styles.css` — utilitários 3D (`.cam-stage`, `.cam-layer-*`), grão animado, refino da vinheta reativa.
- (Possível) pequeno hook `useCameraScroll` inline no index para orquestrar a câmera global.

## Como você vai perceber o resultado
- Ao carregar: cortina 3D abre e a Hero "chega" até você.
- Ao rolar: sensação constante de avançar por dentro de ambientes, com profundidade real entre fundo, mídia e texto.
- Entre seções: nenhuma "quebra seca" — sempre uma passagem de câmera.
- Ao rolar rápido: leve blur/vinheta reforça a velocidade; ao parar, tudo assenta limpo e legível.
