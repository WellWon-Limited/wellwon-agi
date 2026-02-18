import { useState } from "react";
import {
  Plus, Inbox, CheckSquare, Zap, Users, Brain, Globe,
  Clock, ChevronRight, Sparkles, ArrowUpRight, Mic,
  MoreHorizontal, Flag, Calendar, Tag, Circle, CircleDot,
  CircleCheck, AlertCircle, Cpu, Search, Filter, ArrowUp
} from "lucide-react";

/* ─── Types ─── */
type Priority = "critical" | "high" | "medium" | "low";
type Status = "backlog" | "active" | "review" | "done";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "online" | "working" | "idle";
  tasks: number;
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
  { id: "jarvis", name: "JARVIS", role: "Оркестратор", status: "online", tasks: 4 },
  { id: "anna", name: "АННА", role: "Контент-агент", status: "working", tasks: 2 },
  { id: "mark", name: "МАРК", role: "Аналитик", status: "working", tasks: 1 },
  { id: "elena", name: "ЕЛЕНА", role: "Маркетолог", status: "idle", tasks: 0 },
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

const inboxItems = [
  { id: "i1", text: "Нужно подготовить презентацию для инвесторов на следующей неделе", time: "2 мин назад", processed: false },
  { id: "i2", text: "Идея: сделать рассылку по базе клиентов с новым оффером", time: "14 мин назад", processed: false },
  { id: "i3", text: "Посмотри кейс конкурента — они запустили новый продукт", time: "1 ч назад", processed: true },
  { id: "i4", text: "Надо разобраться с подпиской на Notion — скоро истекает", time: "3 ч назад", processed: true },
];

/* ─── Helpers ─── */
const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
  critical: { label: "КРИТИЧНО", color: "text-red-400", dot: "bg-red-400" },
  high: { label: "ВЫСОКИЙ", color: "text-primary", dot: "bg-primary" },
  medium: { label: "СРЕДНИЙ", color: "text-amber-400", dot: "bg-amber-400" },
  low: { label: "НИЗКИЙ", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const statusConfig: Record<Status, { label: string; icon: React.ReactNode; bg: string }> = {
  backlog: { label: "Бэклог", icon: <Circle size={13} />, bg: "bg-secondary" },
  active: { label: "В работе", icon: <CircleDot size={13} className="text-primary" />, bg: "bg-primary/10" },
  review: { label: "На проверке", icon: <AlertCircle size={13} className="text-amber-400" />, bg: "bg-amber-400/10" },
  done: { label: "Готово", icon: <CircleCheck size={13} className="text-emerald-400" />, bg: "bg-emerald-400/10" },
};

const agentColor: Record<string, string> = {
  jarvis: "bg-primary/20 text-primary border-primary/30",
  anna: "bg-blue-500/20 text-blue-400 border-blue-400/30",
  mark: "bg-purple-500/20 text-purple-400 border-purple-400/30",
  elena: "bg-emerald-500/20 text-emerald-400 border-emerald-400/30",
};

/* ─── Sub-components ─── */
const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => {
  const pri = priorityConfig[task.priority];
  const sta = statusConfig[task.status];
  const agent = agents.find((a) => a.id === task.agent);

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-xl p-4 hover:border-primary/25 hover:bg-primary/3 transition-all group"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className={`${sta.bg} rounded-md p-1 flex items-center justify-center`}>
            {sta.icon}
          </span>
          <span className="font-semibold text-[14px] text-foreground leading-snug truncate group-hover:text-white transition-colors">
            {task.title}
          </span>
        </div>
        <span className="flex items-center gap-1 shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
        </span>
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Tags + agent + time */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {task.tags.map((t) => (
            <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {agent && (
            <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded border ${agentColor[agent.id]}`}>
              {agent.name}
            </span>
          )}
          {task.dueTime && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/60">
              <Clock size={10} />
              {task.dueTime}
            </span>
          )}
        </div>
      </div>

      {/* Subtasks progress */}
      {task.subtasks && (
        <div className="mt-3 pt-2.5 border-t border-border">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Подзадачи</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
            </span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
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

const AgentBadge = ({ agent }: { agent: Agent }) => {
  const statusDot: Record<Agent["status"], string> = {
    online: "bg-emerald-400 animate-pulse",
    working: "bg-primary animate-pulse",
    idle: "bg-muted-foreground/50",
  };
  const statusLabel: Record<Agent["status"], string> = {
    online: "В сети",
    working: "Работает",
    idle: "Ожидает",
  };

  return (
    <div className="flex items-center gap-3 px-3 py-3 bg-card border border-border rounded-xl hover:border-primary/25 transition-all cursor-pointer group">
      <div className="relative shrink-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold ${agentColor[agent.id]}`}>
          {agent.name.slice(0, 2)}
        </div>
        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${statusDot[agent.status]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[12px] font-bold tracking-widest text-foreground">{agent.name}</div>
        <div className="font-mono text-[10px] text-muted-foreground tracking-wider">{agent.role}</div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-mono text-[10px] text-muted-foreground/60">{statusLabel[agent.status]}</div>
        {agent.tasks > 0 && (
          <div className="font-mono text-[11px] text-primary font-bold">{agent.tasks} задачи</div>
        )}
      </div>
    </div>
  );
};

/* ─── Task Detail Panel ─── */
const TaskDetail = ({ task, onClose }: { task: Task; onClose: () => void }) => {
  const pri = priorityConfig[task.priority];
  const sta = statusConfig[task.status];
  const agent = agents.find((a) => a.id === task.agent);

  return (
    <div className="flex flex-col h-full bg-[hsl(240,10%,6%)] border-l border-border w-[380px] shrink-0">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`${sta.bg} rounded-md p-1.5`}>{sta.icon}</span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">{sta.label}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <h2 className="text-[17px] font-bold text-foreground leading-snug mb-2">{task.title}</h2>
        <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">{task.description}</p>
      </div>

      {/* Meta */}
      <div className="px-5 py-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Приоритет</span>
          <span className={`flex items-center gap-1.5 font-mono text-[11px] font-bold ${pri.color}`}>
            <Flag size={11} />
            {pri.label}
          </span>
        </div>
        {agent && (
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Агент</span>
            <span className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded border ${agentColor[agent.id]}`}>
              {agent.name} · {agent.role}
            </span>
          </div>
        )}
        {task.dueTime && (
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">Срок</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-foreground">
              <Calendar size={11} />
              {task.dueTime}
            </span>
          </div>
        )}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 mt-0.5">Теги</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {task.tags.map((t) => (
              <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                <Tag size={8} className="inline mr-1" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtasks */}
      {task.subtasks && (
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare size={13} className="text-primary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground font-bold">
              Подзадачи · {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
            </span>
          </div>
          <div className="space-y-2">
            {task.subtasks.map((sub, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${sub.done ? "bg-primary border-primary" : "border-border"}`}>
                  {sub.done && <CheckSquare size={10} className="text-white" />}
                </div>
                <div>
                  <span className={`text-[13px] ${sub.done ? "line-through text-muted-foreground/50" : "text-foreground"}`}>
                    {sub.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* История изменений */}
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

      {/* Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-border flex gap-2">
        <button className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-[12px] tracking-widest uppercase font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Sparkles size={13} />
          Выполнить
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-secondary text-foreground font-mono text-[12px] tracking-widest uppercase hover:bg-secondary/80 transition-colors">
          На доработку
        </button>
      </div>
    </div>
  );
};

/* ─── Main TasksView ─── */
type TaskTab = "board" | "inbox" | "agents";

const TasksView = () => {
  const [activeTab, setActiveTab] = useState<TaskTab>("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [inboxInput, setInboxInput] = useState("");

  const columns: { status: Status; tasks: Task[] }[] = [
    { status: "backlog", tasks: tasks.filter((t) => t.status === "backlog") },
    { status: "active", tasks: tasks.filter((t) => t.status === "active") },
    { status: "review", tasks: tasks.filter((t) => t.status === "review") },
    { status: "done", tasks: tasks.filter((t) => t.status === "done") },
  ];

  const tabs: { id: TaskTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "board", label: "Задачи", icon: <CheckSquare size={14} />, count: tasks.filter(t => t.status !== "done").length },
    { id: "inbox", label: "Инбокс", icon: <Inbox size={14} />, count: inboxItems.filter(i => !i.processed).length },
    { id: "agents", label: "Агенты", icon: <Users size={14} />, count: agents.length },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      {/* Header */}
      <div className="shrink-0 px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Cpu size={16} className="text-primary" />
              </div>
              <h1 className="text-[22px] font-black tracking-tight text-foreground">
                Командный <span className="text-primary">Центр</span>
              </h1>
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
              JARVIS // Оперативный режим · {tasks.filter(t => t.status === "active").length} активных задач
            </div>
          </div>

          {/* Stats chips */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-card border border-border flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-muted-foreground">{tasks.filter(t=>t.status==="done").length} завершено</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
              <Zap size={11} className="text-primary" />
              <span className="font-mono text-[11px] text-primary">{agents.filter(a=>a.status==="working").length} агента в работе</span>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-mono text-[11px] tracking-widest uppercase flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              <Plus size={13} />
              Задача
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[12px] tracking-widest uppercase transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
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
        {/* Board tab */}
        {activeTab === "board" && (
          <>
            <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6">
              <div className="flex gap-4 h-full min-w-max">
                {columns.map(({ status, tasks: colTasks }) => {
                  const cfg = statusConfig[status];
                  return (
                    <div key={status} className="flex flex-col w-[280px] shrink-0">
                      {/* Column header */}
                      <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2">
                          {cfg.icon}
                          <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground font-bold">
                            {cfg.label}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            {colTasks.length}
                          </span>
                        </div>
                        <button className="w-6 h-6 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                          <Plus size={13} />
                        </button>
                      </div>
                      {/* Cards */}
                      <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-hide pr-1">
                        {colTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                          />
                        ))}
                        {colTasks.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-24 rounded-xl border border-dashed border-border text-muted-foreground/30">
                            <Circle size={20} className="mb-1" />
                            <span className="font-mono text-[10px] tracking-widest uppercase">Пусто</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Task detail panel */}
            {selectedTask && (
              <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}
          </>
        )}

        {/* Inbox tab */}
        {activeTab === "inbox" && (
          <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
            {/* Quick capture */}
            <div className="mb-5">
              <div className="font-mono text-[10px] tracking-widest uppercase text-primary/60 mb-2">
                Быстрый захват // Inbox
              </div>
              <div className="glass-input rounded-xl px-4 py-3 flex items-center gap-3">
                <Brain size={16} className="text-primary shrink-0" />
                <input
                  type="text"
                  value={inboxInput}
                  onChange={(e) => setInboxInput(e.target.value)}
                  placeholder="Сбросить идею, задачу, напоминание..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-[14px] font-mono"
                />
                <button className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                  <Mic size={15} />
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                  <ArrowUp size={15} />
                </button>
              </div>
              <div className="font-mono text-[9px] tracking-widest text-muted-foreground/30 mt-1.5 uppercase">
                JARVIS обработает и разложит по категориям автоматически
              </div>
            </div>

            {/* Unprocessed */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                  Необработанные · {inboxItems.filter(i => !i.processed).length}
                </span>
              </div>
              <div className="space-y-2">
                {inboxItems.filter(i => !i.processed).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 px-4 py-3.5 bg-card border border-primary/15 rounded-xl hover:border-primary/30 transition-all group cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-foreground leading-snug mb-1">{item.text}</p>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-muted-foreground/50">{item.time}</span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-primary/60 px-1.5 py-0.5 rounded bg-primary/10">
                          Ожидает обработки
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-2.5 py-1 rounded-lg bg-primary/15 text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-primary/25 transition-colors flex items-center gap-1">
                        <Sparkles size={10} />
                        Обработать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processed */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                  Обработанные · {inboxItems.filter(i => i.processed).length}
                </span>
              </div>
              <div className="space-y-2">
                {inboxItems.filter(i => i.processed).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 px-4 py-3.5 bg-card border border-border rounded-xl opacity-60">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-foreground leading-snug mb-1 line-through text-muted-foreground">{item.text}</p>
                      <span className="font-mono text-[10px] text-muted-foreground/50">{item.time}</span>
                    </div>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-emerald-400/60 px-1.5 py-0.5 rounded bg-emerald-400/10 shrink-0">
                      Готово
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agents tab */}
        {activeTab === "agents" && (
          <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
            {/* Active agents */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                    Команда JARVIS · {agents.length} агентов
                  </span>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-primary/20 transition-colors">
                  <Plus size={11} />
                  Нанять агента
                </button>
              </div>

              <div className="space-y-2">
                {agents.map((agent) => (
                  <AgentBadge key={agent.id} agent={agent} />
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-6">
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
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 bg-card border border-border rounded-xl">
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
            <div className="border border-dashed border-primary/20 rounded-xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Plus size={18} className="text-primary" />
              </div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-1 font-bold">
                Расширить команду
              </div>
              <p className="font-mono text-[11px] text-muted-foreground/60 leading-relaxed">
                Добавьте специализированных агентов для задач SEO, разработки, финансов и других областей
              </p>
              <button className="mt-3 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] tracking-widest uppercase hover:bg-primary/20 transition-colors">
                Посмотреть каталог →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksView;
