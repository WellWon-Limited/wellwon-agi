import { useState } from "react";
import {
  Plus, CheckSquare, Zap, Users, Brain, Globe,
  Clock, Sparkles, Mic, MoreHorizontal, Flag, Calendar,
  Tag, Circle, CircleDot, CircleCheck, AlertCircle, Cpu,
  Search, Filter, ArrowUp, ChevronRight, X, Check, ArrowUpRight
} from "lucide-react";

/* ─── Types ─── */
type Priority = "critical" | "high" | "medium" | "low";
type Status = "backlog" | "active" | "review" | "done";

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
  agent?: string;
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
    status: "active",
    priority: "high",
    agent: "anna",
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
    status: "active",
    priority: "critical",
    agent: "mark",
    tags: ["Аналитика", "Стратегия"],
    dueTime: "2 ч",
  },
  {
    id: "t3",
    title: "Настройка интеграции CRM",
    description: "Подключить Bitrix24 через API и настроить синхронизацию лидов",
    status: "backlog",
    priority: "medium",
    tags: ["Интеграции", "Dev"],
    dueTime: "Завтра",
  },
  {
    id: "t4",
    title: "Еженедельный дайджест команды",
    description: "Собрать ключевые метрики и подготовить отчёт для стратегического созвона",
    status: "backlog",
    priority: "low",
    agent: "jarvis",
    tags: ["Отчёт"],
  },
  {
    id: "t5",
    title: "Контент-план на февраль",
    description: "Составить редакционный план на месяц с распределением по каналам",
    status: "review",
    priority: "high",
    agent: "anna",
    tags: ["Контент", "Планирование"],
    dueTime: "На проверке",
  },
  {
    id: "t6",
    title: "Оптимизация рекламных кампаний",
    description: "A/B тест креативов, корректировка ставок, анализ ROAS",
    status: "done",
    priority: "medium",
    agent: "elena",
    tags: ["Реклама"],
  },
];


/* ─── Helpers ─── */
const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
  critical: { label: "КРИТИЧНО", color: "text-destructive", dot: "bg-destructive" },
  high: { label: "ВЫСОКИЙ", color: "text-primary", dot: "bg-primary" },
  medium: { label: "СРЕДНИЙ", color: "text-muted-foreground", dot: "bg-muted-foreground" },
  low: { label: "НИЗКИЙ", color: "text-muted-foreground/50", dot: "bg-muted-foreground/50" },
};

const statusConfig: Record<Status, { label: string; icon: React.ReactNode; bg: string; border: string }> = {
  backlog: { label: "Бэклог", icon: <Circle size={13} />, bg: "bg-secondary", border: "border-border" },
  active: { label: "В работе", icon: <CircleDot size={13} className="text-primary" />, bg: "bg-primary/10", border: "border-primary/25" },
  review: { label: "На проверке", icon: <AlertCircle size={13} className="text-foreground/60" />, bg: "bg-secondary", border: "border-muted-foreground/30" },
  done: { label: "Готово", icon: <CircleCheck size={13} className="text-foreground/40" />, bg: "bg-muted", border: "border-muted-foreground/20" },
};

const agentColor: Record<string, string> = {
  jarvis: "bg-primary/20 text-primary border-primary/30",
  anna: "bg-accent/20 text-accent border-accent/30",
  mark: "bg-secondary text-secondary-foreground border-border",
  elena: "bg-muted text-muted-foreground border-border",
  dev: "bg-card text-foreground border-border",
};

/* ─── TaskCard ─── */
const TaskCard = ({ task, onClick, compact }: { task: Task; onClick: () => void; compact?: boolean }) => {
  const pri = priorityConfig[task.priority];
  const sta = statusConfig[task.status];
  const agent = agents.find((a) => a.id === task.agent);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card border-2 ${sta.border} rounded-2xl p-4 hover:bg-card/80 transition-all group active:scale-[0.99]`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`${sta.bg} rounded-lg p-1.5 flex items-center justify-center shrink-0`}>
            {sta.icon}
          </span>
          <span className="font-semibold text-[14px] text-foreground leading-snug line-clamp-2 text-left">
            {task.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className={`w-2 h-2 rounded-full ${pri.dot} shrink-0`} />
        </div>
      </div>

      {!compact && (
        <p className="font-mono text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2 text-left">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {task.tags.slice(0, 2).map((t) => (
            <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {agent && (
            <span className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md border ${agentColor[agent.id]}`}>
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
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
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
    <div className={`flex items-start gap-3 px-4 py-4 bg-card border-2 rounded-2xl transition-all cursor-pointer hover:border-primary/30 group ${
      agent.status !== "idle" ? "border-primary/15" : "border-border"
    }`}>
      <div className="relative shrink-0">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono text-[13px] font-bold border-2 ${agentColor[agent.id]}`}>
          {agent.avatar}
        </div>
        <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${statusDot[agent.status]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="font-mono text-[13px] font-bold tracking-widest text-foreground">{agent.name}</div>
          <div className="flex items-center gap-1.5">
            <span className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md border ${agentColor[agent.id]}`}>
              {statusLabel[agent.status]}
            </span>
            {agent.tasks > 0 && (
              <span className="font-mono text-[10px] text-primary font-bold">{agent.tasks}</span>
            )}
          </div>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground mb-1.5 tracking-wide">{agent.role}</div>
        <p className="font-mono text-[10px] text-muted-foreground/50 leading-relaxed">{agent.specialty}</p>
      </div>
    </div>
  );
};

/* ─── TaskDetail (drawer-style on mobile) ─── */
const TaskDetail = ({ task, onClose }: { task: Task; onClose: () => void }) => {
  const pri = priorityConfig[task.priority];
  const sta = statusConfig[task.status];
  const agent = agents.find((a) => a.id === task.agent);

  return (
    <div className="fixed inset-0 z-40 md:relative md:inset-auto flex flex-col md:h-full bg-[hsl(240,10%,5%)] border-l border-border md:w-[360px] md:shrink-0 md:static">
      {/* Mobile overlay backdrop */}
      <div className="fixed inset-0 bg-background/60 md:hidden -z-10" onClick={onClose} />

      {/* Panel */}
      <div className="flex flex-col h-full bg-[hsl(240,10%,6%)] md:border-l border-white/5 w-full md:w-[360px] ml-auto overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-white/5 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`${sta.bg} rounded-lg p-1.5`}>{sta.icon}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{sta.label}</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>
          <h2 className="text-[16px] font-bold text-foreground leading-snug mb-2">{task.title}</h2>
          <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{task.description}</p>
        </div>

        {/* Meta */}
        <div className="px-5 py-4 border-b border-white/5 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Приоритет</span>
            <span className={`flex items-center gap-1.5 font-mono text-[11px] font-bold ${pri.color}`}>
              <Flag size={11} />{pri.label}
            </span>
          </div>
          {agent && (
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Агент</span>
              <span className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg border ${agentColor[agent.id]}`}>
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
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 mt-0.5">Теги</span>
            <div className="flex flex-wrap gap-1 justify-end">
              {task.tags.map((t) => (
                <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-lg bg-secondary text-muted-foreground border border-border">
                  <Tag size={8} className="inline mr-1" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Subtasks */}
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
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${sub.done ? "bg-primary border-primary" : "border-border"}`}>
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

        {/* Audit log */}
        <div className="px-5 py-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-primary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground font-bold">История</span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Задача создана", sub: "JARVIS присвоил приоритет HIGH", time: "14:20" },
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

        {/* Accept / Reject actions */}
        <div className="px-5 pb-6 pt-3 border-t border-white/5 flex gap-2.5 shrink-0">
          <button className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-mono text-[12px] tracking-widest uppercase font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Check size={14} />
            Принять
          </button>
          <button className="flex-1 py-3 rounded-2xl bg-secondary border border-border text-foreground font-mono text-[12px] tracking-widest uppercase hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
            <X size={13} />
            На доработку
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main TasksView ─── */
type TaskTab = "board" | "agents";

const TasksView = () => {
  const [activeTab, setActiveTab] = useState<TaskTab>("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns: { status: Status; tasks: Task[] }[] = [
    { status: "active", tasks: tasks.filter((t) => t.status === "active") },
    { status: "review", tasks: tasks.filter((t) => t.status === "review") },
    { status: "backlog", tasks: tasks.filter((t) => t.status === "backlog") },
    { status: "done", tasks: tasks.filter((t) => t.status === "done") },
  ];

  const tabs: { id: TaskTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "board", label: "Задачи", icon: <CheckSquare size={14} />, count: tasks.filter(t => t.status !== "done").length },
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
          {tasks.filter(t => t.status === "active").length} активных · {agents.filter(a => a.status !== "idle").length} агентов в работе
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-card border border-border/40 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[11px] tracking-widest uppercase transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded min-w-[16px] text-center shrink-0 ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Board tab — horizontal scroll on desktop, vertical list on mobile */}
        {activeTab === "board" && (
          <>
            {/* Desktop: kanban */}
            <div className="hidden md:flex flex-1 overflow-x-auto overflow-y-hidden px-4 md:px-6 pb-6">
              <div className="flex gap-4 h-full min-w-max">
                {columns.map(({ status, tasks: colTasks }) => {
                  const cfg = statusConfig[status];
                  return (
                    <div key={status} className="flex flex-col w-[270px] shrink-0">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2">
                          {cfg.icon}
                          <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground font-bold">
                            {cfg.label}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-lg bg-secondary text-muted-foreground">
                            {colTasks.length}
                          </span>
                        </div>
                        <button className="w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-hide pr-1">
                        {colTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            compact
                            onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                          />
                        ))}
                        {colTasks.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-24 rounded-2xl border-2 border-dashed border-border text-muted-foreground/30">
                            <Circle size={18} className="mb-1" />
                            <span className="font-mono text-[10px] tracking-widest uppercase">Пусто</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: flat list */}
            <div className="md:hidden flex-1 overflow-y-auto px-4 pb-6 space-y-3 scrollbar-hide">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                />
              ))}
            </div>

            {/* Task detail */}
            {selectedTask && (
              <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}
          </>
        )}



        {activeTab === "agents" && (
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 scrollbar-hide space-y-5">
            {/* Team header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                  Команда JARVIS · {agents.length} агентов
                </span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-primary/20 transition-colors">
                <Plus size={11} />
                Нанять
              </button>
            </div>

            {/* Agent cards */}
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>

            {/* Capabilities grid */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={13} className="text-primary" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                  Возможности команды
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Brain size={14} />, label: "Анализ данных", agent: "МАРК" },
                  { icon: <Globe size={14} />, label: "Веб-поиск", agent: "JARVIS" },
                  { icon: <Zap size={14} />, label: "Контент", agent: "АННА" },
                  { icon: <ArrowUpRight size={14} />, label: "Реклама", agent: "ЕЛЕНА" },
                  { icon: <Search size={14} />, label: "Исследования", agent: "МАРК" },
                  { icon: <Filter size={14} />, label: "Приоритизация", agent: "JARVIS" },
                ].map((cap, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-3 bg-card border-2 border-border rounded-2xl hover:border-primary/20 transition-all cursor-pointer">
                    <span className="text-primary">{cap.icon}</span>
                    <div>
                      <div className="text-[12px] text-foreground font-semibold">{cap.label}</div>
                      <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">{cap.agent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add agent promo */}
            <div className="border-2 border-dashed border-primary/20 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Plus size={20} className="text-primary" />
              </div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-1.5 font-bold">
                Расширить команду
              </div>
              <p className="font-mono text-[11px] text-muted-foreground/50 leading-relaxed mb-3">
                SEO, разработка, финансы, юридические вопросы и другие специалисты
              </p>
              <button className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] tracking-widest uppercase hover:bg-primary/20 transition-colors">
                Каталог агентов →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksView;
