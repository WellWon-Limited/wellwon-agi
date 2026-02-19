import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

interface SettingsViewProps {
  onClose: () => void;
}

const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`w-[46px] h-[28px] rounded-full p-[2px] transition-colors duration-300 shrink-0 ${active ? "bg-primary" : "bg-muted"}`}
  >
    <div className={`w-[24px] h-[24px] rounded-full bg-foreground shadow-md transition-transform duration-300 ${active ? "translate-x-[18px]" : "translate-x-0"}`} />
  </button>
);

const SectionHeader = ({ label }: { label: string }) => (
  <div className="px-4 pt-6 pb-2">
    <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 font-bold">{label}</span>
  </div>
);

const SelectRow = ({
  label,
  sublabel,
  value,
  options,
  onChange,
}: {
  label: string;
  sublabel?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5">
    <div className="flex flex-col">
      <span className="text-[15px] text-foreground">{label}</span>
      {sublabel && <span className="font-mono text-[11px] text-muted-foreground/50 mt-0.5">{sublabel}</span>}
    </div>
    <div className="relative shrink-0 ml-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-[14px] text-primary font-mono pr-4 focus:outline-none cursor-pointer text-right"
        style={{ direction: "rtl" }}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ direction: "ltr", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
            {o}
          </option>
        ))}
      </select>
      <ChevronLeft size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" />
    </div>
  </div>
);

const ToggleRow = ({
  label,
  sublabel,
  active,
  onToggle,
}: {
  label: string;
  sublabel?: string;
  active: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5">
    <div className="flex flex-col flex-1 min-w-0 pr-4">
      <span className="text-[15px] text-foreground">{label}</span>
      {sublabel && <span className="font-mono text-[11px] text-muted-foreground/50 mt-0.5">{sublabel}</span>}
    </div>
    <Toggle active={active} onToggle={onToggle} />
  </div>
);

const TimeToggleRow = ({
  label,
  time,
  active,
  onToggle,
}: {
  label: string;
  time: string;
  active: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5">
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-[15px] text-foreground">{label}</span>
      <span className="font-mono text-[11px] text-primary mt-0.5">{time}</span>
    </div>
    <Toggle active={active} onToggle={onToggle} />
  </div>
);

const InputRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5">
    <span className="text-[15px] text-foreground shrink-0 mr-4">{label}</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-[14px] text-primary font-mono text-right focus:outline-none flex-1 min-w-0"
      placeholder="Введите..."
    />
  </div>
);

const SettingsView = ({ onClose }: SettingsViewProps) => {
  const [agentName, setAgentName] = useState("JARVIS");
  const [agentStyle, setAgentStyle] = useState("Партнёр");
  const [agentLang, setAgentLang] = useState("Русский");
  const [agentModel, setAgentModel] = useState("Claude Sonnet");

  const [quietHours, setQuietHours] = useState(true);
  const [criticalNotifs, setCriticalNotifs] = useState(true);
  const [morningSummary, setMorningSummary] = useState(true);

  const [morningBrief, setMorningBrief] = useState(true);
  const [eveningReport, setEveningReport] = useState(true);
  const [capsuleNotifs, setCapsuleNotifs] = useState(true);
  const [reminders, setReminders] = useState(true);

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-background max-w-lg mx-auto view-slide-in">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full text-foreground transition-colors"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <X size={20} />
        </button>
        <span className="font-mono font-bold text-foreground text-[17px] tracking-widest uppercase">Настройки</span>
        <div className="w-10" />
      </div>

      {/* Profile */}
      <div className="px-4 py-4 flex items-center gap-4 shrink-0 mx-4 rounded-2xl mb-2" style={glassCard}>
        <div className="w-14 h-14 rounded-full overflow-hidden border border-border shrink-0">
          <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-foreground font-semibold text-[17px]">ons_wellwon</div>
          <div className="text-primary text-[13px] font-mono">WellWon Pro · Активна</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      </div>

      {/* Scrollable menu */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-10">

        {/* ── АГЕНТ ── */}
        <SectionHeader label="Агент" />
        <div style={{ ...glassCard, borderRadius: "16px" }} className="px-4 divide-y-0">
          <InputRow label="Имя агента" value={agentName} onChange={setAgentName} />
          <SelectRow
            label="Стиль общения"
            sublabel="Как JARVIS общается с вами"
            value={agentStyle}
            options={["Партнёр", "Директор", "Коуч", "Ассистент"]}
            onChange={setAgentStyle}
          />
          <SelectRow
            label="Язык"
            value={agentLang}
            options={["Русский", "English", "Español", "Deutsch"]}
            onChange={setAgentLang}
          />
          <SelectRow
            label="Модель по умолчанию"
            sublabel="Для большинства запросов"
            value={agentModel}
            options={["Claude Sonnet", "Claude Opus", "GPT-4o", "GPT-4o mini", "Gemini Flash", "Gemini Pro"]}
            onChange={setAgentModel}
          />
        </div>

        {/* ── ТИХИЕ ЧАСЫ ── */}
        <SectionHeader label="Тихие часы" />
        <div style={{ ...glassCard, borderRadius: "16px" }} className="px-4">
          <ToggleRow
            label="Режим тишины"
            sublabel="22:00 — 08:00"
            active={quietHours}
            onToggle={() => setQuietHours(v => !v)}
          />
          <ToggleRow
            label="Критические уведомления"
            sublabel="Приходят даже в тихие часы"
            active={criticalNotifs}
            onToggle={() => setCriticalNotifs(v => !v)}
          />
          <ToggleRow
            label="Утренняя сводка"
            sublabel="Сразу после тихих часов"
            active={morningSummary}
            onToggle={() => setMorningSummary(v => !v)}
          />
        </div>

        {/* ── УВЕДОМЛЕНИЯ ── */}
        <SectionHeader label="Уведомления" />
        <div style={{ ...glassCard, borderRadius: "16px" }} className="px-4">
          <TimeToggleRow
            label="Утренний бриф"
            time="08:00"
            active={morningBrief}
            onToggle={() => setMorningBrief(v => !v)}
          />
          <TimeToggleRow
            label="Вечерний отчёт"
            time="21:00"
            active={eveningReport}
            onToggle={() => setEveningReport(v => !v)}
          />
          <ToggleRow
            label="Капсулы"
            sublabel="Уведомления о срабатывании"
            active={capsuleNotifs}
            onToggle={() => setCapsuleNotifs(v => !v)}
          />
          <ToggleRow
            label="Напоминания"
            sublabel="Задачи и события"
            active={reminders}
            onToggle={() => setReminders(v => !v)}
          />
        </div>

        {/* Logout */}
        <div className="mt-6">
          <button
            className="w-full py-3.5 rounded-2xl font-mono text-[12px] tracking-widest uppercase text-muted-foreground/50 hover:text-destructive transition-colors"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
