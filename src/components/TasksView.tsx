import { useState } from "react";
import {
  Plus, CheckSquare, Zap, Users, Brain, Globe,
  Clock, Sparkles, Mic, MoreHorizontal, Flag, Calendar,
  Tag, Circle, CircleDot, CircleCheck, AlertCircle, Cpu,
  Search, Filter, ArrowUp, ChevronRight, X, Check, ArrowUpRight,
  Star, Bot, Timer
} from "lucide-react";

/* ─── Types ─── */
type Priority = "critical" | "high" | "medium" | "low";
type Status = "inbox" | "next" | "waiting" | "someday" | "done";
type TaskTab = "board" | "queue" | "agents";

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "working" | "idle";
  tasks: number;
  specialty: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  stars: number; // 1-3
  agent?: string;
  expertType?: "agent" | "expert";
  tags: string[];
  dueTime?: string;
  subtasks?: { title: string; done: boolean }[];
}

/* ─── Mock data ─── */
const agents: Agent[] = [
  { id: "jarvis", name: "JARVIS", role: "Оркестратор", avatar: "JR", status: "online", tasks: 4, specialty: "Управляет командой, приоритизирует задачи, координирует агентов" },
  { id: "anna", name: "АННА", role: "Контент-агент", avatar: "АН", status: "working", tasks: 2, specialty: "Тексты, SMM, рассылки, редакционные планы" },
  { id: "mark", name: "МАРК", role: "Аналитик данных", avatar: "МР", status: "working", tasks: 1, specialty: "Рыночная аналитика, отчёты, прогнозы, конкуренты" },
  { id: "elena", name: "ЕЛЕНА", role: "Маркетолог", avatar: "ЕЛ", status: "idle", tasks: 0, specialty: "Рекламные кампании, A/B тесты, ROAS оптимизация" },
  { id: "dev", name: "ДЕВ", role: "Разработчик", avatar: "ДВ", status: "idle", tasks: 0, specialty: "API интеграции, автоматизация, скрипты" },
];

const tasks: Task[] = [
  {
    id: "t1",
    title: "Рекламный пост для Instagram",
    description: "Написать и оформить пост с изображениями для продвижения нового продукта",
    status: "next",
    priority: "high",
    stars: 3,
    agent: "anna",
    expertType: "agent",
    tags: ["SMM", "Контент"],
    dueTime: "15 мин",
    subtasks: [
      { title: "Текстовый пост", done: true },
      { title: "Баннер для соцсетей", done: false },
      { title: "Отчет по бюджету", done: false },
    ],
  },
  {
    id: "t2",
    title: "Анализ конкурентов Q1 2026",
    description: "Глубокий анализ рыночной позиции топ-5 конкурентов с прогнозом на квартал",
    status: "next",
    priority: "critical",
    stars: 3,
    agent: "mark",
    expertType: "expert",
    tags: ["Аналитика", "Стратегия"],
    dueTime: "2 ч",
  },
  {
    id: "t3",
    title: "Настройка интеграции CRM",
    description: "Подключить Bitrix24 через API и настроить синхронизацию лидов",
    status: "inbox",
    priority: "medium",
    stars: 2,
    tags: ["Интеграции", "Dev"],
    dueTime: "Завтра",
  },
  {
    id: "t4",
    title: "Еженедельный дайджест команды",
    description: "Собрать ключевые метрики и подготовить отчёт для стратегического созвона",
    status: "inbox",
    priority: "low",
    stars: 1,
    agent: "jarvis",
    expertType: "agent",
    tags: ["Отчёт"],
  },
  {
    id: "t5",
    title: "Контент-план на февраль",
    description: "Составить редакционный план на месяц с распределением по каналам",
    status: "waiting",
    priority: "high",
    stars: 2,
    agent: "anna",
    expertType: "agent",
    tags: ["Контент", "Планирование"],
    dueTime: "На проверке",
  },
  {
    id: "t6",
    title: "Оптимизация рекламных кампаний",
    description: "A/B тест креативов, корректировка ставок, анализ ROAS",
    status: "done",
    priority: "medium",
    stars: 2,
    agent: "elena",
    expertType: "expert",
    tags: ["Реклама"],
  },
  {
    id: "t7",
    title: "Исследование рынка EdTech",
    description: "Анализ трендов и конкурентного ландшафта для стратегического решения",
    status: "someday",
    priority: "low",
    stars: 1,
    tags: ["Исследование"],
  },
];

/* ─── Helpers ─── */
const priorityConfig: Record<Priority, { label: string; color: string }> = {
  critical: { label: "КРИТИЧНО", color: "text-destructive" },
  high: { label: "ВЫСОКИЙ", color: "text-primary" },
  medium: { label: "СРЕДНИЙ", color: "text-muted-foreground" },
  low: { label: "НИЗКИЙ", color: "text-muted-foreground/50" },
};

const statusConfig: Record<Status, { label: string; icon: React.ReactNode; accentColor: string }> = {
  inbox: { label: "Inbox", icon: <Circle size={13} />, accentColor: "rgba(255,255,255,0.15)" },
  next: { label: "Next", icon: <CircleDot size={13} className="text-primary" />, accentColor: "rgba(234,56,87,0.20)" },
  waiting: { label: "Waiting", icon: <Clock size={13} className="text-amber-400" />, accentColor: "rgba(251,191,36,0.20)" },
  someday: { label: "Someday", icon: <Star size={13} className="text-blue-400" />, accentColor: "rgba(74,158,255,0.20)" },
  done: { label: "Done", icon: <CircleCheck size={13} className="text-emerald-400" />, accentColor: "rgba(16,185,129,0.15)" },
};

const StarRating = ({ stars }: { stars: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 3 }).map((_, i) => (
      <Star
        key={i}
        size={10}
        className={i < stars ? "text-amber-400" : "text-muted-foreground/20"}
        fill={i < stars ? "currentColor" : "none"}
      />
    ))}
  </div>
);

/* ─── TaskCard ─── */
const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => {
  const agent = agents.find((a) => a.id === task.agent);

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-4 transition-all active:scale-[0.99] hover:border-primary/20"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-[14px] text-foreground leading-snug line-clamp-2 text-left flex-1">
          {task.title}
        </span>
        <StarRating stars={task.stars} />
      </div>

      <p className="font-mono text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2 text-left">
        {task.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {task.tags.slice(0, 2).map((t) => (
            <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {agent && task.expertType === "agent" && (
            <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-blue-400" style={{ background: "rgba(74,158,255,0.12)", border: "1px solid rgba(74,158,255,0.20)" }}>
              {agent.name}
            </span>
          )}
          {agent && task.expertType === "expert" && (
            <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-violet-400" style={{ background: "rgba(183,124,255,0.12)", border: "1px solid rgba(183,124,255,0.20)" }}>
              {agent.name}
            </span>
          )}
          {task.dueTime && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/60">
              <Clock size={9} />
              {task.dueTime}
            </span>
          )}
        </div>
      </div>

      {task.subtasks && (
        <div className="mt-3 pt-2.5 border-t border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Подзадачи</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(task.subtasks.filter((s) => s.done).length / task.subtasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </button>
  );
};

/* ─── AgentCard ─── */
const AgentCard = ({ agent }: { agent: Agent }) => {
  const statusDot: Record<Agent["status"], string> = {
    online: "bg-emerald-400 animate-pulse",
    working: "bg-primary animate-pulse",
    idle: "bg-muted-foreground/40",
  };
  const statusLabel: Record<Agent["status"], string> = {
    online: "Online",
    working: "Работает",
    idle: "Ожидает",
  };

  return (
    <div
      className="flex items-start gap-3 px-4 py-4 rounded-2xl"
      style={{
        background: agent.status !== "idle" ? "rgba(234,56,87,0.05)" : "rgba(255,255,255,0.04)",
        border: agent.status !== "idle" ? "1px solid rgba(234,56,87,0.15)" : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-[13px] font-bold" style={{ background: "rgba(234,56,87,0.15)", border: "1px solid rgba(234,56,87,0.25)", color: "hsl(var(--primary))" }}>
          {agent.avatar}
        </div>
        <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${statusDot[agent.status]}`} style={{ borderColor: "hsl(var(--background))" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="font-mono text-[13px] font-bold tracking-widest text-foreground">{agent.name}</div>
          <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-emerald-400" style={{ background: agent.status !== "idle" ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.05)" }}>
            {statusLabel[agent.status]}
          </span>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground mb-1">{agent.role}</div>
        <p className="font-mono text-[10px] text-muted-foreground/50 leading-relaxed">{agent.specialty}</p>
        {agent.tasks > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <Timer size={9} className="text-primary/60" />
            <span className="font-mono text-[10px] text-primary/60">{agent.tasks} задач в работе</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── TaskDetail ─── */
const TaskDetail = ({ task, onClose }: { task: Task; onClose: () => void }) => {
  const pri = priorityConfig[task.priority];
  const sta = statusConfig[task.status];
  const agent = agents.find((a) => a.id === task.agent);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[hsl(240,10%,5%)]">
      <div className="fixed inset-0 opacity-60 -z-10" onClick={onClose} style={{ background: "rgba(0,0,0,0.6)" }} />
      <div className="flex flex-col h-full bg-[hsl(240,10%,6%)] border-l border-white/5 w-full md:w-[360px] ml-auto overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-white/5 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span>{sta.icon}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{sta.label}</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
              <X size={16} />
            </button>
          </div>
          <h2 className="text-[16px] font-bold text-foreground leading-snug mb-2">{task.title}</h2>
          <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{task.description}</p>
        </div>

        <div className="px-5 py-4 border-b border-white/5 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Приоритет</span>
            <div className="flex items-center gap-2">
              <StarRating stars={task.stars} />
              <span className={`font-mono text-[11px] font-bold ${pri.color}`}>{pri.label}</span>
            </div>
          </div>
          {agent && (
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Агент</span>
              <span className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg ${task.expertType === "expert" ? "text-violet-400" : "text-blue-400"}`}
                style={{ background: task.expertType === "expert" ? "rgba(183,124,255,0.12)" : "rgba(74,158,255,0.12)", border: task.expertType === "expert" ? "1px solid rgba(183,124,255,0.20)" : "1px solid rgba(74,158,255,0.20)" }}>
                {agent.name} · {agent.role}
              </span>
            </div>
          )}
          {task.dueTime && (
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Срок</span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-foreground">
                <Calendar size={11} />{task.dueTime}
              </span>
            </div>
          )}
        </div>

        {task.subtasks && (
          <div className="px-5 py-4 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={13} className="text-primary" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground font-bold">
                Подзадачи · {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {task.subtasks.map((sub, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${sub.done ? "bg-primary border-primary" : "border-border"}`}>
                    {sub.done && <Check size={10} className="text-white" />}
                  </div>
                  <span className={`text-[13px] ${sub.done ? "line-through text-muted-foreground/50" : "text-foreground"}`}>
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-5 py-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-primary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground font-bold">История</span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Задача создана", sub: "JARVIS присвоил приоритет", time: "14:20" },
              { label: "Агент назначен", sub: `${agent?.name ?? "—"} взял задачу в работу`, time: "14:22" },
              { label: "Прогресс обновлён", sub: "Текстовый пост готов", time: "15:11" },
            ].map((e, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary/60 mt-1 shrink-0" />
                  {i < 2 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-2 min-w-0">
                  <div className="text-[13px] font-semibold text-foreground">{e.label}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{e.sub}</div>
                  <div className="font-mono text-[10px] text-muted-foreground/40 mt-0.5">{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-6 pt-3 border-t border-white/5 flex gap-2.5 shrink-0">
          <button className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-mono text-[12px] tracking-widest uppercase font-bold flex items-center justify-center gap-2">
            <Check size={14} /> Принять
          </button>
          <button className="flex-1 py-3 rounded-2xl font-mono text-[12px] tracking-widest uppercase flex items-center justify-center gap-2 text-muted-foreground" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <X size={13} /> На доработку
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Agent Queue Tab ─── */
const AgentQueueTab = () => {
  const activeTasks = tasks.filter(t => t.status === "next" && t.agent);
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4 scrollbar-hide">
      <div className="flex items-center gap-2 pt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
          {activeTasks.length} задач в очереди агентов
        </span>
      </div>
      {agents.filter(a => a.status !== "idle").map(agent => {
        const agentTasks = tasks.filter(t => t.agent === agent.id && t.status === "next");
        return (
          <div key={agent.id}>
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold text-primary" style={{ background: "rgba(234,56,87,0.15)" }}>
                {agent.avatar}
              </div>
              <span className="font-mono text-[11px] font-bold text-foreground">{agent.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground/50">· {agent.role}</span>
              {agent.status === "working" && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse ml-auto" />}
            </div>
            <div className="space-y-2">
              {agentTasks.map(task => (
                <div key={task.id} className="px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] text-foreground leading-snug flex-1">{task.title}</span>
                    <StarRating stars={task.stars} />
                  </div>
                  {task.dueTime && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock size={9} className="text-muted-foreground/40" />
                      <span className="font-mono text-[10px] text-muted-foreground/50">{task.dueTime}</span>
                    </div>
                  )}
                </div>
              ))}
              {agentTasks.length === 0 && (
                <div className="px-4 py-3 rounded-xl text-center font-mono text-[11px] text-muted-foreground/30" style={{ border: "1px dashed rgba(255,255,255,0.07)" }}>
                  Нет задач
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Main TasksView ─── */
const TasksView = () => {
  const [activeTab, setActiveTab] = useState<TaskTab>("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns: { status: Status }[] = [
    { status: "inbox" },
    { status: "next" },
    { status: "waiting" },
    { status: "someday" },
    { status: "done" },
  ];

  const tabs: { id: TaskTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "board", label: "Задачи", icon: <CheckSquare size={14} />, count: tasks.filter(t => t.status !== "done").length },
    { id: "queue", label: "Очередь", icon: <Bot size={14} />, count: tasks.filter(t => t.agent && t.status === "next").length },
    { id: "agents", label: "Команда", icon: <Users size={14} />, count: agents.filter(a => a.status !== "idle").length },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full">
      {/* Header */}
      <div className="shrink-0 px-4 md:px-6 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Cpu size={13} className="text-primary" />
            </div>
            <h1 className="text-[18px] md:text-[22px] font-black tracking-tight text-foreground whitespace-nowrap">
              Командный <span className="text-primary">Центр</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground font-mono text-[11px] tracking-widest uppercase hover:opacity-90 transition-opacity">
              <Plus size={12} />
              <span className="hidden sm:inline">Задача</span>
            </button>
          </div>
        </div>

        <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-3">
          {tasks.filter(t => t.status === "next").length} в работе · {agents.filter(a => a.status !== "idle").length} агентов активны
        </div>

        {/* Tabs */}
        <div
          className="flex items-center p-1"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "100px" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] tracking-widest uppercase transition-all rounded-full flex-1 justify-center"
              style={activeTab === tab.id ? {
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 700,
              } : { color: "rgba(255,255,255,0.4)" }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                  style={activeTab === tab.id
                    ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }
                  }
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* BOARD TAB — horizontal kanban */}
        {activeTab === "board" && (
          <>
            <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-6 scrollbar-hide">
              <div className="flex gap-3 h-full min-w-max">
                {columns.map(({ status }) => {
                  const cfg = statusConfig[status];
                  const colTasks = tasks.filter(t => t.status === status);
                  return (
                    <div key={status} className="flex flex-col w-[260px] shrink-0 h-full">
                      <div className="flex items-center gap-2 mb-3 px-1">
                        {cfg.icon}
                        <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">{cfg.label}</span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-lg text-muted-foreground" style={{ background: "rgba(255,255,255,0.06)" }}>
                          {colTasks.length}
                        </span>
                        <button className="ml-auto w-5 h-5 rounded-md flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors">
                          <Plus size={11} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-hide pr-1">
                        {colTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                          />
                        ))}
                        {colTasks.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-20 rounded-2xl text-muted-foreground/30" style={{ border: "2px dashed rgba(255,255,255,0.08)" }}>
                            <span className="font-mono text-[10px] tracking-widest uppercase">Пусто</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {selectedTask && (
              <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}
          </>
        )}

        {/* AGENT QUEUE TAB */}
        {activeTab === "queue" && <AgentQueueTab />}

        {/* AGENTS TAB */}
        {activeTab === "agents" && (
          <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-hide space-y-5">
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                  Команда JARVIS · {agents.length} агентов
                </span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] tracking-widest uppercase text-primary transition-colors" style={{ background: "rgba(234,56,87,0.10)", border: "1px solid rgba(234,56,87,0.20)" }}>
                <Plus size={11} /> Нанять
              </button>
            </div>
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksView;
