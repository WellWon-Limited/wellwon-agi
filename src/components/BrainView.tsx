import { useState } from "react";
import {
  Inbox, Network, Users, Lightbulb, Search, Mic,
  ChevronRight, X, Check, ArrowRight, Tag, Link2,
  Clock, Star, ArrowUpRight, MoreHorizontal, Plus,
  Zap, Sparkles, Heart, Briefcase, GraduationCap,
  MessageSquare, CheckSquare, Globe
} from "lucide-react";

type BrainTab = "inbox" | "zettel" | "people" | "ideas";

/* ─── Mock Data ─── */
const inboxItems = [
  { id: "1", text: "Нужно подготовить презентацию для инвесторов на следующей неделе", time: "2 мин назад", processed: false, type: "task", source: "manual" },
  { id: "2", text: "Идея: сделать рассылку по базе клиентов с новым оффером перед Q2", time: "14 мин назад", processed: false, type: "thought", source: "voice", tag: "Q2 маркетинг" },
  { id: "3", text: "Посмотри кейс конкурента — они запустили новый продукт на Product Hunt", time: "1 ч назад", processed: false, type: "link", source: "chat", tag: "конкуренты" },
  { id: "4", text: "Надо разобраться с подпиской на Notion — скоро истекает", time: "3 ч назад", processed: true, type: "task", source: "manual" },
  { id: "5", text: "Прочитать: «Thinking, Fast and Slow» — ключевые главы о когнитивных искажениях", time: "вчера", processed: true, type: "note", source: "manual" },
];

const zettels = [
  { id: "z1", title: "Мультиагентные системы: архитектура оркестратора", tags: ["AI", "архитектура"], links: 7, importance: "high", excerpt: "Оркестратор координирует специализированных агентов, не зная деталей их реализации. Ключевой паттерн — маршрутизация задач по capability-профилю агента..." },
  { id: "z2", title: "GTD: система захвата и обработки входящих", tags: ["продуктивность", "GTD"], links: 12, importance: "high", excerpt: "Инбокс — единственная точка входа. Обработка ≠ выполнение. Каждый элемент: действие / проект / справка / мусор. Недельный обзор критичен..." },
  { id: "z3", title: "Zettelkasten: принцип одной идеи на карточку", tags: ["knowledge", "writing"], links: 5, importance: "medium", excerpt: "Каждая заметка — одна атомарная идея. Ценность системы — в связях между заметками, а не в отдельных заметках..." },
  { id: "z4", title: "B2B SaaS: метрики для серии A", tags: ["бизнес", "инвестиции"], links: 3, importance: "medium", excerpt: "ARR $1M+ как минимум. NRR >110%. CAC payback <18 мес. Gross margin >70%. Logo churn <5% год..." },
  { id: "z5", title: "Prompt engineering: chain-of-thought reasoning", tags: ["AI", "промпты"], links: 9, importance: "high", excerpt: "CoT значительно улучшает качество рассуждений для задач с несколькими шагами. Few-shot CoT работает лучше zero-shot на сложных задачах..." },
];

const people = [
  { id: "p1", name: "Алексей Соколов", role: "Co-founder", type: "partner", lastContact: "3 дня назад", birthday: "15 марта", color: "text-blue-400", bg: "rgba(74,158,255,0.1)", facts: ["Фокус на B2B SaaS", "Экспертиза в growth", "Знакомы 2 года"] },
  { id: "p2", name: "Мария Петрова", role: "Angel Investor", type: "investor", lastContact: "2 нед назад", birthday: "3 июня", color: "text-emerald-400", bg: "rgba(16,185,129,0.1)", facts: ["Портфель 12 стартапов", "Ticket $50K-$200K", "Нетворк в FinTech"] },
  { id: "p3", name: "Дмитрий Ким", role: "CTO @ StartupX", type: "colleague", lastContact: "вчера", birthday: null, color: "text-violet-400", bg: "rgba(183,124,255,0.1)", facts: ["Python + ML expert", "Знает команду Сбера", "Возможный advisor"] },
  { id: "p4", name: "Анна Воронова", role: "Head of Marketing", type: "team", lastContact: "сегодня", birthday: "20 апреля", color: "text-primary", bg: "rgba(234,56,87,0.1)", facts: ["Управляет бюджетом 2M", "Специалист по B2C", "3 года в команде"] },
];

const ideas = [
  { id: "i1", title: "AI-ассистент для HR-онбординга", viability: 91, category: "SaaS", status: "active", desc: "Автоматизация адаптации новых сотрудников через LLM-агента с базой знаний компании" },
  { id: "i2", title: "Маркетплейс AI-агентов для бизнеса", viability: 78, category: "Platform", status: "active", desc: "B2B платформа — покупай готовых обученных агентов под конкретные бизнес-задачи" },
  { id: "i3", title: "Персональный трекер нейросвязей", viability: 62, category: "Productivity", status: "considering", desc: "Граф знаний с автосвязями через Zettelkasten и визуализацией на основе LLM" },
  { id: "i4", title: "Подписка на AI-команду B2B", viability: 55, category: "Бизнес", status: "archived", desc: "Команда специализированных агентов вместо найма фрилансеров по подписке" },
];

const typeIcon: Record<string, React.ReactNode> = {
  partner: <Briefcase size={14} />,
  investor: <Star size={14} />,
  colleague: <Users size={14} />,
  team: <Heart size={14} />,
};

const typeLabel: Record<string, string> = {
  partner: "Партнёр",
  investor: "Инвестор",
  colleague: "Коллега",
  team: "Команда",
};

/* ─── Main Component ─── */
interface BrainViewProps {
  onNavigate?: (view: string) => void;
}

const typeBadge: Record<string, { label: string; color: string; bg: string }> = {
  task: { label: "задача", color: "text-blue-400", bg: "rgba(74,158,255,0.12)" },
  thought: { label: "мысль", color: "text-violet-400", bg: "rgba(183,124,255,0.12)" },
  link: { label: "ссылка", color: "text-emerald-400", bg: "rgba(16,185,129,0.12)" },
  note: { label: "заметка", color: "text-amber-400", bg: "rgba(251,191,36,0.12)" },
  chat: { label: "чат", color: "text-primary", bg: "rgba(234,56,87,0.12)" },
};

const sourceBadge: Record<string, { label: string }> = {
  manual: { label: "вручную" },
  voice: { label: "голос" },
  chat: { label: "из чата" },
};

const BrainView = ({ onNavigate }: BrainViewProps) => {
  const [activeTab, setActiveTab] = useState<BrainTab>("inbox");
  const [selectedZettel, setSelectedZettel] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState<null | "left" | "right">(null);
  const [inboxItems_, setInboxItems] = useState(inboxItems);
  const [fabOpen, setFabOpen] = useState(false);

  const tabs: { id: BrainTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "inbox", label: "Инбокс", icon: <Inbox size={13} />, count: inboxItems_.filter(i => !i.processed).length },
    { id: "zettel", label: "Zettel", icon: <Network size={13} /> },
    { id: "people", label: "Люди", icon: <Users size={13} /> },
    { id: "ideas", label: "Идеи", icon: <Lightbulb size={13} /> },
  ];

  const handleSwipe = (dir: "left" | "right") => {
    setSwipeDir(dir);
    setTimeout(() => {
      setSwipeDir(null);
      setSwipeIdx((i) => (i + 1) % ideas.length);
    }, 300);
  };

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  const zettel = selectedZettel ? zettels.find(z => z.id === selectedZettel) : null;
  const person = selectedPerson ? people.find(p => p.id === selectedPerson) : null;

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">

      {/* ── Tabs ── */}
      <div className="shrink-0 px-4 pt-20 pb-3">
        <div
          className="flex items-center p-1 gap-0.5"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "100px" }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-all rounded-full flex-1 justify-center"
              style={activeTab === tab.id ? {
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 700,
              } : { color: "rgba(255,255,255,0.4)" }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count != null && tab.count > 0 && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] font-bold"
                  style={activeTab === tab.id
                    ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                    : { background: "hsl(var(--primary))", color: "#fff" }
                  }
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">

        {/* INBOX */}
        {activeTab === "inbox" && (
          <div className="space-y-2">
            {inboxItems_.map((item) => {
              const tb = typeBadge[item.type] || typeBadge.note;
              const sb = sourceBadge[item.source] || sourceBadge.manual;
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 px-4 py-4 rounded-2xl transition-all ${item.processed ? "opacity-50" : ""}`}
                  style={{
                    background: item.processed ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${item.processed ? "rgba(255,255,255,0.04)" : "rgba(234,56,87,0.15)"}`,
                  }}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.processed ? "bg-muted-foreground/30" : "bg-primary animate-pulse"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-snug mb-2 ${item.processed ? "line-through text-muted-foreground/40" : "text-foreground"}`}>
                      {item.text}
                    </p>
                    {/* Type + source badges */}
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md" style={{ background: tb.bg, color: tb.color.replace("text-", "") }}>
                        <span className={tb.color}>{tb.label}</span>
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground/40">{sb.label}</span>
                      {item.tag && (
                        <span className="flex items-center gap-0.5 font-mono text-[9px] text-amber-400/70 px-1.5 py-0.5 rounded-md" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}>
                          <Star size={8} fill="currentColor" /> {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground/40">{item.time}</span>
                      {!item.processed && (
                        <div className="flex items-center gap-1.5">
                          <button
                            className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md text-emerald-400 hover:opacity-80 transition-opacity"
                            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                            onClick={() => setActiveTab("zettel")}
                          >
                            → Zettel
                          </button>
                          <button
                            className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md text-blue-400 hover:opacity-80 transition-opacity"
                            style={{ background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)" }}
                            onClick={() => onNavigate?.("tasks")}
                          >
                            → Задача
                          </button>
                          <button
                            className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md text-muted-foreground/50 hover:opacity-80 transition-opacity"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                            onClick={() => setInboxItems(prev => prev.map(i => i.id === item.id ? { ...i, processed: true } : i))}
                          >
                            <Check size={10} className="inline mr-0.5" /> Готово
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Input */}
            <div className="glass-input rounded-2xl px-4 py-3 flex items-center gap-3 mt-2">
              <input
                type="text"
                placeholder="Набросай идею или задачу..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-[13px] font-mono"
              />
              <button className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
                <Mic size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ZETTELKASTEN */}
        {activeTab === "zettel" && !zettel && (
          <div className="space-y-2">
            {/* Search */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full mb-3"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Search size={14} className="text-foreground/30 shrink-0" />
              <input type="text" placeholder="Поиск Zettels..." className="flex-1 bg-transparent outline-none text-[13px] text-foreground placeholder:text-foreground/25 font-mono" />
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-3">
              {["AI", "бизнес", "GTD", "инвестиции", "writing"].map(tag => (
                <button
                  key={tag}
                  className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full text-muted-foreground/60 hover:text-primary transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Zettels */}
            {zettels.map(z => (
              <button
                key={z.id}
                onClick={() => setSelectedZettel(z.id)}
                className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-[0.99]"
                style={glassCard}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-[14px] font-semibold text-foreground leading-snug line-clamp-2">{z.title}</h3>
                  <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${z.importance === "high" ? "bg-primary" : "bg-muted-foreground/40"}`} />
                </div>
                <p className="font-mono text-[11px] text-muted-foreground/50 leading-relaxed mb-3 line-clamp-2">{z.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {z.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-muted-foreground/50" style={{ background: "rgba(255,255,255,0.05)" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 ml-auto text-muted-foreground/40">
                    <Link2 size={10} />
                    <span className="font-mono text-[10px]">{z.links}</span>
                  </div>
                </div>
              </button>
            ))}

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mt-1 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
              style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <Plus size={15} />
              <span className="font-mono text-[11px] tracking-widest uppercase">Новая заметка</span>
            </button>
          </div>
        )}

        {/* ZETTEL DETAIL */}
        {activeTab === "zettel" && zettel && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedZettel(null)}
              className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronRight size={12} className="rotate-180" /> Назад
            </button>

            <div style={glassCard} className="px-5 py-5">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-[16px] font-bold text-foreground leading-snug flex-1 mr-3">{zettel.title}</h2>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground/40 hover:text-foreground transition-colors">
                  <MoreHorizontal size={15} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {zettel.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-md text-primary border border-primary/20" style={{ background: "rgba(234,56,87,0.08)" }}>
                    <Tag size={8} /> {t}
                  </span>
                ))}
              </div>
              <p className="text-[14px] text-foreground/80 leading-relaxed">{zettel.excerpt}</p>
              <p className="text-[14px] text-foreground/80 leading-relaxed mt-3">
                Связанные концепции образуют граф знаний, где каждая заметка обогащает контекст других. Основная ценность — не сам контент, а сеть связей между атомарными идеями.
              </p>
            </div>

            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Link2 size={13} className="text-primary" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Связи ({zettel.links})</span>
              </div>
              <div className="space-y-2">
                {zettels.filter(z => z.id !== zettel.id).slice(0, 3).map(z => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZettel(z.id)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all text-left"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-[13px] text-foreground/80 line-clamp-1">{z.title}</span>
                    <ArrowUpRight size={12} className="text-muted-foreground/30 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PEOPLE */}
        {activeTab === "people" && !person && (
          <div className="space-y-2">
            {people.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPerson(p.id)}
                className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-[0.99]"
                style={glassCard}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-[15px] shrink-0"
                    style={{ background: p.bg, color: p.color.replace("text-", "").replace("-400", "") }}
                  >
                    <span className={p.color}>{p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[14px] font-semibold text-foreground">{p.name}</span>
                      <div className={`flex items-center gap-1 font-mono text-[10px] ${p.color}`}>
                        {typeIcon[p.type]}
                        <span className="tracking-widest uppercase">{typeLabel[p.type]}</span>
                      </div>
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground/60 mb-2">{p.role}</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-muted-foreground/40">
                        <Clock size={10} />
                        <span className="font-mono text-[10px]">{p.lastContact}</span>
                      </div>
                      {p.birthday && (
                        <div className="flex items-center gap-1 text-muted-foreground/40">
                          <span className="font-mono text-[10px]">🎂 {p.birthday}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mt-1 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
              style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <Plus size={15} />
              <span className="font-mono text-[11px] tracking-widest uppercase">Добавить контакт</span>
            </button>
          </div>
        )}

        {/* PERSON DETAIL */}
        {activeTab === "people" && person && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedPerson(null)}
              className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronRight size={12} className="rotate-180" /> Назад
            </button>

            <div style={glassCard} className="px-5 py-5">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[20px] font-bold shrink-0"
                  style={{ background: person.bg }}
                >
                  <span className={person.color}>{person.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-foreground mb-0.5">{person.name}</h2>
                  <div className={`flex items-center gap-1.5 font-mono text-[11px] ${person.color}`}>
                    {typeIcon[person.type]}
                    <span>{typeLabel[person.type]} · {person.role}</span>
                  </div>
                  {person.birthday && <p className="font-mono text-[11px] text-muted-foreground/50 mt-1">🎂 {person.birthday}</p>}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-2">Ключевые факты</div>
                <div className="space-y-2">
                  {person.facts.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      <span className="text-[13px] text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={glassCard} className="px-4 py-4">
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-3">Связанные заметки</div>
              <div className="space-y-2">
                {zettels.slice(0, 2).map(z => (
                  <button
                    key={z.id}
                    onClick={() => { setActiveTab("zettel"); setSelectedZettel(z.id); }}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all text-left"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-[13px] text-foreground/80 line-clamp-1">{z.title}</span>
                    <ArrowRight size={12} className="text-muted-foreground/30 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate?.("chat")}
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary hover:opacity-80 transition-opacity"
              style={{ background: "rgba(234,56,87,0.08)", border: "1px solid rgba(234,56,87,0.18)" }}
            >
              <Sparkles size={13} /> Написать JARVIS про {person.name.split(" ")[0]}
            </button>
          </div>
        )}

        {/* IDEAS */}
        {activeTab === "ideas" && (
          <div className="space-y-3">
            {/* Swipe card */}
            {swipeIdx < ideas.length && (
              <div
                className="transition-all duration-300"
                style={{
                  transform: swipeDir === "left" ? "translateX(-120%) rotate(-8deg)" : swipeDir === "right" ? "translateX(120%) rotate(8deg)" : "none",
                  opacity: swipeDir ? 0 : 1,
                }}
              >
                <div
                  className="px-5 py-5 rounded-2xl mb-2"
                  style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md text-amber-400"
                      style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}
                    >
                      {ideas[swipeIdx % ideas.length].category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden w-16">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${ideas[swipeIdx % ideas.length].viability}%` }} />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-emerald-400">{ideas[swipeIdx % ideas.length].viability}%</span>
                    </div>
                  </div>
                  <h3 className="text-[16px] font-bold text-foreground mb-2">{ideas[swipeIdx % ideas.length].title}</h3>
                  <p className="font-mono text-[12px] text-muted-foreground/60 leading-relaxed">{ideas[swipeIdx % ideas.length].desc}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-destructive"
                    style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.15)" }}
                  >
                    <X size={13} /> Архив
                  </button>
                  <button
                    onClick={() => handleSwipe("right")}
                    className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-emerald-400"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
                  >
                    <Check size={13} /> Актуально
                  </button>
                </div>
              </div>
            )}

            {/* List */}
            <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-2 mb-2">Все идеи</div>
            {ideas.map(idea => (
              <div
                key={idea.id}
                className="px-4 py-3.5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${idea.status === "active" ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.05)"}`,
                  opacity: idea.status === "archived" ? 0.5 : 1,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-foreground line-clamp-1">{idea.title}</span>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <div className="h-1 rounded-full bg-secondary overflow-hidden w-12">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${idea.viability}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">{idea.viability}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-muted-foreground/50"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {idea.category}
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md ${
                      idea.status === "active" ? "text-emerald-400" : idea.status === "considering" ? "text-amber-400" : "text-muted-foreground/30"
                    }`}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    {idea.status === "active" ? "Активна" : idea.status === "considering" ? "Обдумываю" : "Архив"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB — раскрывается в 4 опции */}
      <div className="fixed bottom-[88px] right-4 z-20 flex flex-col items-end gap-2">
        {fabOpen && (
          <div className="flex flex-col items-end gap-2 mb-1">
            {[
              { icon: <Mic size={15} />, label: "Голосовая", color: "text-primary", action: () => {} },
              { icon: <Lightbulb size={15} />, label: "Идея", color: "text-amber-400", action: () => setActiveTab("ideas") },
              { icon: <CheckSquare size={15} />, label: "Задача", color: "text-emerald-400", action: () => { setFabOpen(false); onNavigate?.("tasks"); } },
              { icon: <MessageSquare size={15} />, label: "Чат", color: "text-blue-400", action: () => { setFabOpen(false); onNavigate?.("chat"); } },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => { item.action(); setFabOpen(false); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:opacity-90 transition-all"
                style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground/70">{item.label}</span>
                <span className={item.color}>{item.icon}</span>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{
            background: fabOpen ? "rgba(255,255,255,0.12)" : "hsl(var(--primary))",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(234,56,87,0.35)",
          }}
        >
          {fabOpen ? <X size={20} className="text-foreground" /> : <Plus size={22} className="text-primary-foreground" />}
        </button>
      </div>
    </div>
  );
};

export default BrainView;

