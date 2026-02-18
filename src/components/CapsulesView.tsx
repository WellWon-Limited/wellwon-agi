import { useState } from "react";
import {
  Package, Clock, Zap, Bell, Eye, Plus, X, ChevronRight,
  Check, Link2, Edit2, AlertCircle, Play
} from "lucide-react";

interface CapsulesViewProps {
  onNavigate?: (view: string) => void;
}

type CapsuleType = "check" | "remind" | "execute";

interface Capsule {
  id: string;
  title: string;
  type: CapsuleType;
  trigger: string;
  daysLeft: number;
  context: string[];
  links: string[];
  agentSteps: string[];
  status: "active" | "fired";
  result?: string;
}

const capsules: Capsule[] = [
  {
    id: "c1",
    title: "Пересмотр стратегии выхода на маркетплейсы",
    type: "check",
    trigger: "20 февраля 2026",
    daysLeft: 2,
    context: [
      "Anализ Ozon vs Wildberries готов (34 стр.)",
      "ROI расчёт: ожидаемый 320% за 6 мес.",
      "Бюджет на старт: $15,000",
      "Команда: маркетолог + аналитик",
    ],
    links: ["Стратегия выхода на маркетплейсы · Zettel", "Анализ конкурентов Q1 · Doc"],
    agentSteps: [
      "Запросить финальный анализ от МАРК",
      "Сравнить с текущими метриками",
      "Подготовить рекомендацию: идти / не идти",
    ],
    status: "active",
  },
  {
    id: "c2",
    title: "Анализ результатов рекламных кампаний",
    type: "execute",
    trigger: "22 февраля 2026",
    daysLeft: 4,
    context: [
      "Кампании: Instagram, Яндекс, VK",
      "Бюджет потрачен: 180,000₽",
      "Целевая аудитория: B2B CEO 35-55",
    ],
    links: ["Кампании Feb 2026 · Space", "Метрики ROAS · Doc"],
    agentSteps: [
      "Собрать данные из рекламных кабинетов",
      "Рассчитать ROAS и CPL по каналам",
      "Создать отчёт с рекомендациями",
    ],
    status: "active",
  },
  {
    id: "c3",
    title: "Квартальный отчёт для команды",
    type: "remind",
    trigger: "25 февраля 2026",
    daysLeft: 7,
    context: [
      "Q4 2025 итоги готовы",
      "KPI команды: 78% выполнения",
      "Следующие цели обсуждались 15 янв.",
    ],
    links: ["KPI Q4 2025 · Doc"],
    agentSteps: [
      "Собрать итоги всех агентов за период",
      "Оформить дайджест в PDF",
      "Разослать команде в Notion",
    ],
    status: "active",
  },
];

const firedCapsules: Capsule[] = [
  {
    id: "f1",
    title: "Контент-план на февраль",
    type: "execute",
    trigger: "1 февраля 2026",
    daysLeft: 0,
    context: [],
    links: [],
    agentSteps: [],
    status: "fired",
    result: "АННА создала контент-план на 28 публикаций. Согласован с командой. Загружен в Notion.",
  },
  {
    id: "f2",
    title: "Напоминание: продление Notion",
    type: "remind",
    trigger: "10 февраля 2026",
    daysLeft: 0,
    context: [],
    links: [],
    agentSteps: [],
    status: "fired",
    result: "Уведомление отправлено. Подписка продлена на год ($96).",
  },
];

const typeConfig: Record<CapsuleType, { icon: React.ReactNode; label: string; color: string; bg: string; border: string }> = {
  check: {
    icon: <Eye size={13} />,
    label: "Проверка",
    color: "text-amber-400",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.20)",
  },
  remind: {
    icon: <Bell size={13} />,
    label: "Напоминание",
    color: "text-blue-400",
    bg: "rgba(74,158,255,0.10)",
    border: "rgba(74,158,255,0.20)",
  },
  execute: {
    icon: <Zap size={13} />,
    label: "Выполнение",
    color: "text-primary",
    bg: "rgba(234,56,87,0.10)",
    border: "rgba(234,56,87,0.20)",
  },
};

const urgencyColor = (days: number) => {
  if (days <= 2) return "text-primary";
  if (days <= 5) return "text-amber-400";
  return "text-emerald-400";
};

const CapsulesView = ({ onNavigate }: CapsulesViewProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<CapsuleType>("remind");
  const [newDate, setNewDate] = useState("");

  const selected = selectedId
    ? [...capsules, ...firedCapsules].find(c => c.id === selectedId)
    : null;

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  if (selected) {
    const cfg = typeConfig[selected.type];
    return (
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="px-4 pt-20 pb-8 space-y-4">
          {/* Back */}
          <button
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronRight size={12} className="rotate-180" /> Назад
          </button>

          {/* Header */}
          <div
            className="px-5 py-5 rounded-2xl"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={cfg.color}>{cfg.icon}</span>
              <span className={`font-mono text-[10px] tracking-widest uppercase font-bold ${cfg.color}`}>{cfg.label}</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">{selected.trigger}</span>
            </div>
            <h2 className="text-[17px] font-bold text-foreground mb-2 leading-snug">{selected.title}</h2>
            {selected.status === "active" && (
              <div className={`flex items-center gap-1.5 font-mono text-[12px] font-bold ${urgencyColor(selected.daysLeft)}`}>
                <Clock size={12} />
                Через {selected.daysLeft} дня
              </div>
            )}
            {selected.status === "fired" && (
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 font-bold">
                <Check size={12} /> Сработала
              </div>
            )}
          </div>

          {/* Result (fired) */}
          {selected.result && (
            <div className="px-4 py-4 rounded-2xl" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Check size={13} className="text-emerald-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-400 font-bold">Результат</span>
              </div>
              <p className="font-mono text-[12px] text-foreground/70 leading-relaxed">{selected.result}</p>
            </div>
          )}

          {/* Context */}
          {selected.context.length > 0 && (
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Package size={13} className="text-muted-foreground/60" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Замороженный контекст</span>
              </div>
              <div className="space-y-2">
                {selected.context.map((ctx, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
                    <span className="font-mono text-[12px] text-foreground/70 leading-relaxed">{ctx}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {selected.links.length > 0 && (
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Link2 size={13} className="text-primary" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Зависимости</span>
              </div>
              <div className="space-y-2">
                {selected.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <Link2 size={11} className="text-primary/50 shrink-0" />
                    <span className="font-mono text-[12px] text-foreground/70">{link}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agent Steps */}
          {selected.agentSteps.length > 0 && (
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={13} className="text-primary" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Что сделает агент</span>
              </div>
              <div className="space-y-3">
                {selected.agentSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[11px] text-primary font-bold w-5 text-center shrink-0">{i + 1}</span>
                    <span className="font-mono text-[12px] text-foreground/70 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {selected.status === "active" && (
            <div className="flex gap-2.5 pt-2">
              <button className="flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary hover:opacity-80 transition-opacity" style={{ background: "rgba(234,56,87,0.10)", border: "1px solid rgba(234,56,87,0.20)" }}>
                <Play size={13} /> Запустить
              </button>
              <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Edit2 size={14} />
              </button>
              <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-destructive/60 hover:text-destructive transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide relative">
      <div className="px-4 pt-20 pb-28 space-y-3">

        {/* Active */}
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle size={12} className="text-primary" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Активные</span>
          <span className="font-mono text-[10px] text-primary font-bold ml-1">{capsules.length}</span>
        </div>

        {capsules.map(cap => {
          const cfg = typeConfig[cap.type];
          return (
            <button
              key={cap.id}
              onClick={() => setSelectedId(cap.id)}
              className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-[0.99]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${cap.daysLeft <= 2 ? "rgba(234,56,87,0.25)" : "rgba(255,255,255,0.07)"}`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md font-bold ${cfg.color}`}
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                  >
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
                <div className={`flex items-center gap-1 font-mono text-[11px] font-bold ${urgencyColor(cap.daysLeft)}`}>
                  <Clock size={11} />
                  {cap.daysLeft} дн.
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1.5 leading-snug">{cap.title}</h3>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground/40">{cap.trigger}</span>
                <span className="font-mono text-[10px] text-muted-foreground/25">·</span>
                <span className="font-mono text-[10px] text-muted-foreground/40">{cap.context.length} пунктов контекста</span>
              </div>
            </button>
          );
        })}

        {/* Fired */}
        <div className="flex items-center gap-2 mt-4 mb-1">
          <Check size={12} className="text-emerald-400" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Сработавшие</span>
        </div>

        {firedCapsules.map(cap => {
          const cfg = typeConfig[cap.type];
          return (
            <button
              key={cap.id}
              onClick={() => setSelectedId(cap.id)}
              className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition-all opacity-60"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`font-mono text-[9px] tracking-widest uppercase ${cfg.color}`}>{cfg.label}</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                  <Check size={10} /> Выполнено
                </span>
              </div>
              <h3 className="text-[13px] font-semibold text-foreground/60 mb-1 leading-snug">{cap.title}</h3>
              <span className="font-mono text-[10px] text-muted-foreground/30">{cap.trigger}</span>
            </button>
          );
        })}
      </div>

      {/* New Capsule Form */}
      {showNewForm && (
        <div
          className="fixed inset-0 z-30 flex items-end"
          onClick={() => setShowNewForm(false)}
        >
          <div
            className="w-full rounded-t-3xl px-5 pt-6 pb-10 space-y-4"
            style={{ background: "hsl(240,10%,8%)", border: "1px solid rgba(255,255,255,0.10)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[13px] font-bold tracking-widest uppercase text-foreground">Новая капсула</span>
              <button onClick={() => setShowNewForm(false)} className="text-muted-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Название капсулы..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-foreground text-[14px] outline-none font-mono placeholder:text-muted-foreground/40 focus:border-primary/40"
            />
            <div className="flex gap-2">
              {(["check", "remind", "execute"] as CapsuleType[]).map(t => {
                const cfg = typeConfig[t];
                return (
                  <button
                    key={t}
                    onClick={() => setNewType(t)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-mono text-[10px] tracking-widest uppercase transition-all ${cfg.color}`}
                    style={{
                      background: newType === t ? cfg.bg : "rgba(255,255,255,0.03)",
                      border: `1px solid ${newType === t ? cfg.border : "rgba(255,255,255,0.07)"}`,
                    }}
                  >
                    {cfg.icon} {cfg.label}
                  </button>
                );
              })}
            </div>
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-foreground text-[14px] outline-none font-mono focus:border-primary/40"
              style={{ colorScheme: "dark" }}
            />
            <button
              onClick={() => { setShowNewForm(false); setNewTitle(""); setNewDate(""); }}
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-mono text-[12px] tracking-widest uppercase font-bold text-primary-foreground transition-opacity hover:opacity-90"
              style={{ background: "hsl(var(--primary))" }}
            >
              <Check size={14} /> Создать капсулу
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowNewForm(true)}
        className="fixed bottom-20 right-4 z-20 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{
          background: "hsl(var(--primary))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(234,56,87,0.35)",
        }}
      >
        <Plus size={22} className="text-primary-foreground" />
      </button>
    </div>
  );
};

export default CapsulesView;
