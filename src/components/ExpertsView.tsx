import { useState } from "react";
import {
  Users, Bot, ChevronRight, Clock, Zap, Star,
  MessageSquare, RefreshCw,
  ToggleLeft, ToggleRight, BarChart2, Sparkles, PenLine, Target,
  DollarSign, Code2, Scale, Plus
} from "lucide-react";

type ExpertTab = "experts" | "agents";

interface ExpertsViewProps {
  onNavigate?: (view: string) => void;
}

interface Expert {
  id: string;
  name: string;
  role: string;
  specialty: string;
  icon: React.ReactNode;
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
    name: "Финансист",
    role: "Финансовый директор",
    specialty: "Финансовый анализ, бюджеты, инвестиции, P&L",
    icon: <DollarSign size={20} />,
    tasksPerMonth: 42,
    successRate: 97,
    color: "text-emerald-400",
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.20)",
    bio: "Специализируется на финансовом анализе и стратегическом планировании. Анализирует P&L, строит прогнозы, контролирует бюджеты.",
    style: "Точный, данные-ориентированный. Всегда со ссылками на метрики.",
    interactions: [
      { date: "Сегодня", summary: "Подготовил финансовый отчёт Q1, выявил 3 зоны оптимизации" },
      { date: "Вчера", summary: "Проанализировал ROI рекламных кампаний" },
    ],
  },
  {
    id: "e2",
    name: "Стратег",
    role: "Стратегический директор",
    specialty: "Стратегия, конкурентный анализ, рыночное позиционирование",
    icon: <Sparkles size={20} />,
    tasksPerMonth: 34,
    successRate: 94,
    color: "text-primary",
    bg: "rgba(234,56,87,0.10)",
    border: "rgba(234,56,87,0.20)",
    bio: "Главный оркестратор системы. Управляет командой, распределяет задачи, обеспечивает согласованность всех процессов.",
    style: "Директивный, фокусированный на результате. Мыслит системно.",
    interactions: [
      { date: "Сегодня", summary: "Приоритизировал 12 задач, подготовил утренний бриф" },
      { date: "Вчера", summary: "Координировал создание контент-плана" },
    ],
  },
  {
    id: "e3",
    name: "Маркетолог",
    role: "CMO",
    specialty: "Рекламные кампании, A/B тесты, ROAS, brand",
    icon: <Target size={20} />,
    tasksPerMonth: 58,
    successRate: 91,
    color: "text-violet-400",
    bg: "rgba(183,124,255,0.10)",
    border: "rgba(183,124,255,0.20)",
    bio: "Управляет платным трафиком и оптимизирует конверсии. Работает с Яндекс, VK, Instagram.",
    style: "Data-driven, методичный. Предлагает гипотезы с обоснованием.",
    interactions: [
      { date: "3 дня назад", summary: "Оптимизировала кампании, ROAS вырос с 2.1 до 3.4" },
    ],
  },
  {
    id: "e4",
    name: "Коуч",
    role: "Бизнес-коуч",
    specialty: "Личная эффективность, декомпозиция целей, фокус",
    icon: <PenLine size={20} />,
    tasksPerMonth: 22,
    successRate: 89,
    color: "text-amber-400",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.20)",
    bio: "Помогает структурировать цели и повышать личную эффективность. Специализируется на декомпозиции сложных задач.",
    style: "Эмпатичный, вдохновляющий. Задаёт правильные вопросы.",
    interactions: [
      { date: "Сегодня", summary: "Провёл утренний check-in, помог расставить приоритеты дня" },
      { date: "2 дня назад", summary: "Декомпозировал квартальные цели на недельные спринты" },
    ],
  },
  {
    id: "e5",
    name: "Юрист",
    role: "Legal Counsel",
    specialty: "Договоры, риски, compliance, интеллектуальная собственность",
    icon: <Scale size={20} />,
    tasksPerMonth: 18,
    successRate: 96,
    color: "text-orange-400",
    bg: "rgba(251,146,60,0.10)",
    border: "rgba(251,146,60,0.20)",
    bio: "Специализируется на правовой защите бизнеса: договоры, риски, compliance, IP. Предупреждает юридические проблемы до их возникновения.",
    style: "Точный, консервативный. Всегда указывает на риски и альтернативы.",
    interactions: [
      { date: "Вчера", summary: "Проверил договор с партнёром, выявил 2 критических пункта" },
    ],
  },
  {
    id: "e6",
    name: "Разработчик",
    role: "CTO / Tech Lead",
    specialty: "Код, архитектура, API-интеграции, автоматизация",
    icon: <Code2 size={20} />,
    tasksPerMonth: 31,
    successRate: 93,
    color: "text-cyan-400",
    bg: "rgba(34,211,238,0.10)",
    border: "rgba(34,211,238,0.20)",
    bio: "Решает технические задачи: пишет код, проектирует архитектуру, интегрирует API, автоматизирует процессы.",
    style: "Прагматичный, решение-ориентированный. Предлагает несколько технических вариантов.",
    interactions: [
      { date: "Сегодня", summary: "Настраивает интеграцию CRM через Bitrix24 API" },
      { date: "3 дня назад", summary: "Автоматизировал сбор аналитики через Python-скрипт" },
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

const ExpertsView = ({ onNavigate }: ExpertsViewProps) => {
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
      {/* Tabs + Add button */}
      <div className="shrink-0 px-4 pt-20 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center p-1 flex-1"
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
          {activeTab === "experts" && !expert && (
            <button
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-full font-mono text-[11px] tracking-widest uppercase text-primary shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "rgba(234,56,87,0.12)", border: "1px solid rgba(234,56,87,0.22)" }}
            >
              <Plus size={12} /> Add
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">

        {/* EXPERTS GRID 2 cols */}
        {activeTab === "experts" && !expert && (
          <div className="grid grid-cols-2 gap-3">
            {experts.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedExpert(e.id)}
                className="text-left px-3 py-4 rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] flex flex-col"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${e.border}`, borderLeft: `3px solid ${e.border.replace("0.20", "0.60")}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shrink-0"
                  style={{ background: e.bg, border: `1px solid ${e.border}` }}
                >
                  <span className={e.color}>{e.icon}</span>
                </div>
                <div className={`font-mono text-[13px] font-black tracking-widest mb-0.5 ${e.color}`}>{e.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground/50 mb-2 leading-snug">{e.role}</div>
                <div className="mt-auto space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground/40">задач/мес</span>
                    <span className="font-mono text-[11px] font-bold text-foreground">{e.tasksPerMonth}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${e.successRate}%`, background: e.border.replace("0.20", "0.80") }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground/40">успех</span>
                    <span className={`font-mono text-[11px] font-bold ${e.color}`}>{e.successRate}%</span>
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
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-[32px] shrink-0"
                  style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${expert.border}` }}
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
              onClick={() => onNavigate?.("chat")}
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase hover:opacity-80 transition-opacity"
              style={{ background: expert.bg, border: `1px solid ${expert.border}` }}
            >
              <MessageSquare size={13} className={expert.color} /> <span className={expert.color}>Написать {expert.name}</span>
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
