import { useState } from "react";
import {
  Sun, ChevronRight, Clock, Package, Lightbulb,
  CheckSquare, Zap, Mic, Plus, X, Check, ArrowRight,
  TrendingUp, Brain, Sparkles
} from "lucide-react";

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

const todayTasks = [
  { id: "1", title: "Подготовить презентацию для инвесторов", done: false, agent: "АННА", priority: "high" },
  { id: "2", title: "Финализировать стратегию Q1 2026", done: false, agent: "ЯРВИС", priority: "critical" },
  { id: "3", title: "Ревью контент-плана на февраль", done: true, agent: "АННА", priority: "medium" },
  { id: "4", title: "Настройка интеграции CRM Bitrix24", done: false, agent: null, priority: "medium" },
  { id: "5", title: "Созвон с командой 15:00", done: false, agent: null, priority: "low" },
];

const activeCapsules = [
  { id: "1", title: "Пересмотр стратегии выхода", trigger: "Через 2 дня", type: "check", color: "text-primary" },
  { id: "2", title: "Анализ результатов рекламы", trigger: "Через 4 дня", type: "execute", color: "text-blue-400" },
  { id: "3", title: "Квартальный отчёт команды", trigger: "Через 7 дней", type: "remind", color: "text-emerald-400" },
];

const ideas = [
  { id: "1", title: "AI-ассистент для HR-онбординга", viability: 78, category: "SaaS", desc: "Автоматизация адаптации новых сотрудников через LLM-агента" },
  { id: "2", title: "Подписка на AI-команду B2B", viability: 91, category: "Бизнес", desc: "Команда специализированных агентов вместо найма фрилансеров" },
  { id: "3", title: "Персональный трекер нейросвязей", viability: 62, category: "Productivity", desc: "Граф знаний с автосвязями через Zettelkasten и LLM" },
];

const quickStats = [
  { label: "$0.34", sub: "LLM сегодня" },
  { label: "91%", sub: "Fast path" },
  { label: "8/12", sub: "Задач" },
  { label: "47", sub: "Zettels" },
];

const DashboardView = ({ onNavigate }: DashboardViewProps) => {
  const [currentIdeaIdx, setCurrentIdeaIdx] = useState(0);
  const [fabOpen, setFabOpen] = useState(false);
  const [swipeDir, setSwipeDir] = useState<null | "left" | "right">(null);

  const idea = ideas[currentIdeaIdx];

  const handleSwipe = (dir: "left" | "right") => {
    setSwipeDir(dir);
    setTimeout(() => {
      setSwipeDir(null);
      setCurrentIdeaIdx((i) => (i + 1) % ideas.length);
    }, 300);
  };

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide relative">
      <div className="px-4 pt-20 pb-28 space-y-4">

        {/* ── Brief Card ── */}
        <div
          style={{ background: "rgba(234,56,87,0.08)", border: "1px solid rgba(234,56,87,0.18)", borderRadius: "20px" }}
          className="px-5 py-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sun size={16} className="text-amber-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Утренний бриф</span>
              </div>
              <h2 className="text-[18px] font-bold text-foreground">Доброе утро, Ярослав!</h2>
              <p className="font-mono text-[11px] text-muted-foreground/60 mt-0.5">18 февраля 2026 · Среда</p>
            </div>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(234,56,87,0.15)" }}
            >
              <Sparkles size={20} className="text-primary" />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 pt-3 border-t border-white/5">
            <div className="text-center">
              <div className="font-mono text-[20px] font-black text-foreground">5</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">задач</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="font-mono text-[20px] font-black text-primary">2</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">капсулы</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="font-mono text-[20px] font-black text-emerald-400">91%</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">энергия</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("briefs")}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-primary font-mono text-[11px] tracking-widest uppercase font-bold hover:opacity-80 transition-opacity"
            style={{ background: "rgba(234,56,87,0.12)", border: "1px solid rgba(234,56,87,0.20)" }}
          >
            <span>Развернуть полный бриф</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-4 gap-2">
          {quickStats.map((s, i) => (
            <div key={i} style={glassCard} className="px-3 py-3 flex flex-col items-center gap-0.5">
              <span className="font-mono text-[16px] font-black text-foreground">{s.label}</span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50 text-center leading-tight">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* ── Today's Tasks ── */}
        <div style={glassCard} className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckSquare size={14} className="text-primary" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Задачи на сегодня</span>
            </div>
            <button
              onClick={() => onNavigate("tasks")}
              className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 hover:text-primary transition-colors"
            >
              Все <ChevronRight size={11} />
            </button>
          </div>
          <div className="space-y-2">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${task.done ? "bg-primary border-primary" : "border border-white/15"}`}
                  style={task.done ? {} : { background: "rgba(255,255,255,0.04)" }}
                >
                  {task.done && <Check size={11} className="text-white" />}
                </div>
                <span className={`flex-1 text-[13px] leading-snug ${task.done ? "line-through text-muted-foreground/40" : "text-foreground"}`}>
                  {task.title}
                </span>
                {task.agent && (
                  <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-primary border border-primary/25" style={{ background: "rgba(234,56,87,0.08)" }}>
                    {task.agent}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Active Capsules ── */}
        <div style={glassCard} className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package size={14} className="text-blue-400" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Активные капсулы</span>
            </div>
            <button
              onClick={() => onNavigate("capsules")}
              className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 hover:text-primary transition-colors"
            >
              Все <ChevronRight size={11} />
            </button>
          </div>
          <div className="space-y-2">
            {activeCapsules.map((cap) => (
              <div key={cap.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span className="flex-1 text-[13px] text-foreground">{cap.title}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <Clock size={10} className="text-muted-foreground/40" />
                  <span className="font-mono text-[10px] text-muted-foreground/50">{cap.trigger}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Idea Swipe ── */}
        {idea && (
          <div style={glassCard} className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-amber-400" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Идея дня</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">{currentIdeaIdx + 1}/{ideas.length}</span>
            </div>
            <div
              className="transition-all duration-300"
              style={{
                transform: swipeDir === "left" ? "translateX(-120%) rotate(-8deg)" : swipeDir === "right" ? "translateX(120%) rotate(8deg)" : "none",
                opacity: swipeDir ? 0 : 1,
              }}
            >
              <div className="px-4 py-4 rounded-xl mb-3" style={{ background: "rgba(234,87,56,0.06)", border: "1px solid rgba(255,165,0,0.12)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md text-amber-400" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                    {idea.category}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-400">{idea.viability}% viable</span>
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{idea.title}</h3>
                <p className="font-mono text-[11px] text-muted-foreground/60 leading-relaxed">{idea.desc}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleSwipe("left")}
                className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-destructive hover:opacity-80 transition-opacity"
                style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.15)" }}
              >
                <X size={13} /> Не сейчас
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase text-emerald-400 hover:opacity-80 transition-opacity"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
              >
                <Check size={13} /> Актуально
              </button>
            </div>
          </div>
        )}

        {/* ── JARVIS Insight ── */}
        <div
          className="px-4 py-4 rounded-2xl"
          style={{ background: "rgba(74,158,255,0.06)", border: "1px solid rgba(74,158,255,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain size={13} className="text-blue-400" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-blue-400 font-bold">JARVIS INSIGHT</span>
          </div>
          <p className="font-mono text-[12px] text-foreground/70 leading-relaxed">
            Сегодня высокая когнитивная нагрузка. Рекомендую перенести «Настройку CRM» на завтра и сфокусироваться на инвестиционной презентации.
          </p>
        </div>
      </div>

      {/* ── FAB ── */}
      <div className="fixed bottom-[88px] right-4 z-20 flex flex-col items-end gap-2">
        {fabOpen && (
          <div className="flex flex-col items-end gap-2 mb-1">
            {[
              { icon: <Mic size={16} />, label: "Голосовая", color: "text-primary" },
              { icon: <Lightbulb size={16} />, label: "Идея", color: "text-amber-400" },
              { icon: <CheckSquare size={16} />, label: "Задача", color: "text-emerald-400" },
              { icon: <Zap size={16} />, label: "Чат", color: "text-blue-400" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => { setFabOpen(false); if (item.label === "Задача") onNavigate("tasks"); if (item.label === "Чат") onNavigate("chat"); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:opacity-90 transition-all"
                style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span className={`font-mono text-[11px] tracking-widest uppercase text-foreground/70`}>{item.label}</span>
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

export default DashboardView;
