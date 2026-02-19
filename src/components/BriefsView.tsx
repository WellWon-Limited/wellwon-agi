import { useState } from "react";
import {
  Sun, Moon, Star, Clock, Package, Lightbulb,
  Zap, TrendingUp, TrendingDown, ChevronRight,
  Check, X, Brain, Battery, BarChart2, Sparkles
} from "lucide-react";

type BriefTab = "morning" | "evening";

interface BriefsViewProps {
  onNavigate: (view: string) => void;
}

const morningTasks = [
  { title: "Финализировать стратегию Q1 2026", priority: 3, agent: "ЯРВИС" },
  { title: "Подготовить презентацию для инвесторов", priority: 3, agent: "АННА" },
  { title: "Ревью контент-плана на февраль", priority: 2, agent: "АННА" },
  { title: "Созвон с командой 15:00", priority: 1, agent: null },
  { title: "Настройка интеграции CRM Bitrix24", priority: 1, agent: null },
];

const capsuleReminders = [
  { title: "Пересмотр стратегии выхода на маркетплейсы", trigger: "Через 2 дня", type: "check" },
  { title: "Квартальный отчёт команды", trigger: "Через 7 дней", type: "remind" },
];

const llmCosts = [
  { model: "Claude 3.7 Sonnet", cost: "$0.21", pct: 62, color: "bg-violet-400" },
  { model: "Gemini 3 Flash", cost: "$0.09", pct: 26, color: "bg-blue-400" },
  { model: "GPT-4o mini", cost: "$0.04", pct: 12, color: "bg-emerald-400" },
];

const doneTasks = [
  { title: "Ревью контент-плана", done: true },
  { title: "Аналитика рекламных кампаний", done: true },
  { title: "Еженедельный дайджест", done: true },
  { title: "Настройка интеграции CRM", done: false },
  { title: "Созвон с инвесторами", done: false },
];

const BriefsView = ({ onNavigate }: BriefsViewProps) => {
  const [activeTab, setActiveTab] = useState<BriefTab>("morning");
  const [ideaAction, setIdeaAction] = useState<null | "yes" | "no">(null);

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Tab switcher */}
      <div className="shrink-0 px-4 pt-20 pb-3">
        <div
          className="flex items-center p-1"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "100px" }}
        >
          {([
            { id: "morning", label: "Утренний бриф", icon: <Sun size={13} /> },
            { id: "evening", label: "Вечерний отчёт", icon: <Moon size={13} /> },
          ] as { id: BriefTab; label: string; icon: React.ReactNode }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 font-mono text-[11px] tracking-widest uppercase transition-all rounded-full flex-1 justify-center"
              style={activeTab === tab.id ? {
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 700,
              } : { color: "rgba(255,255,255,0.4)" }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-28 space-y-4">

        {/* ── MORNING BRIEF ── */}
        {activeTab === "morning" && (
          <>
            {/* Header */}
            <div
              className="px-5 py-5 rounded-2xl"
              style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.18)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sun size={18} className="text-amber-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-amber-400 font-bold">Утренний бриф</span>
              </div>
              <div className="text-[22px] font-black text-foreground mb-0.5">Доброе утро, Ярослав</div>
              <div className="font-mono text-[12px] text-muted-foreground/60">Среда, 18 февраля 2026 · 08:32</div>
            </div>

            {/* Tasks */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-primary" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Задачи на сегодня</span>
              </div>
              <div className="space-y-3">
                {morningTasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[11px] text-muted-foreground/30 w-4 text-right shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[13px] text-foreground leading-snug">{task.title}</span>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {Array.from({ length: 3 }).map((_, si) => (
                            <Star
                              key={si}
                              size={10}
                              className={si < task.priority ? "text-amber-400" : "text-muted-foreground/20"}
                              fill={si < task.priority ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      {task.agent && (
                        <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-primary mt-1 inline-block" style={{ background: "rgba(234,56,87,0.08)", border: "1px solid rgba(234,56,87,0.15)" }}>
                          {task.agent}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate("tasks")}
                className="w-full mt-4 py-2 rounded-xl flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 hover:text-foreground transition-colors"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                Все задачи <ChevronRight size={11} />
              </button>
            </div>

            {/* Capsule Reminders */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Package size={14} className="text-blue-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Напоминания</span>
              </div>
              <div className="space-y-2">
                {capsuleReminders.map((cap, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "rgba(74,158,255,0.06)", border: "1px solid rgba(74,158,255,0.12)" }}>
                    <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="flex-1 text-[13px] text-foreground/80">{cap.title}</span>
                    <span className="font-mono text-[10px] text-blue-400 shrink-0">{cap.trigger}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Idea of the day */}
            {!ideaAction && (
              <div
                className="px-4 py-4 rounded-2xl"
                style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={14} className="text-amber-400" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-amber-400 font-bold">Идея для обдумывания</span>
                </div>
                <p className="text-[14px] text-foreground font-semibold mb-1.5">Маркетплейс AI-агентов для бизнеса</p>
                <p className="font-mono text-[12px] text-muted-foreground/60 leading-relaxed mb-4">
                  B2B платформа — покупай готовых обученных агентов под конкретные бизнес-задачи. Viability: 78%.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIdeaAction("no")}
                    className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <X size={12} /> Не сейчас
                  </button>
                  <button
                    onClick={() => setIdeaAction("yes")}
                    className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-amber-400"
                    style={{ background: "rgba(251,191,36,0.10)", border: "1px solid rgba(251,191,36,0.20)" }}
                  >
                    <Check size={12} /> Актуально
                  </button>
                </div>
              </div>
            )}
            {ideaAction && (
              <div className="px-4 py-3 rounded-2xl flex items-center gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Check size={13} className="text-emerald-400" />
                <span className="font-mono text-[12px] text-muted-foreground/60">
                  {ideaAction === "yes" ? "Идея помечена как актуальная" : "Идея отложена"}
                </span>
              </div>
            )}

            {/* Energy */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Battery size={14} className="text-emerald-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Энергия и фокус</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <div className="font-mono text-[28px] font-black text-emerald-400">91%</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Уровень энергии</div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "91%" }} />
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground/60">Отличный день для сложных задач и стратегического мышления</p>
                </div>
              </div>
              <div className="flex gap-2">
                {["Презентация", "Стратегия", "Переговоры"].map(tag => (
                  <span key={tag} className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-md text-emerald-400" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Dream State */}
            <div
              className="px-4 py-4 rounded-2xl"
              style={{ background: "rgba(183,124,255,0.06)", border: "1px solid rgba(183,124,255,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Brain size={14} className="text-violet-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-violet-400 font-bold">Ночной итог · Dream State</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Обработано", value: "23", sub: "заметок" },
                  { label: "Связей", value: "7", sub: "создано" },
                  { label: "Merged", value: "2", sub: "документа" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-mono text-[20px] font-black text-violet-400">{s.value}</div>
                    <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">{s.label}</div>
                    <div className="font-mono text-[9px] text-muted-foreground/30">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── EVENING REPORT ── */}
        {activeTab === "evening" && (
          <>
            {/* Header */}
            <div
              className="px-5 py-5 rounded-2xl"
              style={{ background: "rgba(183,124,255,0.07)", border: "1px solid rgba(183,124,255,0.18)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Moon size={18} className="text-violet-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-violet-400 font-bold">Вечерний отчёт</span>
              </div>
              <div className="text-[22px] font-black text-foreground mb-0.5">Итоги дня</div>
              <div className="font-mono text-[12px] text-muted-foreground/60">Среда, 18 февраля 2026 · 21:15</div>
            </div>

            {/* Done/Not done */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart2 size={14} className="text-primary" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Выполнение плана</span>
                </div>
                <span className="font-mono text-[13px] font-bold text-emerald-400">
                  {doneTasks.filter(t => t.done).length}/{doneTasks.length}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all"
                  style={{ width: `${(doneTasks.filter(t => t.done).length / doneTasks.length) * 100}%` }}
                />
              </div>
              <div className="space-y-2.5">
                {doneTasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${t.done ? "bg-primary border-primary" : "border border-white/10"}`} style={t.done ? {} : { background: "rgba(255,255,255,0.04)" }}>
                      {t.done ? <Check size={11} className="text-white" /> : <X size={9} className="text-muted-foreground/30" />}
                    </div>
                    <span className={`text-[13px] ${t.done ? "text-foreground" : "line-through text-muted-foreground/40"}`}>{t.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LLM Costs */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Расходы LLM</span>
                </div>
                <span className="font-mono text-[14px] font-black text-foreground">$0.34</span>
              </div>
              <div className="space-y-3">
                {llmCosts.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-muted-foreground/70">{m.model}</span>
                      <span className="font-mono text-[11px] text-foreground">{m.cost}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Efficiency */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} className="text-blue-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Эффективность</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "91%", label: "Fast path", color: "text-emerald-400" },
                  { value: "47", label: "Токен k", color: "text-blue-400" },
                  { value: "1.4s", label: "Avg latency", color: "text-foreground" },
                ].map((s, i) => (
                  <div key={i} className="px-3 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className={`font-mono text-[20px] font-black ${s.color}`}>{s.value}</div>
                    <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dream State plan */}
            <div
              className="px-4 py-4 rounded-2xl"
              style={{ background: "rgba(183,124,255,0.06)", border: "1px solid rgba(183,124,255,0.18)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Brain size={14} className="text-violet-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-violet-400 font-bold">Dream State · Ночной план</span>
              </div>
              <p className="font-mono text-[12px] text-foreground/70 leading-relaxed mb-3">
                Пока ты спишь, JARVIS обработает входящие, создаст связи в Zettelkasten и подготовит контекст для утренней сессии.
              </p>
              <div className="space-y-2">
                {[
                  "Обработать 5 инбокс-элементов",
                  "Слить «Анализ конкурентов» и «Стратегию маркетплейсов»",
                  "Обновить прогресс по задачам",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-violet-400 w-4 text-right">{i + 1}</span>
                    <span className="font-mono text-[12px] text-foreground/60">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BriefsView;
