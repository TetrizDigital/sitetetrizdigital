import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CinematicShell from "@/components/CinematicShell";
import Preloader from "@/components/Preloader";


import heroBlocks from "@/assets/hero-blocks.jpg";
import heroManifesto from "@/assets/hero-video-final.mp4.asset.json";
import tetrisField from "@/assets/tetris-field.jpg";
import methodFalling from "@/assets/method-falling.jpg";
import serviceCampaign from "@/assets/service-campaign.jpg";
import serviceProject from "@/assets/service-project.jpg";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceOperation from "@/assets/service-operation.jpg";
import ctaFinal from "@/assets/cta-final.jpg";
import tetrizBoardImg from "@/assets/tetriz-board-clean.webp";

const SITE_URL = "https://sitetetrizdigital.lovable.app";

const FAQ_ENTRIES = [
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
      { property: "og:url", content: SITE_URL + "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tetriz Digital" },
      {
        name: "twitter:description",
        content: "Arquitetos de crescimento. Marketing, Branding e Performance.",
      },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Tetriz Digital",
          url: SITE_URL,
          email: "contato@tetrizdigital.com.br",
          telephone: "+5519987046803",
          description:
            "Arquitetos de crescimento: marketing, branding e performance encaixados peça por peça.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ENTRIES.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
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

type Trophy = {
  id: string;
  name: string;
  client: string;
  category: string;
  image: string;
  summary: string;
  results: string[];
};

const TROPHIES: Trophy[] = [
  {
    id: "reposiciona-varejo",
    name: "Reposiciona Varejo",
    client: "Marca de moda regional",
    category: "Rebranding + Performance",
    image: serviceProject,
    summary:
      "Reposicionamento completo de uma rede regional de moda: nova identidade, nova voz e um motor de performance que transformou o digital em vitrine de venda.",
    results: [
      "+ 148% em receita orgânica no digital",
      "Nova identidade aplicada em 24 lojas físicas",
      "Recall de marca 3x maior em 6 meses",
    ],
  },
  {
    id: "lancamento-x",
    name: "Lançamento X",
    client: "Startup SaaS B2B",
    category: "Campanha de Lançamento",
    image: serviceCampaign,
    summary:
      "Um lançamento pensado como partida: conceito, key visual, tráfego e narrativa de comunidade em uma janela curta para consolidar a marca no mercado.",
    results: [
      "1.200 leads qualificados em 30 dias",
      "CAC 42% abaixo do benchmark do setor",
      "Cobertura em 6 veículos de tecnologia",
    ],
  },
  {
    id: "performance-360",
    name: "Performance 360",
    client: "E-commerce nacional",
    category: "Mídia + CRO",
    image: heroBlocks,
    summary:
      "Uma operação recorrente de performance ancorada em dados: mídia, criativos, landing pages e CRO trabalhando como um único tabuleiro.",
    results: [
      "ROAS médio de 6.8x sustentado por 9 meses",
      "+ 73% em conversão de checkout após CRO",
      "Redução de 31% no custo por aquisição",
    ],
  },
  {
    id: "rebrand-norte",
    name: "Rebrand Norte",
    client: "Rede alimentícia",
    category: "Identidade + Naming",
    image: serviceConsulting,
    summary:
      "Naming, identidade visual e reposicionamento estratégico para uma rede em expansão no Norte do país. Da essência à aplicação em 40+ pontos de contato.",
    results: [
      "Nova marca aplicada em 12 unidades",
      "NPS de percepção +38 pontos pós-lançamento",
      "Sistema visual documentado em brand book completo",
    ],
  },
  {
    id: "campanha-verao",
    name: "Campanha Verão",
    client: "Brand D2C",
    category: "Sazonal Multiplataforma",
    image: methodFalling,
    summary:
      "Campanha sazonal completa com conceito criativo, produção de conteúdo, mídia e ativação — cada peça encaixada para transformar a estação em vendas.",
    results: [
      "+ 210% em vendas na janela da campanha",
      "18M de impressões em mídia paga",
      "Engajamento orgânico 4x acima da média",
    ],
  },
  {
    id: "impacto-social",
    name: "Impacto Social",
    client: "ONG parceira",
    category: "Branding + Ativação",
    image: ctaFinal,
    summary:
      "Uma marca com propósito precisava de uma voz à altura. Construímos posicionamento, identidade e campanha de ativação para engajar doadores e voluntários.",
    results: [
      "+ 320% em novos doadores mensais",
      "Programa de voluntariado com 900 inscritos",
      "Cobertura espontânea em imprensa nacional",
    ],
  },
  {
    id: "ecommerce-up",
    name: "E-commerce Up",
    client: "Marketplace B2B",
    category: "Site + Performance",
    image: serviceOperation,
    summary:
      "Novo site, nova jornada, nova operação de mídia. Um projeto que uniu tecnologia, UX e performance para destravar a próxima fase do negócio.",
    results: [
      "Tempo de carregamento reduzido em 62%",
      "Taxa de conversão dobrada em 90 dias",
      "Ticket médio +27% após novo checkout",
    ],
  },
  {
    id: "institucional",
    name: "Institucional",
    client: "Indústria familiar",
    category: "Vídeo + Site Institucional",
    image: tetrisField,
    summary:
      "Uma indústria com 40 anos de história ganhou uma nova narrativa institucional: vídeo, site e materiais comerciais alinhados a um posicionamento único.",
    results: [
      "Novo site institucional em 3 idiomas",
      "Vídeo manifesto com 480k visualizações",
      "Kit comercial usado em 6 feiras internacionais",
    ],
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

// Overrides for the label centering when the piece is L/T shaped
const PIECE_LABEL_ZONE: Record<string, Zone> = {
  tecnologia: { left: 25, top: 50, width: 58.33, height: 50 },
  marca:      { left: 25, top: 0,  width: 41.67, height: 50 },
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

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  zIndex?: number;
};

function Modal({ open, onClose, children, className = "", bodyClassName = "", zIndex = 100 }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 750);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 flex items-center justify-center ${className}`}
      style={{
        zIndex,
        background: "rgba(0,0,0,.88)",
        backdropFilter: "blur(10px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 420ms cubic-bezier(.2,.9,.25,1)",
        clipPath: visible
          ? "circle(150% at 50% 50%)"
          : "circle(0% at 50% 50%)",
        WebkitClipPath: visible
          ? "circle(150% at 50% 50%)"
          : "circle(0% at 50% 50%)",
        transitionProperty: "opacity, clip-path, -webkit-clip-path",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(.77,0,.18,1)",
      }}
      onClick={onClose}
    >
      <div
        className={`relative ${bodyClassName}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(.96) translateY(14px)",
          transition:
            "opacity 420ms cubic-bezier(.2,.9,.25,1) 180ms, transform 520ms cubic-bezier(.2,.9,.25,1) 180ms",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function TetrisBoard({ pieces }: { pieces: Piece[] }) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const progressRef = useRef<Record<string, number>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [pieceModalOpen, setPieceModalOpen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const init: Record<string, number> = {};
    pieces.forEach((p) => (init[p.id] = 0));
    progressRef.current = { ...init };
    targetRef.current = { ...init };
    setProgress(init);
  }, [pieces]);

  // Smooth interpolation loop — very fluid inertia
  useEffect(() => {
    const LERP = 0.055;
    const tick = () => {
      let changed = false;
      const next = { ...progressRef.current };
      for (const k of Object.keys(next)) {
        const t = targetRef.current[k] ?? 0;
        const cur = next[k] ?? 0;
        const nv = cur + (t - cur) * LERP;
        if (Math.abs(nv - cur) > 0.0002) {
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

  // Wheel handler: scroll while hovering a piece fades popup in / out
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const STEP = 1 / 1100; // long, controlled travel for a cinematic feel
    const onWheel = (e: WheelEvent) => {
      const id = hoverIdRef.current;
      if (!id) return;
      if (Math.abs(e.deltaY) < 0.5) return;
      const t = targetRef.current[id] ?? 0;
      // Release the scroll back to the page once the popup is fully in (down) or fully out (up)
      if (e.deltaY > 0 && t >= 0.999) return;
      if (e.deltaY < 0 && t <= 0.001) return;
      const nt = Math.max(0, Math.min(1, t + e.deltaY * STEP));
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      targetRef.current = {
        ...Object.fromEntries(Object.keys(targetRef.current).map((k) => [k, 0])),
        [id]: nt,
      };
    };
    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => el.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  const setHover = (id: string | null) => {
    hoverIdRef.current = id;
    // On leaving a piece, gently fade all targets back to 0
    if (id === null) {
      const t = { ...targetRef.current };
      for (const k of Object.keys(t)) t[k] = 0;
      targetRef.current = t;
    }
  };

  const openPiece = (id: string) => {
    setOpenId(id);
    requestAnimationFrame(() => setPieceModalOpen(true));
  };

  const closePiece = () => {
    setPieceModalOpen(false);
    window.setTimeout(() => {
      setOpenId(null);
      const t = { ...targetRef.current };
      for (const k of Object.keys(t)) t[k] = 0;
      targetRef.current = t;
    }, 350);
  };

  const activeId = Object.entries(progress).sort((a, b) => b[1] - a[1])[0]?.[0];
  const activeProgressRaw = activeId ? progress[activeId] ?? 0 : 0;
  const activeProgress = easeOut(activeProgressRaw);
  const activePiece = pieces.find((piece) => piece.id === activeId);
  const selectedPiece = pieces.find((piece) => piece.id === openId);

  return (
    <div className="w-full" data-reveal>
      <div
        ref={boardRef}
        className="relative w-full"
        style={{ perspective: 1600 }}
        onMouseLeave={() => setHover(null)}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: "1600 / 720", transformStyle: "preserve-3d" }}
        >
          <img
            src={tetrizBoardImg}
            alt="Tabuleiro Tetriz — Produto, Marca, Pessoas, Marketing, Tecnologia e Dados"
            width={1600}
            height={720}
            loading="lazy"
            draggable={false}
            className="block h-full w-full select-none"
          />

          {/* Hit zones + labels + per-piece glow */}
          {pieces.map((p) => {
            const zones = PIECE_ZONES[p.id] ?? [];
            const prog = easeOut(progress[p.id] ?? 0);
            const accent = PIECE_ACCENT[p.id] ?? "#FFBB00";
            const isActive = activeId === p.id && prog > 0.01;
            const mainZone = zones[0];
            const labelZone = PIECE_LABEL_ZONE[p.id] ?? mainZone;
            const labelColor = p.id === "produto" || p.id === "tecnologia" ? "#fff" : "#0a0a0a";
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
                    onClick={() => openPiece(p.id)}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      openPiece(p.id);
                    }}
                    className="pointer-events-auto absolute cursor-pointer"
                    style={{
                      left: `${z.left}%`,
                      top: `${z.top}%`,
                      width: `${z.width}%`,
                      height: `${z.height}%`,
                      boxShadow: "none",
                    }}
                  />
                ))}
                {/* Label rendered with site font (Space Grotesk) */}
                {labelZone ? (
                  <div
                    className="pointer-events-none absolute flex items-center justify-center"
                    style={{
                      left: `${labelZone.left}%`,
                      top: `${labelZone.top}%`,
                      width: `${labelZone.width}%`,
                      height: `${labelZone.height}%`,
                      color: labelColor,
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(20px, 2.2vw, 40px)",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      textAlign: "center",
                      opacity: activeId && activeId !== p.id ? 0.35 : 1,
                      transition: "opacity .5s ease",
                    }}
                  >
                    {p.title}
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Scroll-driven popup — fades in as you scroll, fades out on reverse */}
          {activePiece ? (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 w-[min(92%,640px)]"
              style={{
                transform: "translate(-50%, -50%)",
                opacity: activeProgress,
                zIndex: 80,
                transition: "opacity .35s cubic-bezier(.22,.9,.28,1)",
                willChange: "opacity",
              }}
            >
              <div
                style={{
                  background: "rgba(5,5,5,.94)",
                  border: "none",
                  boxShadow: "0 30px 90px -25px rgba(0,0,0,.9)",
                  color: "#fff",
                  padding: "clamp(20px, 3vw, 34px)",
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
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
      <Modal open={pieceModalOpen} onClose={closePiece} bodyClassName="w-full max-w-2xl overflow-hidden" zIndex={90}>
        {selectedPiece ? (
          <div
            style={{
              background: "#050505",
              border: "none",
              boxShadow: "0 36px 100px -25px rgba(0,0,0,.95)",
              color: "#fff",
            }}
          >
            <button
              type="button"
              aria-label="Fechar peça"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "var(--mustard)", color: "#000", fontSize: 20, fontWeight: 700 }}
              onClick={closePiece}
            >
              ×
            </button>
            <div className="p-7 md:p-10">
              <div style={{ color: "var(--mustard)", fontSize: 11, fontWeight: 700, letterSpacing: ".28em" }}>
                VER PEÇA
              </div>
              <h3 className="mt-3 pr-12" style={{ fontSize: "clamp(2.25rem, 6vw, 4.75rem)", fontWeight: 700, lineHeight: .9 }}>
                {selectedPiece.title}
              </h3>
              <p className="mt-4" style={{ color: "var(--mustard)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 600 }}>
                {selectedPiece.sub}
              </p>
              <p className="mt-6" style={{ color: "#dedede", fontSize: "clamp(15px, 1.25vw, 18px)", lineHeight: 1.7 }}>
                {selectedPiece.popup}
              </p>
            </div>
          </div>
        ) : null}
      </Modal>

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
  const [methodModalOpen, setMethodModalOpen] = useState(false);
  const [heroWordIdx, setHeroWordIdx] = useState(0);
  const [openTrophyId, setOpenTrophyId] = useState<string | null>(null);
  const [trophyModalOpen, setTrophyModalOpen] = useState(false);

  const openMethodModal = (m: (typeof METHOD)[number]) => {
    setOpenMethod(m);
    requestAnimationFrame(() => setMethodModalOpen(true));
  };
  const closeMethodModal = () => {
    setMethodModalOpen(false);
    window.setTimeout(() => setOpenMethod(null), 350);
  };

  const openTrophy = (id: string) => {
    setOpenTrophyId(id);
    requestAnimationFrame(() => setTrophyModalOpen(true));
  };
  const closeTrophy = () => {
    setTrophyModalOpen(false);
    window.setTimeout(() => setOpenTrophyId(null), 350);
  };

  // Trophy modal: ESC to close + lock body scroll
  useEffect(() => {
    if (!openTrophyId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTrophy();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openTrophyId]);

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
      // Fade-up on any [data-reveal] — reversible on scroll up
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: reduce ? 0 : 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });

      // Hero video: autoplay muted loop
      const heroVideo = document.querySelector<HTMLVideoElement>("[data-hero-img]");
      if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        heroVideo.loop = true;
        heroVideo.autoplay = true;
        heroVideo.preload = "auto";

        const tryPlay = () => {
          if (heroVideo.paused) heroVideo.play().catch(() => {});
        };
        tryPlay();
        const playInterval = window.setInterval(tryPlay, 500);
        heroVideo.addEventListener("playing", () => window.clearInterval(playInterval), { once: true });
        heroVideo.addEventListener("loadeddata", tryPlay, { once: true });

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

      // TETRIZ letters falling — reversible
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
            scrollTrigger: {
              trigger: "[data-method]",
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
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

      // Big yellow band — split highlight — reversible
      gsap.fromTo(
        "[data-band-yellow] .word",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduce ? 0 : 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-band-yellow]",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
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

        // 3) Auto-reveal every section heading + paragraph with stagger — reversible
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
              scrollTrigger: {
                trigger: sec,
                start: "top 82%",
                end: "bottom 18%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // 4) Scale-in for cards / images tagged [data-scale-in] — reversible
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
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "bottom 12%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // 5) Nav shrinks after scrolling past hero
        ScrollTrigger.create({
          trigger: "[data-hero]",
          start: "bottom top+=80",
          onEnter: () => document.querySelector(".nav")?.classList.add("nav-scrolled"),
          onLeaveBack: () => document.querySelector(".nav")?.classList.remove("nav-scrolled"),
        });

        // 6) Word-split reveal — h2 with [data-word-split]
        gsap.utils.toArray<HTMLElement>("[data-word-split]").forEach((el) => {
          if (el.dataset.split === "1") return;
          el.dataset.split = "1";
          const walk = (node: Node) => {
            const children = Array.from(node.childNodes);
            children.forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE && child.textContent) {
                const frag = document.createDocumentFragment();
                const parts = child.textContent.split(/(\s+)/);
                parts.forEach((part) => {
                  if (/^\s+$/.test(part)) {
                    frag.appendChild(document.createTextNode(part));
                  } else if (part.length) {
                    const span = document.createElement("span");
                    span.className = "ws-word";
                    span.style.display = "inline-block";
                    span.style.willChange = "transform, opacity, filter";
                    span.textContent = part;
                    frag.appendChild(span);
                  }
                });
                child.parentNode?.replaceChild(frag, child);
              } else if (child.nodeType === Node.ELEMENT_NODE) {
                walk(child);
              }
            });
          };
          walk(el);
          const words = el.querySelectorAll<HTMLElement>(".ws-word");
          gsap.fromTo(
            words,
            { yPercent: 110, opacity: 0, filter: "blur(10px)" },
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              stagger: 0.06,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // 7) Clip-reveal wipe for [data-clip-reveal] — reversible
        gsap.utils.toArray<HTMLElement>("[data-clip-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // 8) Cascade — grid children reveal in waves — reversible
        const cascadeSelectors = [".trophy-card", ".player-card", ".arena-cell", ".logo-cell"];
        cascadeSelectors.forEach((sel) => {
          const nodes = gsap.utils.toArray<HTMLElement>(sel);
          if (!nodes.length) return;
          gsap.fromTo(
            nodes,
            { y: 60, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: { each: 0.07, from: "start" },
              scrollTrigger: {
                trigger: nodes[0].parentElement || nodes[0],
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // 9) 3D tilt on cards with [data-tilt]
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          el.style.transformStyle = "preserve-3d";
          el.style.perspective = "1000px";
          const qX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
          const qY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            qY(px * 6);
            qX(-py * 6);
          };
          const onLeave = () => {
            qX(0);
            qY(0);
          };
          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
        });

        // 10) Count-up on [data-count-up] — replays every time it enters
        gsap.utils.toArray<HTMLElement>("[data-count-up]").forEach((el) => {
          const target = Number(el.dataset.value || "0");
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const counter = { v: 0 };
          const tween = gsap.to(counter, {
            v: target,
            duration: 2,
            ease: "power2.out",
            paused: true,
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
            },
          });
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            end: "bottom 12%",
            onEnter: () => {
              counter.v = 0;
              tween.restart();
            },
            onEnterBack: () => {
              counter.v = 0;
              tween.restart();
            },
            onLeave: () => {
              counter.v = 0;
              el.textContent = `${prefix}0${suffix}`;
            },
            onLeaveBack: () => {
              counter.v = 0;
              el.textContent = `${prefix}0${suffix}`;
            },
          });
        });

        // 11) Section divider — thin mustard sweep — reversible
        gsap.utils.toArray<HTMLElement>("section").forEach((sec, i) => {
          if (i === 0 || sec.hasAttribute("data-hero")) return;
          const line = document.createElement("div");
          line.setAttribute("aria-hidden", "true");
          line.style.cssText =
            "position:absolute;top:0;left:0;height:1px;width:0;background:var(--mustard);pointer-events:none;opacity:.7;z-index:5;";
          if (getComputedStyle(sec).position === "static") sec.style.position = "relative";
          sec.appendChild(line);
          gsap.fromTo(
            line,
            { width: "0%" },
            {
              width: "100%",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // 12) Dolly-in scrub — Fase 01 tabuleiro (zoom cinematográfico atrelado ao scroll)
        gsap.utils.toArray<HTMLElement>("[data-dolly]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.94, filter: "blur(2px) brightness(.9)" },
            {
              scale: 1,
              filter: "blur(0px) brightness(1)",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "top 55%",
                scrub: 0.6,
              },
            },
          );
        });

        // 13) Duotone → cor real — Jogadores (revela colaboradores conforme scroll)
        gsap.utils.toArray<HTMLElement>("[data-duotone]").forEach((el) => {
          const state = { g: 1 };
          gsap.to(state, {
            g: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1.4,
              onUpdate: (self) => {
                const g = 1 - self.progress;
                // Efeito bem sutil: só um leve grayscale que some no scroll,
                // sem sepia/hue-rotate que sujam o amarelo mostarda.
                el.style.filter = `grayscale(${g * 0.35}) contrast(${1 + 0.04 * g})`;
                el.style.setProperty("--rgb-split", `${self.progress * 1}px`);
              },
            },
          });
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
      <Preloader />
      <CinematicShell />

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

            {/* Bottom fade — smooth blend into the next section */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-64 z-[5]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 55%, #000 100%)",
              }}
            />
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
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center"
        style={{ background: "#000", color: "#fff" }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
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
            data-word-split
            className="mx-auto flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center md:gap-x-6"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.35rem, 4.2vw, 4.65rem)",
              lineHeight: 0.95,
              letterSpacing: "0",
              maxWidth: "calc(100vw - 48px)",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>MARKETING</span>
            <span style={{ color: "var(--mustard)", lineHeight: 1 }}>·</span>
            <span style={{ whiteSpace: "nowrap" }}>BRANDING</span>
            <span style={{ color: "var(--mustard)", lineHeight: 1 }}>·</span>
            <span style={{ whiteSpace: "nowrap" }}>PERFORMANCE</span>
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
      <section id="jogo" className="relative py-32 md:py-40" style={{ background: "#fff", color: "#000" }}>
        <div className="mb-20 mx-auto max-w-6xl px-6 md:px-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3" style={{ fontSize: 12, letterSpacing: ".4em", color: "#FFBB00" }} data-reveal>
            <span style={{ width: 40, height: 1, background: "#FFBB00" }} />
            FASE 01 — O JOGO
            <span style={{ width: 40, height: 1, background: "#FFBB00" }} />
          </div>
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: .95, letterSpacing: "-.03em" }}>
            Toda empresa possui peças.
          </h2>
          <p data-reveal style={{ fontWeight: 500, fontSize: "clamp(1.25rem, 2.5vw, 2.2rem)", marginTop: 16, color: "#666", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Poucas sabem como encaixá-las.
          </p>
        </div>

        {/* Tetris Board — edge-to-edge, real piece layout, fluid scroll popup */}
        <div data-dolly style={{ transformOrigin: "50% 50%", willChange: "transform, filter" }}>
          <TetrisBoard pieces={PIECES} />
        </div>

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
                onClick={() => openMethodModal(m)}
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
      <section id="onde-entramos" className="relative px-6 py-32 md:px-16 md:py-40" style={{ background: "#fff", color: "#000" }}>
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
            <article key={s.id} className="service-card grain relative overflow-hidden" style={{ background: "#000", color: "#fff", minHeight: 520 }} data-reveal data-tilt>
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

      {/* 03 — TROFÉUS */}
      <section id="trofeus" className="relative overflow-hidden" style={{ background: "#0a0a0a", color: "#fff" }}>
        <div className="px-6 pt-28 pb-16 md:px-16 md:pt-40 md:pb-24 text-center">
          <div
            data-reveal
            className="mb-8 inline-flex items-center gap-3"
            style={{ color: "var(--mustard)", fontSize: 12, letterSpacing: ".4em" }}
          >
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
            03 — TROFÉUS
            <span style={{ width: 40, height: 1, background: "var(--mustard)" }} />
          </div>
          <h2
            data-reveal
            className="mx-auto max-w-6xl"
            style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: .95, letterSpacing: "-.03em" }}
          >
            <span data-word-split style={{ color: "#fff", display: "block" }}>Não chamamos de cases.</span>
            <span data-clip-reveal style={{ color: "var(--mustard)", display: "block" }}>Chamamos de troféus.</span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-8 max-w-xl"
            style={{ color: "#8a8a8a", fontSize: 17, lineHeight: 1.6, fontWeight: 300 }}
          >
            Porque ganhamos o jogo. Passe o mouse e clique para ver a vitória.
          </p>
        </div>

        {/* Grid 2 x 4 (desktop) / 2 col (tablet) / 1 col (mobile) */}
        <div
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 1, background: "#1a1a1a" }}
        >
          {TROPHIES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => openTrophy(t.id)}
              data-tilt
              className="trophy-card group relative block w-full overflow-hidden text-left"
              style={{
                aspectRatio: "4 / 5",
                background: "#0a0a0a",
                cursor: "pointer",
                border: "none",
                padding: 0,
              }}
              aria-label={`Ver troféu ${t.name}`}
            >
              <img
                src={t.image}
                alt=""
                aria-hidden
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: 0.32,
                  filter: "grayscale(20%) contrast(1.05)",
                  transition: "opacity .5s ease, transform .8s cubic-bezier(.22,.9,.28,1), filter .5s ease",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,10,.15) 0%, rgba(10,10,10,.55) 55%, rgba(10,10,10,.92) 100%)",
                  transition: "opacity .5s ease",
                }}
              />
              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:p-8">
                <span
                  className="trophy-name"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 1.6vw, 24px)",
                    letterSpacing: ".02em",
                    color: "#fff",
                    opacity: 0.85,
                    transition: "opacity .4s ease, transform .5s cubic-bezier(.22,.9,.28,1)",
                  }}
                >
                  {t.name}
                </span>
                <span
                  className="trophy-cta inline-flex w-fit items-center gap-2"
                  style={{
                    background: "var(--mustard)",
                    color: "#000",
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: ".18em",
                    padding: "10px 16px",
                    opacity: 0,
                    transform: "translateY(8px)",
                    transition: "opacity .4s ease, transform .5s cubic-bezier(.22,.9,.28,1)",
                  }}
                >
                  VER TROFÉU →
                </span>
              </div>
            </button>
          ))}
        </div>



        <style>{`
          .trophy-card:hover img,
          .trophy-card:focus-visible img { opacity: .75 !important; transform: scale(1.04); }
          .trophy-card:hover .trophy-name,
          .trophy-card:focus-visible .trophy-name { opacity: 1; transform: translateY(-2px); }
          .trophy-card:hover .trophy-cta,
          .trophy-card:focus-visible .trophy-cta { opacity: 1; transform: translateY(0); }
          .trophy-card:focus-visible { outline: 2px solid var(--mustard); outline-offset: -2px; }
        `}</style>
      </section>

      {/* Trophy modal */}
      <Modal open={trophyModalOpen} onClose={closeTrophy} bodyClassName="w-full max-w-5xl overflow-hidden" zIndex={100}>
        {(() => {
          const trophy = openTrophyId ? TROPHIES.find((t) => t.id === openTrophyId) : null;
          if (!trophy) return null;
          return (
            <div
              aria-label={`Troféu ${trophy.name}`}
              className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden md:grid-cols-2"
              style={{
                background: "#0a0a0a",
                boxShadow: "0 40px 100px rgba(0,0,0,.6)",
                maxHeight: "88vh",
              }}
            >
              <div className="relative min-h-[240px] md:min-h-full" style={{ background: "#000" }}>
                <img
                  src={trophy.image}
                  alt={trophy.name}
                  className="h-full w-full object-cover"
                  style={{ opacity: 0.85 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.35) 100%)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-6 overflow-y-auto p-8 md:p-12">
                <div
                  className="inline-flex items-center gap-2"
                  style={{ color: "var(--mustard)", fontSize: 11, letterSpacing: ".35em", fontWeight: 600 }}
                >
                  <span style={{ width: 24, height: 1, background: "var(--mustard)" }} />
                  {trophy.category.toUpperCase()}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                    lineHeight: 1,
                    letterSpacing: "-.02em",
                    color: "#fff",
                  }}
                >
                  {trophy.name}
                </h3>
                <p style={{ color: "#8a8a8a", fontSize: 14, letterSpacing: ".05em", fontWeight: 400 }}>
                  {trophy.client}
                </p>
                <p style={{ color: "#c5c5c5", fontSize: 16, lineHeight: 1.65, fontWeight: 300 }}>
                  {trophy.summary}
                </p>
                <ul className="flex flex-col gap-3">
                  {trophy.results.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      style={{ color: "#fff", fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}
                    >
                      <span
                        aria-hidden
                        style={{
                          marginTop: 8,
                          width: 8,
                          height: 8,
                          background: "var(--mustard)",
                          flexShrink: 0,
                        }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="#agendar"
                    onClick={closeTrophy}
                    className="whatsapp-cta inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
                    style={{
                      background: "var(--mustard)",
                      color: "#000",
                      fontSize: 12,
                      letterSpacing: ".15em",
                    }}
                  >
                    FALAR SOBRE ESTE JOGO →
                  </a>
                  <button
                    type="button"
                    onClick={closeTrophy}
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold"
                    style={{
                      borderColor: "rgba(255,255,255,.25)",
                      color: "#fff",
                      fontSize: 12,
                      letterSpacing: ".15em",
                      background: "transparent",
                    }}
                  >
                    FECHAR
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={closeTrophy}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: "rgba(0,0,0,.6)",
                  color: "#fff",
                  fontSize: 20,
                  lineHeight: 1,
                  border: "1px solid rgba(255,255,255,.15)",
                }}
              >
                ×
              </button>
            </div>
          );
        })()}
      </Modal>

      {/* 04 — JOGADORES */}
      <section id="jogadores" data-duotone className="relative" style={{ background: "#fff", color: "#000", filter: "grayscale(0.35) contrast(1.04)", willChange: "filter" }}>
        <div className="px-6 py-24 md:px-16 md:py-32 text-center">
          <div
            data-reveal
            style={{ fontSize: 12, letterSpacing: ".4em", color: "#8a8a8a", fontWeight: 500 }}
          >
            04 — JOGADORES
          </div>
          <h2
            className="mx-auto mt-6"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-.035em",
              maxWidth: "18ch",
            }}
          >
            <span data-word-split style={{ display: "block" }}>Esquece equipe.</span>
            <span style={{ display: "block" }}>
              <span data-word-split style={{ display: "inline-block" }}>Todo mundo é&nbsp;</span>
              <span data-clip-reveal style={{ color: "var(--mustard)", display: "inline-block" }}>jogador.</span>
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6"
            style={{
              color: "#6a6a6a",
              fontSize: 17,
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: "34ch",
            }}
          >
            Mas existe uma formação. Cada um com uma função.
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ background: "#0f0f0f" }}
        >
          {[
            { name: "CAPITÃO", role: "Lidera o jogo" },
            { name: "ESTRATÉGIA", role: "Planeja as jogadas" },
            { name: "CRIATIVOS", role: "Imaginam as peças" },
            { name: "PERFORMANCE", role: "Aceleram o placar" },
            { name: "RELACIONAMENTO", role: "Mantém o time unido" },
            { name: "TECNOLOGIA", role: "Constroem o tabuleiro" },
            { name: "PRODUÇÃO", role: "Colocam em campo" },
            { name: "VOCÊ", role: "Entra para o time" },
          ].map((p, i, arr) => (
            <div
              key={p.name}
              data-tilt
              className="player-card group relative flex flex-col justify-end overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                background: "#0f0f0f",
                borderRight: i % 4 !== 3 ? "1px solid rgba(255,255,255,.06)" : "none",
                borderBottom: i < arr.length - 4 ? "1px solid rgba(255,255,255,.06)" : "none",
              }}
            >
              {/* Photo placeholder */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, #171717 0%, #0d0d0d 100%)",
                }}
              >
                <div
                  className="flex flex-col items-center gap-2"
                  style={{ color: "rgba(255,255,255,.12)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span style={{ fontSize: 10, letterSpacing: ".2em" }}>
                    {p.name.charAt(0) + p.name.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Yellow reveal on hover */}
              <div
                className="player-hover pointer-events-none absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-500"
                style={{
                  height: "40%",
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(255,187,0,.15) 100%)",
                }}
              />

              {/* Label */}
              <div className="relative z-10 p-5 md:p-6" style={{ color: "#fff" }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(15px, 1.2vw, 20px)",
                    letterSpacing: ".02em",
                  }}
                >
                  {p.name}
                </div>
                <div
                  className="mt-1"
                  style={{
                    color: "#8a8a8a",
                    fontSize: 12,
                    letterSpacing: ".05em",
                    fontWeight: 400,
                  }}
                >
                  {p.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .player-card:hover .player-hover { opacity: 1; }
        `}</style>
      </section>

      {/* 05 — ARENA */}
      <section id="arena" className="relative" style={{ background: "#000", color: "#fff" }}>
        <div className="px-6 py-24 md:px-16 md:py-32 text-center">
          <div
            data-reveal
            style={{ fontSize: 12, letterSpacing: ".4em", color: "var(--mustard)", fontWeight: 500 }}
          >
            05 — ARENA
          </div>
          <h2
            className="mx-auto mt-6"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-.035em",
              maxWidth: "20ch",
            }}
          >
            <span data-word-split style={{ display: "inline" }}>Grandes jogos exigem grandes arenas</span>
            <span data-clip-reveal style={{ color: "var(--mustard)", display: "inline-block" }}>.</span>
          </h2>
        </div>

        <div
          className="arena-bento grid gap-[1px] px-0"
          style={{
            background: "rgba(255,255,255,.06)",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "minmax(220px, 26vh)",
          }}
        >
          {[
            { name: "TETRIZ LAB", sub: "onde o método vira jogo", area: "1 / 1 / 3 / 4" },
            { name: "AUDITÓRIO", sub: "grandes jogadas", area: "1 / 4 / 2 / 7" },
            { name: "O REEL", sub: "▶ play", area: "2 / 4 / 3 / 7" },
            { name: "DRONE", sub: "visão de cima", area: "3 / 1 / 4 / 3" },
            { name: "MAKING OF", sub: "bastidores", area: "3 / 3 / 4 / 5" },
            { name: "DAILY", sub: "jogada a jogada", area: "3 / 5 / 4 / 7" },
          ].map((cell) => (
            <div
              key={cell.name}
              data-tilt
              className="arena-cell group relative flex flex-col justify-end overflow-hidden"
              style={{
                gridArea: cell.area,
                background: "#0d0d0d",
              }}
            >
              {/* Placeholder icon centered */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ color: "rgba(255,255,255,.1)" }}>
                <div className="flex flex-col items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span style={{ fontSize: 10, letterSpacing: ".2em" }}>
                    {cell.name.charAt(0) + cell.name.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Hover amber sheen */}
              <div
                className="arena-hover pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(255,187,0,.12) 100%)" }}
              />

              {/* Label */}
              <div className="relative z-10 p-6 md:p-8">
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(18px, 1.6vw, 28px)",
                    letterSpacing: ".01em",
                    color: "#fff",
                  }}
                >
                  {cell.name}
                </div>
                <div
                  className="mt-1"
                  style={{
                    color: "#8a8a8a",
                    fontSize: 13,
                    letterSpacing: ".04em",
                    fontWeight: 400,
                  }}
                >
                  {cell.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .arena-cell:hover .arena-hover { opacity: 1; }
          @media (max-width: 768px) {
            .arena-bento {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: minmax(180px, 22vh) !important;
            }
            .arena-cell { grid-area: auto !important; }
          }
        `}</style>
      </section>

      {/* 06 — TIMES */}
      <section id="times" className="relative">
        {/* Header on white */}
        <div className="px-6 py-24 md:px-16 md:py-32 text-center" style={{ background: "#fff", color: "#000" }}>
          <div
            data-reveal
            style={{ fontSize: 12, letterSpacing: ".4em", color: "#8a8a8a", fontWeight: 500 }}
          >
            06 — TIMES
          </div>
          <h2
            className="mx-auto mt-6"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-.035em",
              maxWidth: "22ch",
            }}
          >
            <span data-word-split style={{ display: "inline-block" }}>Eles entram para&nbsp;</span>
            <span data-clip-reveal style={{ color: "var(--mustard)", display: "inline-block" }}>jogar junto.</span>
          </h2>
        </div>

        {/* Logo grid — WHITE background */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
          style={{ background: "#fff" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              data-tilt
              className="logo-cell relative flex items-center justify-center"
              style={{
                aspectRatio: "16 / 10",
                background: "#fff",
                borderRight: "1px solid rgba(0,0,0,.08)",
                borderBottom: "1px solid rgba(0,0,0,.08)",
              }}
            >
              <div
                className="flex flex-col items-center gap-2 transition-opacity duration-500"
                style={{ color: "rgba(0,0,0,.25)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span style={{ fontSize: 10, letterSpacing: ".3em", fontWeight: 600 }}>LOGO</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ background: "#0a0a0a" }}
        >
          {[
            { value: 300, prefix: "+", suffix: "%", label: "CRESCIMENTO MÉDIO" },
            { value: 50, prefix: "", suffix: "M", label: "ALCANCE GERADO" },
            { value: 40, prefix: "", suffix: "+", label: "TIMES NO JOGO" },
            { value: 8, prefix: "", suffix: " anos", label: "NO TABULEIRO" },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center px-6 py-16 md:py-20 text-center"
              style={{
                borderRight: i !== arr.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
              }}
              data-reveal
            >
              <div
                data-count-up
                data-value={s.value}
                data-prefix={s.prefix}
                data-suffix={s.suffix}
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                  color: "var(--mustard)",
                  lineHeight: 1,
                  letterSpacing: "-.02em",
                }}
              >
                {`${s.prefix}0${s.suffix}`}
              </div>
              <div
                className="mt-4"
                style={{
                  fontSize: 11,
                  letterSpacing: ".3em",
                  color: "#8a8a8a",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>




      <section className="relative px-6 py-32 md:px-16 md:py-40" style={{ background: "#fff", color: "#000" }}>
        <div className="mx-auto max-w-5xl text-center">
          <h2 data-reveal style={{ fontWeight: 700, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: .9, letterSpacing: "-.04em" }}>
            Quer <span style={{ color: "var(--mustard)" }}>jogar</span> o nosso <span style={{ color: "var(--mustard)" }}>jogo</span>?
          </h2>
          <p data-reveal className="mt-8" style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontWeight: 500, color: "#000", lineHeight: 1.2, letterSpacing: "-.02em" }}>
            Toda grande vitória começa com o <span style={{ color: "var(--mustard)" }}>primeiro movimento</span>.
          </p>
          <p data-reveal className="mt-4" style={{ fontSize: 16, color: "#666", fontWeight: 300 }}>
            Você não precisa de mais uma agência. Precisa de um <span style={{ color: "var(--mustard)", fontWeight: 500 }}>plano</span>.
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
      <Modal open={methodModalOpen} onClose={closeMethodModal} bodyClassName="w-full max-w-2xl overflow-hidden" zIndex={100}>
        {openMethod ? (
          <div style={{ background: "#0a0a0a", color: "#fff", border: "1px solid var(--mustard)" }}>
            <button onClick={closeMethodModal} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--mustard)", color: "#000", fontSize: 20, fontWeight: 700 }} aria-label="Fechar">×</button>
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
        ) : null}
      </Modal>

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
