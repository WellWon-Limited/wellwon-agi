import { useState } from "react";
import {
  Users, Bot, ChevronRight, Clock, Zap, Star,
  TrendingUp, MessageSquare, CheckCircle2, RefreshCw,
  ToggleLeft, ToggleRight, Calendar, BarChart2
} from "lucide-react";

type ExpertTab = "experts" | "agents";

interface Expert {
  id: string;
  name: string;
  role: string;
  specialty: string;
  icon: string;
  tasksPerMonth: number;
  successRate: number;
  color: string;
  bg: string;
  border: string;
  bio: string;
  style: string;
  interactions: { date: string; summary: string }[];
}

interface Agent {
  id: string;
  name: string;
  description: string;
  cron: string;
  lastRun: string;
  nextRun: string;
  enabled: boolean;
  color: string;
}

const experts: Expert[] = [
  {
    id: "e1",
    name: "ЯРВИС",
    role: "Оркестратор",
    specialty: "Координация команды, приоритизация, стратегические решения",
    icon: "✦",
    tasksPerMonth: 142,
    successRate: 97,
    color: "text-primary",
    bg: "rgba(234,56,87,0.10)",
    border: "rgba(234,56,87,0.20)",
    bio: "Главный оркестратор системы. Управляет командой специализированных агентов, распределяет задачи по capability-матрице и обеспечивает согласованность всех процессов.",
    style: "Директивный, фокусированный на результате. Мыслит системно, предлагает альтернативы, не задаёт лишних вопросов.",
    interactions: [
      { date: "Сегодня", summary: "Приоритизировал 12 задач, назначил агентов, подготовил утренний бриф" },
      { date: "Вчера", summary: "Координировал создание контент-плана, проверил аналитику рекламы" },
    ],
  },
  {
    id: "e2",
    name: "АННА",
    role: "Контент-директор",
    specialty: "Тексты, SMM, рассылки, редакционные планы, копирайтинг",
    icon: "✍",
    tasksPerMonth: 58,
    successRate: 94,
    color: "text-rose-400",
    bg: "rgba(251,113,133,0.10)",
    border: "rgba(251,113,133,0.20)",
    bio: "Специализируется на контентной стратегии и создании материалов для всех каналов коммуникации. Понимает TOV бренда и адаптирует голос под аудиторию.",
    style: "Творческий, эмпатичный. Предлагает несколько вариантов, спрашивает о предпочтениях по тону.",
    interactions: [
      { date: "Сегодня", summary: "Создала 3 поста для Instagram, написала email-рассылку" },
      { date: "2 дня назад", summary: "Подготовила редакционный план на февраль (28 публикаций)" },
    ],
  },
  {
    id: "e3",
    name: "МАРК",
    role: "Аналитик данных",
    specialty: "Рыночная аналитика, прогнозы, конкурентный анализ, отчёты",
    icon: "📊",
    tasksPerMonth: 34,
    successRate: 91,
    color: "text-blue-400",
    bg: "rgba(74,158,255,0.10)",
    border: "rgba(74,158,255,0.20)",
    bio: "Работает с данными: собирает, структурирует, анализирует и визуализирует. Специализируется на конкурентном анализе и построении прогностических моделей.",
    style: "Точный, структурированный. Всегда даёт данные с источниками. Оговаривает допущения и ограничения.",
    interactions: [
      { date: "Сегодня", summary: "Завершает анализ конкурентов Q1 2026 (70% готовности)" },
      { date: "Неделю назад", summary: "Подготовил прогноз ROAS по рекламным кампаниям" },
    ],
  },
  {
    id: "e4",
    name: "ЕЛЕНА",
    role: "Маркетолог",
    specialty: "Рекламные кампании, A/B тесты, ROAS оптимизация",
    icon: "🎯",
    tasksPerMonth: 22,
    successRate: 89,
    color: "text-violet-400",
    bg: "rgba(183,124,255,0.10)",
    border: "rgba(183,124,255,0.20)",
    bio: "Управляет платным трафиком и оптимизирует конверсии. Работает с Яндекс, VK, Instagram. Специалист по A/B тестированию.",
    style: "Data-driven, методичный. Предлагает гипотезы с обоснованием, отчитывается по метрикам.",
    interactions: [
      { date: "3 дня назад", summary: "Оптимизировала кампании, ROAS вырос с 2.1 до 3.4" },
    ],
  },
];

const agentsData: Agent[] = [
  {
    id: "a1",
    name: "Morning Brief Builder",
    description: "Собирает утренний бриф: задачи, капсулы, энергия, приоритеты",
    cron: "Каждый день в 07:30",
    lastRun: "Сегодня, 07:31",
    nextRun: "Завтра, 07:30",
    enabled: true,
    color: "text-amber-400",
  },
  {
    id: "a2",
    name: "Inbox Processor",
    description: "Классифицирует инбокс, создаёт Zettel-заметки, назначает задачи",
    cron: "Каждые 2 часа",
    lastRun: "1 ч назад",
    nextRun: "Через 1 ч",
    enabled: true,
    color: "text-blue-400",
  },
  {
    id: "a3",
    name: "Competitive Monitor",
    description: "Следит за активностью конкурентов, новостями рынка",
    cron: "Каждый день в 09:00",
    lastRun: "Сегодня, 09:01",
    nextRun: "Завтра, 09:00",
    enabled: true,
    color: "text-emerald-400",
  },
  {
    id: "a4",
    name: "Dream State (ночная обработка)",
    description: "Ночная обработка: синтез заметок, создание связей, очистка инбокса",
    cron: "Каждую ночь в 02:00",
    lastRun: "Сегодня, 02:03",
    nextRun: "Завтра, 02:00",
    enabled: true,
    color: "text-violet-400",
  },
  {
    id: "a5",
    name: "Social Media Poster",
    description: "Публикует одобренный контент по расписанию редплана",
    cron: "По расписанию контент-плана",
    lastRun: "3 ч назад",
    nextRun: "Завтра, 10:00",
    enabled: false,
    color: "text-rose-400",
  },
];

const ExpertsView = () => {
  const [activeTab, setActiveTab] = useState<ExpertTab>("experts");
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [agentStates, setAgentStates] = useState<Record<string, boolean>>(
    Object.fromEntries(agentsData.map(a => [a.id, a.enabled]))
  );

  const expert = selectedExpert ? experts.find(e => e.id === selectedExpert) : null;

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Tabs */}
      <div className="shrink-0 px-4 pt-20 pb-3">
        <div
          className="flex items-center p-1"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "100px" }}
        >
          {([
            { id: "experts", label: "Эксперты", icon: <Users size={13} /> },
            { id: "agents", label: "Агенты", icon: <Bot size={13} /> },
          ] as { id: ExpertTab; label: string; icon: React.ReactNode }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedExpert(null); }}
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

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">

        {/* EXPERTS LIST */}
        {activeTab === "experts" && !expert && (
          <div className="space-y-3">
            {experts.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedExpert(e.id)}
                className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-[0.99]"
                style={glassCard}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-[20px] shrink-0"
                    style={{ background: e.bg, border: `1px solid ${e.border}` }}
                  >
                    {e.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-mono text-[14px] font-black tracking-widest ${e.color}`}>{e.name}</span>
                      <ChevronRight size={14} className="text-muted-foreground/30" />
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground/60 mb-2">{e.role}</div>
                    <p className="text-[12px] text-foreground/60 leading-snug line-clamp-2 mb-3">{e.specialty}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Zap size={10} className="text-muted-foreground/40" />
                        <span className="font-mono text-[10px] text-muted-foreground/50">{e.tasksPerMonth} задач/мес</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star size={10} className="text-amber-400/60" />
                        <span className="font-mono text-[10px] text-amber-400/70">{e.successRate}% успех</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* EXPERT DETAIL */}
        {activeTab === "experts" && expert && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedExpert(null)}
              className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronRight size={12} className="rotate-180" /> Назад
            </button>

            {/* Header */}
            <div
              className="px-5 py-5 rounded-2xl"
              style={{ background: expert.bg, border: `1px solid ${expert.border}` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[28px]"
                  style={{ background: "rgba(0,0,0,0.2)" }}
                >
                  {expert.icon}
                </div>
                <div>
                  <div className={`font-mono text-[20px] font-black tracking-widest mb-0.5 ${expert.color}`}>{expert.name}</div>
                  <div className="font-mono text-[12px] text-muted-foreground/60">{expert.role}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Zap size={12} />, value: `${expert.tasksPerMonth}`, label: "задач/мес" },
                  { icon: <Star size={12} />, value: `${expert.successRate}%`, label: "успешность" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <span className={expert.color}>{s.icon}</span>
                    <div>
                      <div className="font-mono text-[14px] font-black text-foreground">{s.value}</div>
                      <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div style={glassCard} className="px-4 py-4">
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-2">О эксперте</div>
              <p className="text-[13px] text-foreground/80 leading-relaxed">{expert.bio}</p>
            </div>

            {/* Style */}
            <div style={glassCard} className="px-4 py-4">
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-2">Стиль общения</div>
              <p className="font-mono text-[12px] text-foreground/70 leading-relaxed">{expert.style}</p>
            </div>

            {/* Interactions */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} className="text-muted-foreground/50" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">История</span>
              </div>
              <div className="space-y-3">
                {expert.interactions.map((i, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary/50 mt-1 shrink-0" />
                      {idx < expert.interactions.length - 1 && <div className="w-px flex-1 bg-white/5 mt-1" />}
                    </div>
                    <div className="pb-2">
                      <div className="font-mono text-[10px] text-muted-foreground/40 mb-0.5">{i.date}</div>
                      <div className="text-[13px] text-foreground/70 leading-snug">{i.summary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase hover:opacity-80 transition-opacity"
              style={{ background: expert.bg, border: `1px solid ${expert.border}`, color: expert.color.replace("text-", "") }}
            >
              <MessageSquare size={13} /> Написать {expert.name}
            </button>
          </div>
        )}

        {/* BACKGROUND AGENTS */}
        {activeTab === "agents" && (
          <div className="space-y-3">
            <p className="font-mono text-[11px] text-muted-foreground/50 mb-3">
              {Object.values(agentStates).filter(Boolean).length} из {agentsData.length} агентов активны
            </p>

            {agentsData.map(agent => {
              const on = agentStates[agent.id];
              return (
                <div
                  key={agent.id}
                  className="px-4 py-4 rounded-2xl transition-all"
                  style={{
                    background: on ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                    border: on ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
                    opacity: on ? 1 : 0.6,
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-mono text-[13px] font-bold ${on ? agent.color : "text-muted-foreground/50"}`}>
                          {agent.name}
                        </span>
                        {on && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground/50 leading-relaxed">{agent.description}</p>
                    </div>
                    <button
                      onClick={() => setAgentStates(prev => ({ ...prev, [agent.id]: !prev[agent.id] }))}
                      className="shrink-0 transition-colors"
                    >
                      {on
                        ? <ToggleRight size={28} className="text-emerald-400" />
                        : <ToggleLeft size={28} className="text-muted-foreground/30" />
                      }
                    </button>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <RefreshCw size={10} className="text-muted-foreground/30" />
                      <span className="font-mono text-[10px] text-muted-foreground/40">{agent.cron}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/30">Последний</div>
                      <div className="font-mono text-[10px] text-muted-foreground/50">{agent.lastRun}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/30">Следующий</div>
                      <div className={`font-mono text-[10px] ${on ? agent.color : "text-muted-foreground/30"}`}>{on ? agent.nextRun : "Отключён"}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertsView;
