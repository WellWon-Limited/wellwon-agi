import { useState } from "react";
import {
  Search, Briefcase, Code, Lightbulb, GraduationCap, Globe,
  FileText, Link2, Clock, Star, Zap, ChevronRight, Plus,
  Brain, Database, Sparkles, TrendingUp, BookOpen, Film,
  MoreHorizontal, CheckCircle2, RefreshCw
} from "lucide-react";

/* ─── Types ─── */
type KBTab = "spaces" | "docs" | "sources";

interface Space {
  icon: React.ElementType;
  color: string;
  bg: string;
  title: string;
  description: string;
  count: number;
  updatedAt: string;
  pinned?: boolean;
}

interface Doc {
  title: string;
  excerpt: string;
  space: string;
  spaceColor: string;
  updatedAt: string;
  type: "note" | "summary" | "brief" | "research";
  starred?: boolean;
}

interface Source {
  title: string;
  url: string;
  domain: string;
  type: "web" | "pdf" | "video" | "file";
  summary: string;
  savedAt: string;
  processed: boolean;
}

/* ─── Mock Data ─── */
const spaces: Space[] = [
  {
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    title: "Рабочие проекты",
    description: "Стратегия, задачи, аналитика",
    count: 34,
    updatedAt: "2 мин назад",
    pinned: true,
  },
  {
    icon: Code,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    title: "Разработка",
    description: "Код, дебаг, документация API",
    count: 61,
    updatedAt: "18 мин назад",
    pinned: true,
  },
  {
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Маркетинг",
    description: "Кампании, метрики, конкуренты",
    count: 22,
    updatedAt: "1 ч назад",
  },
  {
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    title: "Обучение",
    description: "Курсы, статьи, саморазвитие",
    count: 17,
    updatedAt: "вчера",
  },
  {
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    title: "Идеи",
    description: "Брейнштормы, черновики, гипотезы",
    count: 9,
    updatedAt: "3 дня назад",
  },
  {
    icon: BookOpen,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    title: "Личное",
    description: "Цели, привычки, заметки",
    count: 5,
    updatedAt: "неделю назад",
  },
];

const docs: Doc[] = [
  {
    title: "Анализ конкурентов Q1 2026",
    excerpt: "Топ-5 конкурентов по доле рынка, ROAS и стоимости привлечения. Лидер — Yandex Ads с CPL 420₽ при таргете B2B...",
    space: "Маркетинг",
    spaceColor: "text-primary",
    updatedAt: "2 мин назад",
    type: "research",
    starred: true,
  },
  {
    title: "Архитектура JARVIS v2.0",
    excerpt: "Многоагентная система с оркестратором, специализированными LLM-агентами и RAG-пайплайном на собственной базе знаний...",
    space: "Разработка",
    spaceColor: "text-violet-400",
    updatedAt: "18 мин назад",
    type: "brief",
    starred: true,
  },
  {
    title: "Стратегия выхода на маркетплейсы",
    excerpt: "Ozon vs Wildberries: сравнение комиссий, алгоритмов продвижения и ожидаемого ROI для продуктовой категории...",
    space: "Рабочие проекты",
    spaceColor: "text-blue-400",
    updatedAt: "1 ч назад",
    type: "note",
  },
  {
    title: "Конспект: System Design Interview",
    excerpt: "Паттерны масштабирования, CAP-теорема, очереди сообщений, шардинг баз данных. Разобраны кейсы Twitter, Uber...",
    space: "Обучение",
    spaceColor: "text-emerald-400",
    updatedAt: "вчера",
    type: "summary",
  },
  {
    title: "Идея: подписка на AI-команду",
    excerpt: "B2B SaaS — команда ИИ-агентов по подписке вместо фриланса. Базовый пакет 3 агента, премиум — 10+ с кастомизацией...",
    space: "Идеи",
    spaceColor: "text-amber-400",
    updatedAt: "3 дня назад",
    type: "note",
  },
];

const sources: Source[] = [
  {
    title: "State of AI Report 2026 — Sequoia Capital",
    url: "https://sequoia.com/ai-report-2026",
    domain: "sequoia.com",
    type: "pdf",
    summary: "JARVIS извлёк ключевые тренды: мультиагентность, специализация LLM, сдвиг к inference-экономике",
    savedAt: "сегодня",
    processed: true,
  },
  {
    title: "Как работает RAG: полный гайд 2026",
    url: "https://habr.com/ru/articles/rag-guide",
    domain: "habr.com",
    type: "web",
    summary: "Chunking, embedding, retrieval — пошаговое объяснение с примерами кода на Python",
    savedAt: "вчера",
    processed: true,
  },
  {
    title: "Andrej Karpathy: Software 3.0",
    url: "https://youtube.com/watch?v=karpathy",
    domain: "youtube.com",
    type: "video",
    summary: "Видео транскрибировано. Главный тезис: LLM — новый уровень абстракции в программировании",
    savedAt: "2 дня назад",
    processed: true,
  },
  {
    title: "Финансовая модель 2026 Q1.xlsx",
    url: "local://finance-model.xlsx",
    domain: "Локальный файл",
    type: "file",
    summary: "JARVIS обрабатывает... извлечение данных из таблицы",
    savedAt: "только что",
    processed: false,
  },
];

/* ─── Sub-components ─── */
const typeLabel: Record<Doc["type"], { label: string; color: string }> = {
  note: { label: "Заметка", color: "text-foreground/50" },
  summary: { label: "Конспект", color: "text-emerald-400/70" },
  brief: { label: "Бриф", color: "text-violet-400/70" },
  research: { label: "Исследование", color: "text-primary/70" },
};

const sourceIcon: Record<Source["type"], React.ReactNode> = {
  web: <Globe size={15} />,
  pdf: <FileText size={15} />,
  video: <Film size={15} />,
  file: <FileText size={15} />,
};

/* ─── Main Component ─── */
const KnowledgeBaseView = () => {
  const [activeTab, setActiveTab] = useState<KBTab>("spaces");
  const [search, setSearch] = useState("");

  const totalItems = spaces.reduce((s, sp) => s + sp.count, 0);

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">

      {/* Stats bar */}
      <div className="shrink-0 px-4 pt-20 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Search size={14} className="text-foreground/30 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск в базе знаний..."
              className="flex-1 bg-transparent outline-none text-[14px] text-foreground placeholder:text-foreground/25 font-mono"
            />
          </div>
        </div>

        {/* Mini stats */}
        <div className="flex items-center gap-4 mt-3 px-1">
          {[
            { icon: <Database size={11} />, label: `${totalItems} материалов` },
            { icon: <Brain size={11} />, label: `${spaces.length} пространств` },
            { icon: <Sparkles size={11} />, label: "RAG активен" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-muted-foreground/50">
              {s.icon}
              <span className="font-mono text-[10px] tracking-widest uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab toggle */}
      <div className="shrink-0 px-4 pb-3">
        <div
          className="flex items-center p-1 self-start"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "100px",
          }}
        >
          {([
            { id: "spaces", label: "Пространства", icon: <Database size={13} /> },
            { id: "docs", label: "Документы", icon: <FileText size={13} /> },
            { id: "sources", label: "Источники", icon: <Link2 size={13} /> },
          ] as { id: KBTab; label: string; icon: React.ReactNode }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-all rounded-full"
              style={activeTab === tab.id ? {
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 700,
              } : {
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">

        {/* ── Spaces tab ── */}
        {activeTab === "spaces" && (
          <div className="space-y-2">
            {/* Pinned */}
            <div className="flex items-center gap-1.5 mb-3 mt-1">
              <Star size={10} className="text-primary/60" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Закреплённые</span>
            </div>
            {spaces.filter(s => s.pinned).map((space, i) => {
              const Icon = space.icon;
              return (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all hover:bg-white/5 active:scale-[0.99]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className={`w-10 h-10 rounded-xl ${space.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={space.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[15px] font-semibold text-foreground">{space.title}</span>
                      <span className="font-mono text-[11px] text-muted-foreground/50 shrink-0">{space.count}</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/50">{space.description}</span>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground/30 shrink-0" />
                </button>
              );
            })}

            <div className="flex items-center gap-1.5 mb-3 mt-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Все пространства</span>
            </div>
            {spaces.filter(s => !s.pinned).map((space, i) => {
              const Icon = space.icon;
              return (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all hover:bg-white/5"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className={`w-9 h-9 rounded-xl ${space.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={space.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-foreground">{space.title}</span>
                      <span className="font-mono text-[10px] text-muted-foreground/40">{space.count}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/40">{space.updatedAt}</span>
                  </div>
                  <ChevronRight size={13} className="text-muted-foreground/20 shrink-0" />
                </button>
              );
            })}

            {/* Add space */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mt-2 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
              style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                <Plus size={16} />
              </div>
              <span className="font-mono text-[11px] tracking-widest uppercase">Новое пространство</span>
            </button>
          </div>
        )}

        {/* ── Docs tab ── */}
        {activeTab === "docs" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-muted-foreground/40" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40">Недавние</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/30">{docs.length} из {totalItems}</span>
            </div>
            {docs.map((doc, i) => {
              const meta = typeLabel[doc.type];
              return (
                <button key={i} className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:bg-white/5 active:scale-[0.99]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[14px] font-semibold text-foreground leading-snug line-clamp-2">{doc.title}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {doc.starred && <Star size={11} className="text-primary/60" fill="currentColor" />}
                      <MoreHorizontal size={14} className="text-muted-foreground/30" />
                    </div>
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground/50 leading-relaxed mb-3 line-clamp-2">{doc.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[10px] tracking-widest uppercase ${meta.color}`}>{meta.label}</span>
                    <span className="font-mono text-[10px] text-muted-foreground/30">·</span>
                    <span className={`font-mono text-[10px] ${doc.spaceColor} opacity-70`}>{doc.space}</span>
                    <span className="font-mono text-[10px] text-muted-foreground/30 ml-auto">{doc.updatedAt}</span>
                  </div>
                </button>
              );
            })}

            {/* JARVIS suggestion */}
            <div
              className="px-4 py-4 rounded-2xl mt-2"
              style={{ background: "rgba(234,56,87,0.06)", border: "1px solid rgba(234,56,87,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={13} className="text-primary" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">JARVIS предлагает</span>
              </div>
              <p className="font-mono text-[12px] text-foreground/70 leading-relaxed">
                Объединить «Анализ конкурентов» и «Стратегию выхода на маркетплейсы» в единый стратегический документ
              </p>
              <button className="mt-3 font-mono text-[10px] tracking-widest uppercase text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                <Sparkles size={10} /> Создать документ
              </button>
            </div>
          </div>
        )}

        {/* ── Sources tab ── */}
        {activeTab === "sources" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3 mt-1">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40">Сохранённые источники</span>
              <span className="font-mono text-[10px] text-muted-foreground/30">{sources.length} источников</span>
            </div>
            {sources.map((src, i) => (
              <div key={i} className="px-4 py-4 rounded-2xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${src.processed ? "rgba(255,255,255,0.05)" : "rgba(234,56,87,0.2)"}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-muted-foreground/50 mt-0.5">
                    {sourceIcon[src.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2">{src.title}</span>
                      {src.processed ? (
                        <CheckCircle2 size={13} className="text-emerald-400/70 shrink-0 mt-0.5" />
                      ) : (
                        <RefreshCw size={13} className="text-primary/70 shrink-0 mt-0.5 animate-spin" />
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/40 block mb-2">{src.domain}</span>
                    <p className="font-mono text-[11px] text-muted-foreground/50 leading-relaxed line-clamp-2">
                      {src.processed ? src.summary : (
                        <span className="text-primary/60">{src.summary}</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock size={9} className="text-muted-foreground/30" />
                      <span className="font-mono text-[10px] text-muted-foreground/30">{src.savedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add source */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
              style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                <Link2 size={15} />
              </div>
              <div className="text-left">
                <div className="font-mono text-[11px] tracking-widest uppercase">Добавить источник</div>
                <div className="font-mono text-[10px] text-muted-foreground/30 mt-0.5">URL, PDF, файл или голос</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
