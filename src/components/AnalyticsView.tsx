import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from "recharts";
import { BarChart2, Zap, Brain, Users, Clock, DollarSign, CheckCircle2, TrendingUp, Route } from "lucide-react";

interface AnalyticsViewProps {
  onNavigate?: (view: string) => void;
}

const costData = [
  { day: "Пн", cost: 0.18 },
  { day: "Вт", cost: 0.31 },
  { day: "Ср", cost: 0.22 },
  { day: "Чт", cost: 0.45 },
  { day: "Пт", cost: 0.38 },
  { day: "Сб", cost: 0.12 },
  { day: "Вс", cost: 0.34 },
];

const modelBreakdown = [
  { model: "Claude Sonnet", cost: "$1.21", pct: 54, color: "#B77CFF" },
  { model: "Gemini Flash", cost: "$0.52", pct: 23, color: "#4A9EFF" },
  { model: "Groq", cost: "$0.18", pct: 8, color: "#10B981" },
  { model: "Embeddings", cost: "$0.26", pct: 12, color: "#F59E0B" },
  { model: "Whisper", cost: "$0.07", pct: 3, color: "#FB7185" },
];

const expertPerf = [
  { name: "ЯРВИС", tasks: 142, rate: 97, color: "#ea3857" },
  { name: "АННА", tasks: 58, rate: 94, color: "#FB7185" },
  { name: "МАРК", tasks: 34, rate: 91, color: "#4A9EFF" },
  { name: "ЕЛЕНА", tasks: 22, rate: 89, color: "#B77CFF" },
];

const memoryData = [
  { label: "Zettels", value: 247, delta: "+5", color: "#ea3857" },
  { label: "Связей", value: 134, delta: "+12", color: "#4A9EFF" },
  { label: "Людей", value: 23, delta: "+2", color: "#10B981" },
  { label: "Идей", value: 18, delta: "+3", color: "#F59E0B" },
];

// Donut data: 79 done, 8 remaining
const taskDonutData = [
  { name: "Выполнено", value: 79, color: "#ea3857" },
  { name: "Остаток", value: 8, color: "rgba(255,255,255,0.08)" },
];

const AnalyticsView = ({ onNavigate: _onNavigate }: AnalyticsViewProps) => {
  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  const totalWeekCost = costData.reduce((s, d) => s + d.cost, 0).toFixed(2);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="px-4 pt-20 pb-28 space-y-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(74,158,255,0.15)" }}>
            <BarChart2 size={17} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-[18px] font-black text-foreground">Аналитика</h1>
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Февраль 2026 · 7 дней</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: <DollarSign size={13} />, value: `$${totalWeekCost}`, label: "LLM неделя", color: "text-primary" },
            { icon: <CheckCircle2 size={13} />, value: "89%", label: "Fast path", color: "text-emerald-400" },
            { icon: <Clock size={13} />, value: "1.4s", label: "Latency", color: "text-blue-400" },
            { icon: <Zap size={13} />, value: "47k", label: "Токенов", color: "text-violet-400" },
          ].map((s, i) => (
            <div key={i} style={glassCard} className="px-2 py-3 flex flex-col items-center gap-1">
              <span className={s.color}>{s.icon}</span>
              <span className="font-mono text-[15px] font-black text-foreground">{s.value}</span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50 text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>

        {/* LLM Costs — BAR CHART */}
        <div style={glassCard} className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-primary" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">LLM Расходы · 7 дней</span>
            </div>
            <span className="font-mono text-[14px] font-black text-foreground">${totalWeekCost}</span>
          </div>

          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={costData} barSize={22}>
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(20,20,30,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontFamily: "monospace",
                  fontSize: 11,
                }}
                formatter={(v: number) => [`$${v.toFixed(2)}`, "Расход"]}
                labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                itemStyle={{ color: "#ea3857" }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                {costData.map((_, i) => (
                  <Cell key={i} fill="hsl(350,80%,57%)" fillOpacity={0.75} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Model breakdown */}
          <div className="mt-4 space-y-2.5">
            {modelBreakdown.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-muted-foreground/70">{m.model}</span>
                  <span className="font-mono text-[11px] text-foreground">{m.cost}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-col: Routing + Tasks */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Маршрутизация */}
          <div style={glassCard} className="px-4 py-4">
            <div className="flex items-center gap-2 mb-4">
              <Route size={14} className="text-emerald-400" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Маршрутизация</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[12px] text-foreground">Fast path</span>
                  <span className="font-mono text-[14px] font-black text-emerald-400">89%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: "89%", background: "#10B981" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[12px] text-foreground">Slow path</span>
                  <span className="font-mono text-[14px] font-black text-primary">11%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: "11%", background: "hsl(350,80%,57%)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Задачи — donut */}
          <div style={glassCard} className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-blue-400" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Задачи</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[72px] h-[72px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={taskDonutData} cx="50%" cy="50%" innerRadius={24} outerRadius={34} dataKey="value" strokeWidth={0}>
                      {taskDonutData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[13px] font-black text-foreground">79</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[
                  { label: "Всего", value: "87", color: "text-foreground" },
                  { label: "Агенты", value: "52", color: "text-blue-400" },
                  { label: "Ручные", value: "35", color: "text-muted-foreground" },
                  { label: "Avg время", value: "2m 14s", color: "text-emerald-400" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground/50">{s.label}</span>
                    <span className={`font-mono text-[11px] font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Expert Performance */}
        <div style={glassCard} className="px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-violet-400" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Эффективность агентов</span>
          </div>
          <div className="space-y-3">
            {expertPerf.map((e, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                    <span className="font-mono text-[12px] font-bold text-foreground">{e.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground/50">{e.tasks} задач</span>
                  </div>
                  <span className="font-mono text-[12px] font-bold text-foreground">{e.rate}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${e.rate}%`, background: e.color, opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Growth */}
        <div style={glassCard} className="px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={14} className="text-primary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Рост второго мозга · 7 дней</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {memoryData.map((m, i) => (
              <div key={i} className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-start justify-between mb-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">{m.label}</span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">{m.delta}</span>
                </div>
                <div className="font-mono text-[24px] font-black" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsView;
