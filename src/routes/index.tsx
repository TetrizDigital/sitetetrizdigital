import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import heroBlocks from "@/assets/hero-blocks.jpg";
import heroManifesto from "@/assets/hero-video-final.mp4.asset.json";
import tetrisField from "@/assets/tetris-field.jpg";
import methodFalling from "@/assets/method-falling.jpg";
import serviceCampaign from "@/assets/service-campaign.jpg";
import serviceProject from "@/assets/service-project.jpg";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceOperation from "@/assets/service-operation.jpg";
import ctaFinal from "@/assets/cta-final.jpg";
import tetrizBoardImg from "@/assets/tetriz-board.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tetriz Digital — Arquitetos de Crescimento" },
      {
        name: "description",
        content:
          "Marketing, Branding e Performance. Não somos uma agência: somos arquitetos de crescimento. Cada peça no lugar certo.",
      },
      { property: "og:title", content: "Tetriz Digital — Arquitetos de Crescimento" },
      {
        property: "og:description",
        content:
          "Marketing, Branding e Performance. Peça por peça, movimento por movimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tetriz Digital" },
      {
        name: "twitter:description",
        content: "Arquitetos de crescimento. Marketing, Branding e Performance.",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const HERO_WORDS = [
  "ATRAÇÃO!",
  "CRIATIVIDADE!",
  "CONVERSÃO!",
  "RESULTADOS!",
  "CRIATIVIDADE!",
  "ESTRATÉGIA!",
  "CRESCIMENTO!",
  "FIDELIZAÇÃO!",
  "POSICIONAMENTO!",
  "RELACIONAMENTO!",
];

type Piece = {
  id: string;
  title: string;
  sub: string;
  popup: string;
  color: "black" | "yellow" | "light";
  path: string;
  labelX: number;
  labelY: number;
};

const PIECES: Piece[] = [
  {
    id: "produto",
    title: "Produto",
    sub: "O que você entrega ao mundo.",
    popup:
      "Antes de comunicar, entendemos o que a empresa vende, como entrega e quais diferenciais sustentam essa promessa. O produto é a peça de partida: sem clareza sobre ele, nenhuma estratégia se encaixa por completo.",
    color: "black",
    path: "M4 4 H128 V120 H4 Z",
    labelX: 66,
    labelY: 62,
  },
  {
    id: "marca",
    title: "Marca",
    sub: "A percepção que fica.",
    popup:
      "Marca não é só aparência. É a forma como a empresa é lembrada, reconhecida e desejada. Por isso, trabalhamos posicionamento, linguagem e presença para construir uma percepção forte, coerente e memorável.",
    color: "yellow",
    path: "M130 4 H358 V66 H282 V124 H206 V66 H130 Z",
    labelX: 244,
    labelY: 40,
  },
  {
    id: "pessoas",
    title: "Pessoas",
    sub: "Quem faz o jogo acontecer.",
    popup:
      "Toda marca é feita por pessoas e para pessoas. Entendemos o time, o cliente, o público e a cultura por trás de cada negócio para criar uma comunicação mais humana, verdadeira e conectada.",
    color: "light",
    path: "M360 4 H488 V108 H390 V106 H360 Z",
    labelX: 424,
    labelY: 58,
  },
  {
    id: "marketing",
    title: "Marketing",
    sub: "O movimento que conecta tudo.",
    popup:
      "Marketing é a peça que coloca a estratégia em movimento. Conectamos canais, campanhas, conteúdos e ações para transformar presença em relacionamento, relacionamento em confiança e confiança em resultado.",
    color: "light",
    path: "M4 120 H130 V66 H206 V124 H168 V192 H4 Z",
    labelX: 86,
    labelY: 156,
  },
  {
    id: "tecnologia",
    title: "Tecnologia",
    sub: "A engrenagem que sustenta.",
    popup:
      "A tecnologia amplia possibilidades, acelera processos e abre novos caminhos para marcas que querem evoluir. Na Tetriz, usamos ferramentas, dados e inovação para criar soluções mais inteligentes e eficientes.",
    color: "black",
    path: "M168 124 H334 V108 H390 V192 H168 Z",
    labelX: 278,
    labelY: 158,
  },
  {
    id: "dados",
    title: "Dados",
    sub: "A leitura de cada jogada.",
    popup:
      "Dados mostram o que está funcionando, o que precisa mudar e qual deve ser o próximo movimento. Eles nos ajudam a tomar decisões com mais clareza, menos achismo e mais estratégia.",
    color: "yellow",
    path: "M390 108 H488 V192 H390 Z",
    labelX: 439,
    labelY: 150,
  },
];


const METHOD = [
  {
    letter: "T",
    title: "Traduzir",
    tag: "Entender o jogo antes de jogar.",
    popup:
      "Antes de criar qualquer movimento, mergulhamos no negócio, no público e nos objetivos da marca. Traduzimos desafios, ideias e necessidades em clareza estratégica.",
  },
  {
    letter: "E",
    title: "Estruturar",
    tag: "Montar o tabuleiro certo.",
    popup:
      "Com clareza sobre o cenário, organizamos os caminhos. Definimos posicionamento, canais, linguagem, campanhas e prioridades para que cada peça tenha uma função.",
  },
  {
    letter: "T",
    title: "Transformar",
    tag: "Peça por peça em movimento.",
    popup:
      "Aqui, a estratégia ganha forma. Transformamos ideias em conteúdos, campanhas, identidade, presença digital e ações capazes de aproximar a marca do seu público.",
  },
  {
    letter: "R",
    title: "Relacionar",
    tag: "Cada ação fortalece a próxima.",
    popup:
      "Uma marca cresce quando cria conexão. Por isso, construímos comunicação com intenção, frequência e verdade, fortalecendo a relação entre empresa, público e mercado.",
  },
  {
    letter: "I",
    title: "Inteligência",
    tag: "Dados guiando cada jogada.",
    popup:
      "Nenhum movimento precisa depender de achismo. Analisamos dados, comportamento e performance para entender o que funciona, ajustar rotas e evoluir com mais precisão.",
  },
  {
    letter: "Z",
    title: "Zelar",
    tag: "Proteger e sustentar a vitória.",
    popup:
      "Depois que a marca entra em movimento, seguimos acompanhando, cuidando e aprimorando cada etapa. Crescimento real exige constância, atenção e evolução contínua.",
  },
];

const SERVICES = [
  {
    id: "campanha",
    title: "Campanha",
    sub: "Estratégia para enxergar o tabuleiro com clareza.",
    body: [
      "Campanhas são movimentos estratégicos criados para gerar atenção, conexão e resultado em um período específico. Elas podem nascer de uma data comemorativa, de um lançamento, de uma ação comercial, de uma promoção ou de uma necessidade de posicionamento.",
      "Na Tetriz, uma campanha não começa pela arte. Ela começa pela leitura do cenário: entendemos o público, o objetivo, a mensagem principal, os canais mais importantes e a melhor forma de transformar uma ideia em desejo, lembrança e ação.",
      "A partir disso, criamos o conceito, os desdobramentos visuais, os roteiros, os conteúdos, as peças digitais e, quando necessário, toda a estratégia de tráfego para fazer essa campanha chegar nas pessoas certas.",
      "Mais do que aparecer, uma campanha precisa fazer sentido. Precisa ter força para prender atenção, clareza para comunicar e estratégia para gerar movimento.",
    ],
    pieces:
      "Key visual da campanha, artes para feed, stories, roteiros de reels, vídeos, anúncios, landing pages, criativos de tráfego, bastidores de captação e resultados.",
    image: serviceCampaign,
  },
  {
    id: "projeto",
    title: "Projeto",
    sub: "Uma entrega fechada para destravar uma nova fase.",
    body: [
      "Projetos são construções pontuais, criadas para resolver uma necessidade específica da marca. Pode ser um novo site, uma landing page, uma identidade visual, uma apresentação comercial, um vídeo institucional, um lançamento ou qualquer entrega que ajude a empresa a dar um próximo passo.",
      "Aqui, cada projeto é tratado como uma peça importante dentro do crescimento do cliente. Antes de executar, entendemos o contexto, o objetivo e o impacto que aquela entrega precisa gerar.",
      "Depois, estruturamos o caminho criativo e técnico para que a peça final não seja apenas bonita, mas funcional, estratégica e alinhada com a essência da marca.",
      "Um projeto bem construído não termina na entrega. Ele se torna uma ferramenta para vender melhor, apresentar melhor, comunicar melhor ou fortalecer a presença da empresa no mercado.",
    ],
    pieces:
      "Sites, landing pages, identidades visuais, apresentações, vídeos institucionais, materiais comerciais, catálogos, peças de lançamento, layouts, naming, conceitos visuais e projetos especiais.",
    image: serviceProject,
  },
  {
    id: "consultoria",
    title: "Consultoria",
    sub: "Estratégia para enxergar o tabuleiro com clareza.",
    body: [
      "Nem sempre a empresa precisa começar criando. Às vezes, ela precisa primeiro entender onde está, para onde quer ir e quais peças precisam ser reposicionadas.",
      "A consultoria da Tetriz entra nesse momento: quando a marca precisa de clareza, direção e estratégia para tomar decisões melhores. Analisamos comunicação, presença digital, posicionamento, conteúdo, processos, oportunidades e gargalos que podem estar impedindo o crescimento.",
      "Nosso papel é olhar para o jogo com visão externa e estratégica, identificando caminhos possíveis e organizando prioridades. A partir disso, entregamos direcionamentos práticos, que ajudam o cliente a entender quais movimentos fazem sentido e quais precisam ser ajustados.",
      "A consultoria não é sobre dizer o que a empresa deve ser. É sobre revelar o potencial que ela já tem e mostrar como transformar isso em ação.",
    ],
    pieces:
      "Diagnóstico de marca, análise de redes sociais, estudo de posicionamento, plano de ação, mapa de conteúdo, análise de concorrência, planejamento estratégico, apresentação de direcionamento e recomendações práticas.",
    image: serviceConsulting,
  },
  {
    id: "operacao",
    title: "Operação Recorrente",
    sub: "A marca em movimento todos os meses.",
    body: [
      "A operação recorrente é onde a Tetriz entra no jogo de forma contínua. É o trabalho que mantém a marca viva, presente, estratégica e em evolução todos os meses.",
      "Aqui, acompanhamos o cliente de perto. Planejamos conteúdos, criamos campanhas, produzimos vídeos, desenvolvemos artes, organizamos ações, analisamos dados, ajustamos rotas e buscamos novas formas de fazer a marca crescer.",
      "É uma construção constante, feita peça por peça. Cada mês traz novos desafios, novas oportunidades e novos movimentos. Por isso, nosso trabalho vai além de postar: pensamos em presença, posicionamento, relacionamento, venda, percepção e resultado.",
      "A operação recorrente é para empresas que entendem que crescimento não acontece em uma única jogada. Ele nasce da consistência, da estratégia e da evolução contínua.",
    ],
    pieces:
      "Planejamento mensal, calendário editorial, captação de fotos e vídeos, reels, artes estáticas, carrosséis, stories, campanhas sazonais, gestão de redes sociais, tráfego pago, relatórios, reuniões de alinhamento e acompanhamento de performance.",
    image: serviceOperation,
  },
];

const FAQ = [
  {
    q: "Vocês são uma agência de marketing?",
    a: "Não. Somos arquitetos de crescimento. Enquanto agências executam campanhas isoladas, nós projetamos sistemas onde cada ação fortalece a próxima — produto, marca, pessoas, marketing, tecnologia e dados encaixados como peças.",
  },
  {
    q: "Como começa um projeto com a Tetriz?",
    a: "Sempre pelo entendimento. Antes de propor qualquer movimento, mergulhamos no seu negócio, no público e nos objetivos. Só depois estruturamos o tabuleiro e definimos quais peças precisam entrar em cena.",
  },
  {
    q: "Vocês atendem empresas de qualquer porte?",
    a: "Atendemos marcas que querem crescer com consistência e estratégia, do primeiro projeto ao acompanhamento mensal recorrente. O ponto de partida é sempre a clareza sobre o produto e o objetivo.",
  },
  {
    q: "Qual a diferença entre Projeto e Operação Recorrente?",
    a: "Projeto é uma entrega fechada para destravar uma fase (site, identidade, lançamento). Operação Recorrente é a marca em movimento todos os meses — planejamento, conteúdo, campanhas, dados e evolução contínua.",
  },
  {
    q: "Como falo com vocês?",
    a: "Direto pelo WhatsApp (19) 98704-6803 ou por e-mail em contato@tetrizdigital.com.br. A gente responde rápido e começa entendendo o seu jogo antes de propor qualquer movimento.",
  },
];

// Hit-zones over the Tetriz board image (percentages of the 1600x720 image)
// Grid is 12 cols x 4 rows. Values below correspond to the piece shapes.
type Zone = { left: number; top: number; width: number; height: number };
const PIECE_ZONES: Record<string, Zone[]> = {
  produto:    [{ left: 0,     top: 0,   width: 25,    height: 50 }],
  marca:      [
    { left: 25,    top: 0,    width: 41.67, height: 50 },
    { left: 41.67, top: 50,   width: 16.66, height: 25 },
  ],
  pessoas:    [{ left: 66.67, top: 0,    width: 33.33, height: 50 }],
  marketing:  [{ left: 0,     top: 50,   width: 25,    height: 50 }],
  tecnologia: [
    { left: 25,    top: 50,   width: 16.67, height: 50 },
    { left: 41.67, top: 75,   width: 16.66, height: 25 },
    { left: 58.33, top: 50,   width: 25,    height: 50 },
  ],
  dados:      [{ left: 83.33, top: 50,   width: 16.67, height: 50 }],
};

const PIECE_ACCENT: Record<string, string> = {
  produto: "#FFBB00",
  marca: "#0a0a0a",
  pessoas: "#FFBB00",
  marketing: "#FFBB00",
  tecnologia: "#FFBB00",
  dados: "#0a0a0a",
};

// Ease-out cubic for smoother visual response to scroll
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function TetrisBoard({ pieces }: { pieces: Piece[] }) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const progressRef = useRef<Record<string, number>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<Record<string, number>>({});

  // Ensure keys exist
  useEffect(() => {
    const init: Record<string, number> = {};
    pieces.forEach((p) => (init[p.id] = 0));
    progressRef.current = { ...init };
    targetRef.current = { ...init };
    setProgress(init);
  }, [pieces]);

  // Smooth interpolation loop (lower lerp = more fluid inertia)
  useEffect(() => {
    const LERP = 0.08;
    const tick = () => {
      let changed = false;
      const next = { ...progressRef.current };
      for (const k of Object.keys(next)) {
        const t = targetRef.current[k] ?? 0;
        const cur = next[k] ?? 0;
        const nv = cur + (t - cur) * LERP;
        if (Math.abs(nv - cur) > 0.0005) {
          next[k] = Math.max(0, Math.min(1, nv));
          changed = true;
        } else if (nv !== cur) {
          next[k] = t;
          changed = true;
        }
      }
      if (changed) {
        progressRef.current = next;
        setProgress(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Wheel handler: scroll while hovering a piece drives its expansion
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const STEP = 1 / 700; // more scroll needed = smoother, more controlled
    const onWheel = (e: WheelEvent) => {
      const id = hoverIdRef.current;
      if (!id) return;
      const t = targetRef.current[id] ?? 0;
      const delta = e.deltaY * STEP;
      const nt = Math.max(0, Math.min(1, t + delta));
      // Only intercept vertical wheel intent while hovering a piece
      if (Math.abs(e.deltaY) < 0.5) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      targetRef.current = {
        ...Object.fromEntries(Object.keys(targetRef.current).map((k) => [k, 0])),
        [id]: nt,
      };
      setOpenId(nt > 0.18 ? id : null);
    };
    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => el.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  const setHover = (id: string | null) => {
    hoverIdRef.current = id;
    const t = { ...targetRef.current };
    for (const k of Object.keys(t)) {
      if (k !== id) t[k] = 0;
    }
    targetRef.current = t;
  };

  const togglePiece = (id: string) => {
    const cur = targetRef.current[id] ?? 0;
    const shouldOpen = cur <= 0.5;
    targetRef.current = {
      ...Object.fromEntries(Object.keys(targetRef.current).map((k) => [k, 0])),
      [id]: shouldOpen ? 1 : 0,
    };
    setOpenId(shouldOpen ? id : null);
    hoverIdRef.current = id;
  };

  const activeId = Object.entries(progress).sort((a, b) => b[1] - a[1])[0]?.[0];
  const activeProgressRaw = activeId ? progress[activeId] ?? 0 : 0;
  const activeProgress = easeOut(activeProgressRaw);
  const activePiece = pieces.find((piece) => piece.id === activeId);
  const openPiece = pieces.find((piece) => piece.id === openId);

  return (
    <div className="mx-auto" style={{ maxWidth: 1180 }} data-reveal>
      <div
        ref={boardRef}
        className="relative"
        style={{ perspective: 1400 }}
        onMouseLeave={() => setHover(null)}
      >
        {/* Board image */}
        <div
          className="relative"
          style={{
            aspectRatio: "1600 / 720",
            width: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={tetrizBoardImg}
            alt="Tabuleiro Tetriz com peças estratégicas: Produto, Marca, Pessoas, Marketing, Tecnologia e Dados"
            width={1600}
            height={720}
            loading="lazy"
            draggable={false}
            className="block h-full w-full select-none"
            style={{
              transform: `scale(${1 + activeProgress * 0.02})`,
              transition: "transform .5s cubic-bezier(.22,.9,.28,1)",
              filter: activeProgress > 0.05 ? "brightness(.88)" : "brightness(1)",
            }}
          />

          {/* Hit zones + per-piece glow overlay */}
          {pieces.map((p) => {
            const zones = PIECE_ZONES[p.id] ?? [];
            const prog = easeOut(progress[p.id] ?? 0);
            const accent = PIECE_ACCENT[p.id] ?? "#FFBB00";
            const isActive = activeId === p.id && prog > 0.02;
            return (
              <div key={p.id} className="pointer-events-none absolute inset-0">
                {zones.map((z, i) => (
                  <div
                    key={i}
                    role={i === 0 ? "button" : undefined}
                    tabIndex={i === 0 ? 0 : -1}
                    aria-label={i === 0 ? `Ver peça ${p.title}` : undefined}
                    onMouseEnter={() => setHover(p.id)}
                    onFocus={() => setHover(p.id)}
                    onClick={() => togglePiece(p.id)}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      togglePiece(p.id);
                    }}
                    className="pointer-events-auto absolute cursor-pointer"
                    style={{
                      left: `${z.left}%`,
                      top: `${z.top}%`,
                      width: `${z.width}%`,
                      height: `${z.height}%`,
                      // Yellow highlight ring on the active piece
                      boxShadow: isActive
                        ? `inset 0 0 0 3px ${accent}, 0 0 40px ${accent}55`
                        : "inset 0 0 0 0 transparent",
                      transition: "box-shadow .4s cubic-bezier(.22,.9,.28,1)",
                    }}
                  />
                ))}
              </div>
            );
          })}

          {/* Active piece popup card, centered over the board */}
          {activePiece && activeProgress > 0.06 ? (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 w-[min(92%,620px)]"
              style={{
                transform: `translate(-50%, calc(-50% - ${activeProgress * 40}px)) scale(${0.9 + activeProgress * 0.1})`,
                opacity: Math.min(1, activeProgress * 1.4),
                zIndex: 80,
                transition: "opacity .18s linear",
                willChange: "transform, opacity",
              }}
            >
              <div
                style={{
                  background: "rgba(5,5,5,.94)",
                  border: "1px solid rgba(255,187,0,.7)",
                  boxShadow: "0 30px 90px -25px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.08) inset",
                  color: "#fff",
                  padding: "clamp(18px, 3vw, 32px)",
                }}
              >
                <div style={{ color: "var(--mustard)", fontSize: 11, fontWeight: 700, letterSpacing: ".28em" }}>
                  VER PEÇA
                </div>
                <h3 className="mt-3" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: .95 }}>
                  {activePiece.title}
                </h3>
                <p className="mt-3" style={{ color: "var(--mustard)", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", fontWeight: 500 }}>
                  {activePiece.sub}
                </p>
                <p className="mt-5" style={{ color: "#d7d7d7", fontSize: "clamp(14px, 1.25vw, 17px)", lineHeight: 1.65 }}>
                  {activePiece.popup}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Full modal when the user commits to a piece */}
      {openPiece ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-6 py-24"
          style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)" }}
          onClick={() => {
            setOpenId(null);
            targetRef.current = Object.fromEntries(Object.keys(targetRef.current).map((k) => [k, 0]));
          }}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden"
            style={{
              background: "#050505",
              border: "1px solid rgba(255,187,0,.72)",
              boxShadow: "0 36px 100px -25px rgba(0,0,0,.95), 0 0 0 1px rgba(255,255,255,.08) inset",
              color: "#fff",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar peça"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "var(--mustard)", color: "#000", fontSize: 20, fontWeight: 700 }}
              onClick={() => {
                setOpenId(null);
                targetRef.current = Object.fromEntries(Object.keys(targetRef.current).map((k) => [k, 0]));
              }}
            >
              ×
            </button>
            <div className="p-7 md:p-10">
              <div style={{ color: "var(--mustard)", fontSize: 11, fontWeight: 700, letterSpacing: ".28em" }}>
                VER PEÇA
              </div>
              <h3 className="mt-3 pr-12" style={{ fontSize: "clamp(2.25rem, 6vw, 4.75rem)", fontWeight: 700, lineHeight: .9 }}>
                {openPiece.title}
              </h3>
              <p className="mt-4" style={{ color: "var(--mustard)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 600 }}>
                {openPiece.sub}
              </p>
              <p className="mt-6" style={{ color: "#dedede", fontSize: "clamp(15px, 1.25vw, 18px)", lineHeight: 1.7 }}>
                {openPiece.popup}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <p
        className="mt-6 text-center"
        style={{ fontSize: 12, letterSpacing: ".3em", color: "#888", fontWeight: 500 }}
      >
        PASSE O MOUSE NA PEÇA E ROLE PARA ABRIR O POP-UP
      </p>
    </div>
  );
}

function Index() {
  
  const [openMethod, setOpenMethod] = useState<(typeof METHOD)[number] | null>(null);
  const [heroWordIdx, setHeroWordIdx] = useState(0);

  // Hero words auto-rotate every 1.8s
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const interval = window.setInterval(() => {
      setHeroWordIdx((prev) => (prev + 1) % HERO_WORDS.length);
    }, 1800);
    return () => window.clearInterval(interval);
  }, []);

  // Lenis + GSAP
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let rafId = 0;
    let rafVideoId = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      // Fade-up on any [data-reveal]
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: reduce ? 0 : 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      // Hero video: autoplay muted loop, fast start with poster fallback
      const heroVideo = document.querySelector<HTMLVideoElement>("[data-hero-img]");
      if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        heroVideo.loop = true;
        heroVideo.autoplay = true;
        heroVideo.preload = "auto";

        const tryPlay = () => {
          if (heroVideo.paused) {
            heroVideo.play().catch(() => {});
          }
        };

        // Attempt immediate play and retry until started
        tryPlay();
        const playInterval = window.setInterval(tryPlay, 500);
        const clearPlayInterval = () => window.clearInterval(playInterval);
        heroVideo.addEventListener("playing", clearPlayInterval, { once: true });
        heroVideo.addEventListener("loadeddata", tryPlay, { once: true });

        // Fallback: start on first user interaction if autoplay is blocked
        const interactionStart = () => {
          tryPlay();
          window.removeEventListener("pointerdown", interactionStart);
          window.removeEventListener("keydown", interactionStart);
        };
        window.addEventListener("pointerdown", interactionStart, { passive: true });
        window.addEventListener("keydown", interactionStart, { passive: true });
      }

      // Technical disassembly overlay pieces drift apart as user scrolls
      gsap.fromTo(
        "[data-tech-piece]",
        { x: 0, y: 0, rotate: 0, opacity: 0.35 },
        {
          x: (i) => (i % 2 === 0 ? 60 : -60),
          y: (i) => (i % 3 === 0 ? -40 : 40),
          rotate: (i) => (i % 2 === 0 ? 8 : -8),
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        },
      );


      // Tetris board 3D tilt on scroll
      gsap.fromTo(
        "[data-tetris-board]",
        { rotateX: 25, rotateZ: -6, scale: 0.9 },
        {
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-tetris-board]",
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        },
      );

      // TETRIZ letters falling
      gsap.utils.toArray<HTMLElement>("[data-fall-letter]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: -300, rotate: -20, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: reduce ? 0 : 1.1,
            delay: i * 0.08,
            ease: "bounce.out",
            scrollTrigger: { trigger: "[data-method]", start: "top 70%" },
          },
        );
      });

      // Service images cross-fade cycle
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card) => {
        const imgs = card.querySelectorAll<HTMLElement>("[data-svc-frame]");
        if (imgs.length <= 1) return;
        const tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.6, ease: "power2.inOut" } });
        imgs.forEach((_img, i) => {
          const next = imgs[(i + 1) % imgs.length];
          tl.to(imgs[i], { opacity: 0 }, "+=1.6").fromTo(next, { opacity: 0 }, { opacity: 1 }, "<");
        });
      });

      // Big yellow band — split highlight
      gsap.fromTo(
        "[data-band-yellow] .word",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduce ? 0 : 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-band-yellow]", start: "top 80%" },
        },
      );

      if (!reduce) {
        // ─── SITE-WIDE INTERACTIVE SCROLL ────────────────────────────────

        // 1) Scroll progress bar (yellow line, top of viewport)
        gsap.to("[data-scroll-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        });

        // 2) Parallax on any image/video marked [data-parallax]
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const depth = Number(el.dataset.parallax) || 0.25;
          gsap.fromTo(
            el,
            { yPercent: -depth * 50 },
            {
              yPercent: depth * 50,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") || el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        // 3) Auto-reveal every section heading + paragraph with stagger
        gsap.utils.toArray<HTMLElement>("section").forEach((sec) => {
          if (sec.hasAttribute("data-hero")) return;
          const targets = sec.querySelectorAll<HTMLElement>(
            "h1:not([data-no-reveal]), h2:not([data-no-reveal]), h3:not([data-no-reveal]), p:not([data-no-reveal]), [data-reveal-child]",
          );
          if (!targets.length) return;
          gsap.fromTo(
            targets,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: sec, start: "top 78%" },
            },
          );
        });

        // 4) Scale-in for cards / images tagged [data-scale-in]
        gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.88, opacity: 0, y: 30 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          );
        });

        // 5) Section pin-fade — each section subtly scales as it leaves viewport
        gsap.utils.toArray<HTMLElement>("section").forEach((sec) => {
          if (sec.hasAttribute("data-hero")) return;
          gsap.fromTo(
            sec,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.97,
              filter: "brightness(0.75)",
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "bottom 90%",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        // 6) Nav shrinks after scrolling past hero
        ScrollTrigger.create({
          trigger: "[data-hero]",
          start: "bottom top+=80",
          onEnter: () => document.querySelector(".nav")?.classList.add("nav-scrolled"),
          onLeaveBack: () => document.querySelector(".nav")?.classList.remove("nav-scrolled"),
        });
      }
    });

    return () => {
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
      if (rafVideoId) cancelAnimationFrame(rafVideoId);
      lenis?.destroy();
    };
  }, []);

  const currentWord = HERO_WORDS[heroWordIdx];
  const wordColor = heroWordIdx % 2 === 0 ? "#FFFFFF" : "#FFBB00";

  return (
    <div className="tetriz-root">
      <style>{`
        :root { --mustard: #FFBB00; }
        .tetriz-root { font-family: 'Space Grotesk', system-ui, sans-serif; background: #000; color: #fff; overflow-x: hidden; }
        .tetriz-root * { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .nav a { transition: color .2s ease; }
        .nav a:hover { color: var(--mustard); }
        .piece-tile { transition: transform .35s cubic-bezier(.2,.9,.25,1), box-shadow .35s ease; will-change: transform; }
        .piece-tile:hover { transform: translateY(-14px); box-shadow: 0 24px 60px -20px rgba(255,187,0,.35); }
        .piece-tile:hover .piece-glow { opacity: 1; }
        .piece-glow { transition: opacity .3s; opacity: 0; }
        .method-letter { transition: transform .3s ease, color .3s ease; }
        .method-letter:hover { transform: translateY(-8px); color: var(--mustard); }
        .service-card { transition: transform .5s cubic-bezier(.2,.9,.25,1); }
        .service-card:hover { transform: translateY(-8px); }
        .service-card:hover .service-title { color: var(--mustard); }
        .faq-item summary { cursor: pointer; list-style: none; }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] .faq-icon { transform: rotate(45deg); }
        .faq-icon { transition: transform .3s ease; }
        .whatsapp-cta { transition: transform .3s ease, background .3s ease; }
        .whatsapp-cta:hover { transform: translateY(-3px); background: var(--mustard); color: #000; }
        .modal-back { animation: fadeIn .25s ease; }
        .modal-body { animation: popIn .35s cubic-bezier(.2,.9,.25,1); }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn { from { opacity: 0; transform: translateY(20px) scale(.96) } to { opacity: 1; transform: none } }
        .grain::after {
          content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .06; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }
        @media (prefers-reduced-motion: reduce) {
          .piece-tile, .service-card, .method-letter { transition: none; }
        }
        .nav { transition: padding .35s ease, background .35s ease; }
        .nav-scrolled { padding-top: 10px !important; padding-bottom: 10px !important; background: rgba(0,0,0,.82) !important; }
        [data-scroll-progress] { transform-origin: 0 50%; transform: scaleX(0); }
      `}</style>

      {/* Scroll progress indicator */}
      <div
        data-scroll-progress
        className="fixed left-0 top-0 z-[60] h-[3px] w-full"
        style={{ background: "var(--mustard)", pointerEvents: "none" }}
      />

      {/* NAV */}
      <nav className="nav fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
           style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,.55)" }}>
        <a href="#jogo" className="flex items-center gap-2 font-bold tracking-tight" style={{ fontSize: 20 }}>
          <span style={{ color: "#fff" }}>TETRIZ</span>
          <span style={{ color: "var(--mustard)" }}>.</span>
        </a>
        <ul className="hidden gap-8 md:flex" style={{ fontSize: 14, fontWeight: 500, letterSpacing: ".05em" }}>
          <li><a href="#jogo">O Jogo</a></li>
          <li><a href="#metodo">Método</a></li>
          <li><a href="#trofeus">Troféus</a></li>
          <li><a href="#jogadores">Jogadores</a></li>
          <li><a href="#arena">Arena</a></li>
          <li><a href="#times">Times</a></li>
        </ul>
        <a
          href="#agendar"
          className="whatsapp-cta rounded-full border px-5 py-2 font-semibold"
          style={{ borderColor: "var(--mustard)", color: "var(--mustard)", fontSize: 13, letterSpacing: ".08em" }}
        >
          AGENDAR
        </a>
      </nav>

      {/* HERO — cinematic manifesto */}
      <section data-hero className="relative overflow-hidden" style={{ background: "#000", height: "100vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background video — cinematic manifesto */}
          <div className="absolute inset-0 z-0">
            {/* Fallback image: always visible behind the video */}
            <img
              src={heroBlocks}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />

            <video
              data-hero-img
              muted
              playsInline
              preload="auto"
              loop
              autoPlay
              poster={heroBlocks}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ willChange: "transform" }}
            >
              <source src={heroManifesto.url} type="video/mp4" />
            </video>

            {/* Subtle vignette only — preserve original video colors */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,.35) 100%)",
              }}
            />

            {/* Technical grid — construction lines */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[.12]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.25) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            {/* Scanlines */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,.5) 0px, rgba(255,255,255,.5) 1px, transparent 1px, transparent 3px)",
              }}
            />

            {/* Floating technical pieces — drift apart on scroll */}
            <div data-tech-piece className="pointer-events-none absolute left-[8%] top-[18%] h-16 w-16 border border-[rgba(255,187,0,.45)]" style={{ transform: "rotate(12deg)" }} />
            <div data-tech-piece className="pointer-events-none absolute right-[12%] top-[22%] h-24 w-24 border border-[rgba(255,255,255,.25)]" style={{ transform: "rotate(-8deg)" }} />
            <div data-tech-piece className="pointer-events-none absolute left-[15%] bottom-[28%] h-10 w-32 border-t border-b border-[rgba(255,187,0,.35)]" />
            <div data-tech-piece className="pointer-events-none absolute right-[18%] bottom-[22%] h-20 w-20 rounded-full border border-[rgba(255,255,255,.2)]" />
            <div data-tech-piece className="pointer-events-none absolute left-1/2 top-[12%] h-px w-32 -translate-x-1/2 bg-[rgba(255,187,0,.5)]" />
            <div data-tech-piece className="pointer-events-none absolute left-1/2 bottom-[18%] h-px w-48 -translate-x-1/2 bg-[rgba(255,255,255,.25)]" />

            {/* Corner brackets */}
            <div className="pointer-events-none absolute left-6 top-24 h-12 w-12 border-l border-t border-[rgba(255,187,0,.35)]" />
            <div className="pointer-events-none absolute right-6 top-24 h-12 w-12 border-r border-t border-[rgba(255,187,0,.35)]" />
            <div className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 border-b border-l border-[rgba(255,255,255,.2)]" />
            <div className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-[rgba(255,255,255,.2)]" />
          </div>

          {/* Foreground content — rotating words in front, driven by scroll */}
          <div className="relative z-10 mx-auto flex h-screen max-w-7xl flex-col justify-end px-6 pb-16 md:px-16 md:pb-24">
            <div className="mb-6 flex items-center gap-3" style={{ color: "var(--mustard)", fontSize: 12, letterSpacing: ".3em" }}>
              <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
              TETRIZ DIGITAL
            </div>
            <h1
              key={heroWordIdx}
              className="max-w-4xl"
              style={{
                fontWeight: 700,
                fontSize: "clamp(3rem, 10vw, 8rem)",
                lineHeight: 0.95,
                color: wordColor,
                animation: "fadeIn .5s ease",
                letterSpacing: "-.03em",
                textShadow: "0 8px 40px rgba(0,0,0,.7)",
              }}
            >
              {currentWord}
            </h1>
          </div>
        </div>
      </section>

      {/* MANIFESTO — tagline strip */}
      <section
        className="relative flex items-center justify-center px-6 py-24 md:py-32 text-center"
        style={{ background: "#000", color: "#fff" }}
      >
        <div className="mx-auto max-w-5xl">
          <div
            data-reveal
            className="mb-6 inline-flex items-center gap-3"
            style={{ color: "var(--mustard)", fontSize: 12, letterSpacing: ".4em" }}
          >
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
            TETRIZ DIGITAL
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
          </div>
          <h2
            data-reveal
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 6vw, 5.25rem)",
              lineHeight: 1,
              letterSpacing: "-.03em",
            }}
          >
            MARKETING
            <span style={{ color: "var(--mustard)", margin: "0 .35em" }}>·</span>
            BRANDING
            <span style={{ color: "var(--mustard)", margin: "0 .35em" }}>·</span>
            PERFORMANCE
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-2xl"
            style={{ color: "#bdbdbd", fontSize: 18, lineHeight: 1.6, fontWeight: 300 }}
          >
            Cada peça no lugar certo, cada movimento a serviço do próximo.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#agendar"
              className="whatsapp-cta inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold"
              style={{ background: "var(--mustard)", color: "#000", fontSize: 13, letterSpacing: ".1em" }}
            >
              AGENDAR CONVERSA →
            </a>
            <a
              href="#jogo"
              className="whatsapp-cta inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-semibold"
              style={{ borderColor: "rgba(255,255,255,.35)", color: "#fff", fontSize: 13, letterSpacing: ".1em" }}
            >
              CONHECER O JOGO
            </a>
          </div>
        </div>
      </section>

      {/* FASE 01 — O JOGO */}
      <section id="jogo" className="relative px-6 py-32 md:px-16 md:py-40" style={{ background: "#fff", color: "#000" }}>
        <div className="mb-20 max-w-6xl">
          <div className="mb-6 flex items-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "#FFBB00" }} data-reveal>
            <span style={{ width: 40, height: 1, background: "#FFBB00" }} />
            FASE 01 — O JOGO
          </div>
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: .95, letterSpacing: "-.03em" }}>
            Toda empresa possui peças.
          </h2>
          <p data-reveal style={{ fontWeight: 500, fontSize: "clamp(1.25rem, 2.5vw, 2.2rem)", marginTop: 16, color: "#666", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Poucas sabem como encaixá-las.
          </p>
        </div>

        {/* Tetris Board — real piece layout with scroll-driven hover expansion */}
        <TetrisBoard pieces={PIECES} />

      </section>

      {/* YELLOW BAND */}
      <section data-band-yellow className="relative overflow-hidden px-6 py-32 md:px-16 md:py-40" style={{ background: "var(--mustard)", color: "#000" }}>
        <h2 style={{ fontWeight: 700, fontSize: "clamp(2rem, 6vw, 5.5rem)", lineHeight: .95, letterSpacing: "-.03em", maxWidth: 1200 }} className="mx-auto">
          <span className="word inline-block">SOZINHAS,</span>{" "}
          <span className="word inline-block" style={{ color: "#fff" }}>ELAS</span>{" "}
          <span className="word inline-block">TÊM</span>{" "}
          <span className="word inline-block" style={{ color: "#fff" }}>VALOR.</span>
          <br />
          <span className="word inline-block" style={{ color: "#000" }}>JUNTAS,</span>{" "}
          <span className="word inline-block" style={{ color: "#fff", textShadow: "0 0 40px rgba(255,255,255,.4)" }}>ELAS</span>{" "}
          <span className="word inline-block">CRIAM</span>{" "}
          <span className="word inline-block" style={{ background: "#000", color: "var(--mustard)", padding: "0 .3em" }}>CRESCIMENTO.</span>
        </h2>
      </section>

      {/* BLACK BAND — ARQUITETOS */}
      <section className="relative px-6 py-32 md:px-16 md:py-40" style={{ background: "#000" }}>
        <div className="mx-auto max-w-5xl">
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 6.5rem)", lineHeight: .95, letterSpacing: "-.03em" }}>
            <span style={{ color: "#fff" }}>Não somos uma agência.</span>
            <br />
            <span style={{ color: "var(--mustard)" }}>Somos arquitetos de crescimento.</span>
          </h2>
          <p data-reveal className="mt-10 max-w-3xl" style={{ fontSize: 20, lineHeight: 1.5, color: "#8a8a8a", fontWeight: 300 }}>
            Enquanto outras empresas executam campanhas isoladas, nós projetamos sistemas onde cada ação fortalece a próxima.
          </p>
        </div>
      </section>

      {/* FASE 02 — MÉTODO */}
      <section id="metodo" data-method className="relative overflow-hidden px-6 py-32 md:px-16 md:py-40" style={{ background: "#0a0a0a" }}>
        <img src={methodFalling} alt="" aria-hidden width={1920} height={1088} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: .18 }} />
        <div className="relative">
          <div className="mb-20 max-w-6xl">
            <div className="mb-6 flex items-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "var(--mustard)" }} data-reveal>
              <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
              FASE 02 — O MÉTODO
            </div>
            <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2.2rem, 5.5vw, 5rem)", lineHeight: .95, letterSpacing: "-.03em" }}>
              Não basta entrar no jogo.
              <br />
              <span style={{ color: "var(--mustard)" }}>É preciso saber mover as peças.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-2xl" style={{ fontSize: 18, color: "#a0a0a0", fontWeight: 300 }}>
              Porque toda grande vitória começa antes do primeiro movimento.
            </p>
          </div>

          {/* TETRIZ letters */}
          <div className="mx-auto flex flex-wrap justify-center gap-2 md:gap-6" style={{ maxWidth: 1400 }}>
            {METHOD.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenMethod(m)}
                className="method-letter group relative flex-1 border p-4 text-left md:p-8"
                style={{
                  minWidth: 140,
                  borderColor: i % 2 === 0 ? "var(--mustard)" : "#1a1a1a",
                  background: i % 2 === 0 ? "transparent" : "#000",
                }}
              >
                <div data-fall-letter style={{ fontWeight: 700, fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 1, color: i % 2 === 0 ? "var(--mustard)" : "#fff", letterSpacing: "-.05em" }}>
                  {m.letter}
                </div>
                <div className="mt-4" style={{ fontWeight: 600, fontSize: 18, color: "#fff" }}>{m.title}</div>
                <div className="mt-1" style={{ fontSize: 13, color: "#8a8a8a" }}>{m.tag}</div>
                <div className="mt-4 inline-flex items-center gap-1" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--mustard)", fontWeight: 600 }}>
                  ABRIR →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — ONDE ENTRAMOS */}
      <section id="arena" className="relative px-6 py-32 md:px-16 md:py-40" style={{ background: "#fff", color: "#000" }}>
        <div className="mb-16 max-w-6xl">
          <div className="mb-6 flex items-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "#000" }} data-reveal>
            <span style={{ width: 40, height: 1, background: "#000" }} />
            ONDE ENTRAMOS NO SEU JOGO
          </div>
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: .95, letterSpacing: "-.03em" }}>
            Quatro formas de <span style={{ background: "var(--mustard)", padding: "0 .2em" }}>mover as peças</span>.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, idx) => (
            <article key={s.id} className="service-card grain relative overflow-hidden" style={{ background: "#000", color: "#fff", minHeight: 520 }} data-reveal>
              <div data-service-card className="relative h-64 w-full overflow-hidden">
                {/* Frame stack: primary + 3 tinted duplicates to simulate cinematic sequence */}
                <img data-svc-frame src={s.image} alt={s.title} width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <img data-svc-frame src={s.image} alt="" aria-hidden width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0, filter: "hue-rotate(-15deg) saturate(1.2) brightness(1.05)" }} />
                <img data-svc-frame src={s.image} alt="" aria-hidden width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0, transform: "scale(1.08)", filter: "contrast(1.1)" }} />
                <img data-svc-frame src={s.image} alt="" aria-hidden width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0, filter: "sepia(.3) saturate(1.4)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, transparent 60%)" }} />
                <div className="absolute left-6 top-6 rounded-full border px-3 py-1" style={{ borderColor: "var(--mustard)", color: "var(--mustard)", fontSize: 11, letterSpacing: ".2em", fontWeight: 600 }}>
                  0{idx + 1}
                </div>
              </div>
              <div className="p-8">
                <h3 className="service-title" style={{ fontWeight: 700, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1, letterSpacing: "-.02em", transition: "color .3s" }}>{s.title}</h3>
                <p className="mt-3" style={{ color: "var(--mustard)", fontSize: 15, fontWeight: 500 }}>{s.sub}</p>
                <p className="mt-4" style={{ color: "#a0a0a0", fontSize: 14, lineHeight: 1.6 }}>{s.body[0]}</p>
                <details className="mt-4">
                  <summary style={{ cursor: "pointer", color: "var(--mustard)", fontSize: 12, letterSpacing: ".2em", fontWeight: 600, listStyle: "none" }}>
                    LER MAIS +
                  </summary>
                  <div className="mt-4 space-y-3" style={{ color: "#a0a0a0", fontSize: 14, lineHeight: 1.6 }}>
                    {s.body.slice(1).map((p, i) => <p key={i}>{p}</p>)}
                    <div className="pt-3" style={{ borderTop: "1px solid #1a1a1a", color: "#666" }}>
                      <div style={{ color: "#fff", fontSize: 12, letterSpacing: ".15em", fontWeight: 600, marginBottom: 8 }}>PEÇAS QUE PODEM APARECER</div>
                      {s.pieces}
                    </div>
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TROFEUS / JOGADORES / TIMES — content anchors (real content only) */}
      <section id="trofeus" className="relative px-6 py-24 md:px-16" style={{ background: "#0a0a0a" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "var(--mustard)" }} data-reveal>
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
            TROFÉUS · JOGADORES · TIMES
          </div>
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, letterSpacing: "-.03em" }}>
            Marcas em movimento, times em jogo.
          </h2>
          <p data-reveal className="mt-6 max-w-2xl" style={{ color: "#8a8a8a", fontSize: 17, lineHeight: 1.6, fontWeight: 300 }}>
            Cada projeto é uma partida. Cada partida, uma marca que sai mais forte do que entrou. Os troféus, os jogadores e os times da Tetriz aparecem aqui à medida que cada nova temporada acontece.
          </p>
          <a href="#agendar" id="jogadores" className="mt-10 inline-flex items-center gap-2 text-white" style={{ fontSize: 13, letterSpacing: ".2em", fontWeight: 600, borderBottom: "1px solid var(--mustard)", paddingBottom: 4 }}>
            FALE COM O TIME →
          </a>
          <span id="times" />
        </div>
      </section>

      {/* WHITE BAND — Quer jogar */}
      <section className="relative px-6 py-32 md:px-16 md:py-40" style={{ background: "#fff", color: "#000" }}>
        <div className="mx-auto max-w-5xl">
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: .9, letterSpacing: "-.04em" }}>
            Quer jogar o nosso jogo?
          </h2>
          <p data-reveal className="mt-8" style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontWeight: 500, color: "#000", lineHeight: 1.2, letterSpacing: "-.02em" }}>
            Toda grande vitória começa com o primeiro movimento.
          </p>
          <p data-reveal className="mt-4" style={{ fontSize: 16, color: "#666", fontWeight: 300 }}>
            Você não precisa de mais uma agência. Precisa de um plano.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-6 py-24 md:px-16 md:py-32" style={{ background: "#000" }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "var(--mustard)" }} data-reveal>
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
            PERGUNTAS FREQUENTES
          </div>
          <h2 data-reveal className="mb-12" style={{ fontWeight: 700, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-.03em" }}>
            Antes do primeiro movimento.
          </h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <details key={i} className="faq-item border-b" style={{ borderColor: "#1a1a1a" }} data-reveal>
                <summary className="flex items-center justify-between gap-4 py-6" style={{ fontSize: 18, fontWeight: 500 }}>
                  <span>{item.q}</span>
                  <span className="faq-icon" style={{ color: "var(--mustard)", fontSize: 24, lineHeight: 1 }}>+</span>
                </summary>
                <p className="pb-6" style={{ color: "#a0a0a0", fontSize: 16, lineHeight: 1.6, fontWeight: 300 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="agendar" className="relative overflow-hidden px-6 py-32 md:px-16 md:py-40" style={{ background: "#000" }}>
        <img src={ctaFinal} alt="" aria-hidden width={1920} height={1088} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: .35 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000 0%, transparent 30%, transparent 70%, #000 100%)" }} />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "var(--mustard)" }} data-reveal>
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
            AGENDAR
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
          </div>
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: .95, letterSpacing: "-.04em" }}>
            Encaixe a próxima peça.
          </h2>
          <p data-reveal className="mx-auto mt-8 max-w-2xl" style={{ color: "#a0a0a0", fontSize: 18, lineHeight: 1.6, fontWeight: 300 }}>
            Vamos conversar sobre onde sua marca está, para onde ela pode ir e quais movimentos fazem sentido agora.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4" data-reveal>
            <a
              href="https://wa.me/5519987046803?text=Ol%C3%A1%2C%20quero%20conhecer%20o%20jogo%20da%20Tetriz."
              target="_blank"
              rel="noreferrer"
              className="whatsapp-cta inline-flex items-center gap-3 rounded-full px-10 py-5 font-semibold"
              style={{ background: "var(--mustard)", color: "#000", fontSize: 15, letterSpacing: ".1em" }}
            >
              CHAMAR NO WHATSAPP →
            </a>
            <a
              href="mailto:contato@tetrizdigital.com.br"
              className="whatsapp-cta inline-flex items-center gap-3 rounded-full border px-10 py-5 font-semibold"
              style={{ borderColor: "#333", color: "#fff", fontSize: 15, letterSpacing: ".1em" }}
            >
              ENVIAR E-MAIL
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8" style={{ fontSize: 13, color: "#666" }}>
            <span>(19) 98704-6803</span>
            <span style={{ width: 4, height: 4, background: "#333", borderRadius: 999 }} />
            <span>contato@tetrizdigital.com.br</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 py-16 md:px-16" style={{ background: "#000", borderTop: "1px solid #1a1a1a" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-.02em" }}>
            TETRIZ<span style={{ color: "var(--mustard)" }}>.</span>
          </div>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: ".05em" }}>
            © {new Date().getFullYear()} Tetriz Digital · Marketing, Branding & Performance
          </div>
        </div>
      </footer>




      {/* METHOD MODAL */}
      {openMethod && (
        <div className="modal-back fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)" }} onClick={() => setOpenMethod(null)}>
          <div className="modal-body relative w-full max-w-2xl overflow-hidden" style={{ background: "#0a0a0a", color: "#fff", border: "1px solid var(--mustard)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenMethod(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--mustard)", color: "#000", fontSize: 20, fontWeight: 700 }} aria-label="Fechar">×</button>
            <div className="p-10 md:p-14">
              <div className="flex items-center gap-6">
                <div style={{ fontWeight: 700, fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--mustard)", lineHeight: 1, letterSpacing: "-.05em" }}>{openMethod.letter}</div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--mustard)", fontWeight: 600 }}>MÉTODO</div>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1, letterSpacing: "-.03em" }}>{openMethod.title}</h3>
                </div>
              </div>
              <p className="mt-8" style={{ fontSize: 18, color: "var(--mustard)", fontWeight: 500 }}>{openMethod.tag}</p>
              <p className="mt-4" style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 300, color: "#c0c0c0" }}>{openMethod.popup}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/5519987046803?text=Ol%C3%A1%2C%20quero%20conhecer%20o%20jogo%20da%20Tetriz."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{ background: "var(--mustard)", color: "#000", boxShadow: "0 10px 30px -5px rgba(255,187,0,.5)" }}
        aria-label="WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.94 7.94 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 5.54-13.58ZM12.06 18.5h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 1 1 5.59 3.09Zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.63-.62.76-.11.13-.23.15-.43.05-.2-.1-.83-.31-1.59-.98-.59-.53-.98-1.17-1.1-1.37-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34l-.38-.01c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66 0 .98.72 1.93.82 2.06.1.13 1.42 2.17 3.44 3.05.48.2.86.33 1.15.42.48.15.92.13 1.27.08.39-.06 1.17-.48 1.33-.94.17-.46.17-.86.11-.94-.05-.08-.18-.13-.38-.23Z"/></svg>
      </a>
    </div>
  );
}
