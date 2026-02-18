import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, LineChart, Line, XAxis, Tooltip
} from "recharts";
import { Star, TrendingUp, Brain, ChevronDown, ChevronRight, Zap, Search, BarChart2, Sparkles, ArrowUpRight, Moon, Sun } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

type ProfileTab = "overview" | "domains" | "traits";

const radarData = [
  { domain: "Бизнес", value: 82 },
  { domain: "Финансы", value: 67 },
  { domain: "Здоровье", value: 71 },
  { domain: "Отношения", value: 58 },
  { domain: "Развитие", value: 89 },
  { domain: "Творчество", value: 74 },
  { domain: "Духовность", value: 45 },
  { domain: "Соц.капитал", value: 63 },
  { domain: "Среда", value: 77 },
];

const emotionTrend = [
  { day: "Пн", value: 72 },
  { day: "Вт", value: 68 },
  { day: "Ср", value: 81 },
  { day: "Чт", value: 75 },
  { day: "Пт", value: 88 },
  { day: "Сб", value: 91 },
  { day: "Вс", value: 84 },
];

const domains = [
  { name: "Развитие", value: 89, confidence: 94, trend: "up", color: "#ea3857", sub: "3 курса активно, 47 Zettels, ежедневное обучение" },
  { name: "Бизнес", value: 82, confidence: 88, trend: "up", color: "#4A9EFF", sub: "Выручка +12%, 2 новых проекта, команда растёт" },
  { name: "Среда", value: 77, confidence: 79, trend: "stable", color: "#00D4AA", sub: "Офис обустроен, Mac mini сервер, продуктивное рабочее место" },
  { name: "Творчество", value: 74, confidence: 71, trend: "up", color: "#B77CFF", sub: "Регулярный брейнсторминг, идеи в системе" },
  { name: "Здоровье", value: 71, confidence: 82, trend: "stable", color: "#10B981", sub: "Режим сна 7ч, спорт 3x/нед, питание OK" },
  { name: "Финансы", value: 67, confidence: 73, trend: "up", color: "#F59E0B", sub: "Позитивный cashflow, инвестиции запущены" },
  { name: "Соц.капитал", value: 63, confidence: 65, trend: "stable", color: "#06B6D4", sub: "47 ключевых контактов, нетворкинг 2x/мес" },
  { name: "Отношения", value: 58, confidence: 60, trend: "down", color: "#FF6B9D", sub: "Недостаточно времени на близких — приоритет" },
  { name: "Духовность", value: 45, confidence: 50, trend: "stable", color: "#6366F1", sub: "Медитация нерегулярная, есть потенциал роста" },
];

const traits = {
  confirmed: [
    { label: "Системное мышление", evidence: "97 взаимодействий", icon: <Brain size={16} /> },
    { label: "Высокая инициативность", evidence: "Запускает задачи сам", icon: <Zap size={16} /> },
    { label: "Детальная рефлексия", evidence: "Вечерние отчёты 90%", icon: <Search size={16} /> },
    { label: "Ориентация на данные", evidence: "Всегда запрашивает метрики", icon: <BarChart2 size={16} /> },
  ],
  candidates: [
    { label: "Перфекционизм", evidence: "Много правок, высокие стандарты", icon: <Sparkles size={16} /> },
    { label: "Автономность", evidence: "Редко делегирует людям", icon: <ArrowUpRight size={16} /> },
  ],
  signals: [
    { label: "Творческие блоки по вечерам", evidence: "3 наблюдения", icon: <Moon size={16} /> },
    { label: "Пик энергии 9-12", evidence: "Паттерн продуктивности", icon: <Sun size={16} /> },
  ],
};

interface ProfileViewProps {
  onNavigate?: (view: string) => void;
}

const ProfileView = ({ onNavigate }: ProfileViewProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  const avgScore = Math.round(radarData.reduce((s, d) => s + d.value, 0) / radarData.length);

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Tabs */}
      <div className="shrink-0 px-4 pt-20 pb-3">
        <div
          className="flex items-center p-1"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "100px" }}
        >
          {([
            { id: "overview", label: "Обзор" },
            { id: "domains", label: "Домены" },
            { id: "traits", label: "Черты" },
          ] as { id: ProfileTab; label: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2.5 font-mono text-[11px] tracking-widest uppercase transition-all rounded-full flex-1"
              style={activeTab === tab.id ? {
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 700,
              } : { color: "rgba(255,255,255,0.4)" }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8 space-y-4">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <>
            {/* Profile Card */}
            <div style={glassCard} className="px-5 py-5">
              <div className="flex items-center gap-4 mb-4">
                <img src={avatarImg} alt="Аватар" className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h2 className="text-[20px] font-black text-foreground mb-0.5">Ярослав</h2>
                  <div className="font-mono text-[11px] text-muted-foreground/60">CEO · ИП · Партнёр · Предприниматель</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-emerald-400">Профиль активен · 47 дней</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                {[
                  { value: `${avgScore}`, label: "Сред. балл", color: "text-primary" },
                  { value: "9", label: "Доменов", color: "text-foreground" },
                  { value: "47", label: "Zettels", color: "text-blue-400" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`font-mono text-[22px] font-black ${s.color}`}>{s.value}</div>
                    <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain size={14} className="text-primary" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">9 доменов жизни</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.07)" />
                  <PolarAngleAxis
                    dataKey="domain"
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(350,80%,57%)"
                    fill="hsl(350,80%,57%)"
                    fillOpacity={0.18}
                    strokeWidth={1.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Emotional Trend */}
            <div style={glassCard} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-blue-400" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-bold">Эмоциональный тренд · 7 дней</span>
              </div>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={emotionTrend}>
                  <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(20,20,30,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontFamily: "monospace",
                      fontSize: 11,
                    }}
                    itemStyle={{ color: "#4A9EFF" }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4A9EFF"
                    strokeWidth={2}
                    dot={{ fill: "#4A9EFF", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#4A9EFF" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* DOMAINS */}
        {activeTab === "domains" && (
          <div className="space-y-2">
            {domains.map(d => (
              <div key={d.name}>
                <button
                  onClick={() => setExpandedDomain(expandedDomain === d.name ? null : d.name)}
                  className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,${expandedDomain === d.name ? "0.10" : "0.06"})`,
                    borderRadius: expandedDomain === d.name ? "20px 20px 0 0" : "20px",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="font-mono text-[13px] font-bold text-foreground flex-1">{d.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[11px] ${d.trend === "up" ? "text-emerald-400" : d.trend === "down" ? "text-destructive" : "text-muted-foreground/50"}`}>
                        {d.trend === "up" ? "↑" : d.trend === "down" ? "↓" : "→"}
                      </span>
                      <span className="font-mono text-[14px] font-black text-foreground">{d.value}</span>
                    </div>
                    {expandedDomain === d.name ? <ChevronDown size={13} className="text-muted-foreground/40" /> : <ChevronRight size={13} className="text-muted-foreground/30" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${d.value}%`, background: d.color }} />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/40 shrink-0">
                      {d.confidence}% уверенность
                    </span>
                  </div>
                </button>
                {expandedDomain === d.name && (
                  <div
                    className="px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderTop: "none",
                      borderRadius: "0 0 20px 20px",
                    }}
                  >
                    <p className="font-mono text-[12px] text-foreground/60 leading-relaxed">{d.sub}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TRAITS */}
        {activeTab === "traits" && (
          <div className="space-y-4">
            {/* Confirmed */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Подтверждённые</span>
              </div>
              <div className="space-y-2">
                {traits.confirmed.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    <span className="text-foreground shrink-0 flex items-center">{t.icon}</span>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-foreground">{t.label}</div>
                      <div className="font-mono text-[10px] text-muted-foreground/50">{t.evidence}</div>
                    </div>
                    <Star size={12} className="text-emerald-400 shrink-0" fill="currentColor" />
                  </div>
                ))}
              </div>
            </div>

            {/* Candidates */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Кандидаты</span>
              </div>
              <div className="space-y-2">
                {traits.candidates.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)" }}>
                    <span className="text-foreground shrink-0 flex items-center">{t.icon}</span>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-foreground">{t.label}</div>
                      <div className="font-mono text-[10px] text-muted-foreground/50">{t.evidence}</div>
                    </div>
                    <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-md text-amber-400" style={{ background: "rgba(251,191,36,0.1)" }}>Возможно</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signals */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">Сигналы</span>
              </div>
              <div className="space-y-2">
                {traits.signals.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-foreground shrink-0 flex items-center">{t.icon}</span>
                    <div className="flex-1">
                      <div className="text-[13px] text-foreground/70">{t.label}</div>
                      <div className="font-mono text-[10px] text-muted-foreground/40">{t.evidence}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* JARVIS button */}
        <button
          onClick={() => onNavigate?.("chat")}
          className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-mono text-[12px] tracking-widest uppercase font-bold text-primary-foreground hover:opacity-90 transition-opacity mt-2"
          style={{ background: "hsl(var(--primary))", boxShadow: "0 8px 24px rgba(234,56,87,0.25)" }}
        >
          <Brain size={14} /> Начать сессию с JARVIS
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
