import { Sparkles, Copy, ThumbsUp, ThumbsDown, Mic, Plus, ArrowUp, Share2, Download, RotateCcw, MoreHorizontal, ArrowUpRight, ChevronDown, ChevronUp, Zap, Network, GitMerge } from "lucide-react";
import { useState } from "react";

interface ChatResponseViewProps {
  userQuery: string;
  onSend: (msg: string) => void;
}

const mockSources = [
  { num: 1, label: "ГАЗПРОМ", sub: "Нормы расхода" },
  { num: 2, label: "МИНЭНЕРГО", sub: "Справочник 2024" },
  { num: 3, label: "ИНЖСЕТЬ", sub: "Калькулятор" },
  { num: 4, label: "ЭНЕРГОСБЫТ", sub: "Тарифы РФ" },
  { num: 5, label: "СИБУР", sub: "Кейс-стади" },
];

const followUpSuggestions = [
  { text: "В чём реальные ограничения open-source CrewAI и почему разраб...", tag: "Глубокое исследование" },
  { text: "Какие отличия open-source CrewAI от платной версии" },
  { text: "Как установить и запустить CrewAI бесплатно" },
  { text: "Какие LLM нужны для работы с CrewAI" },
  { text: "Примеры использования CrewAI для автоматизации задач" },
];

const cotSteps = [
  { icon: <Network size={12} />, label: "Router", time: "0.2s", desc: "Классифицировал запрос → тип: техническое исследование" },
  { icon: <Zap size={12} />, label: "CEO mode", time: "0.4s", desc: "Определил стратегию: web search + knowledge base" },
  { icon: <Sparkles size={12} />, label: "Expert (МАРК)", time: "1.8s", desc: "Анализ 5 источников, извлечение ключевых фактов" },
  { icon: <GitMerge size={12} />, label: "Synthesis", time: "0.6s", desc: "Сформировал ответ, проверил логику, добавил нюансы" },
];

const SourceBadge = ({ n }: { n: number }) => (
  <span className="inline-flex items-center gap-1 text-[10px] font-mono rounded px-1.5 py-0.5 mx-0.5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
    {["github", "crewai", "aitoolsforest", "lindy", "github"][n - 1]} +1
  </span>
);

const glassStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.09)",
};

const ChatResponseView = ({ userQuery, onSend }: ChatResponseViewProps) => {
  const [followUp, setFollowUp] = useState("");
  const [cotOpen, setCotOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-[64px] pb-4 scrollbar-hide md:px-6 md:pt-6 md:pb-6">

        {/* User message bubble — glass style */}
        <div className="flex justify-end mb-8">
          <div
            className="rounded-2xl px-5 py-3 max-w-[75%]"
            style={glassStyle}
          >
            <p className="text-[15px] text-foreground leading-relaxed">
              {userQuery || "CrewAI не понимаю это бесплатно? на сайте у них платно вроде"}
            </p>
          </div>
        </div>

        {/* Sources checked row */}
        <div className="flex items-center gap-2 mb-4 text-muted-foreground/60 text-[13px] font-mono">
          <span>Проверено {mockSources.length} источников</span>
          <span className="text-primary/40">›</span>
        </div>

        {/* Chain of Thought collapsible */}
        <div className="mb-5">
          <button
            onClick={() => setCotOpen(!cotOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all hover:opacity-80"
            style={{ background: "rgba(234,56,87,0.08)", border: "1px solid rgba(234,56,87,0.18)" }}
          >
            <Sparkles size={10} className="text-primary" />
            <span className="text-primary font-bold">Chain of Thought</span>
            {cotOpen ? <ChevronUp size={10} className="text-primary" /> : <ChevronDown size={10} className="text-primary" />}
            <span className="text-muted-foreground/50 ml-1">3.0s</span>
          </button>

          {cotOpen && (
            <div className="mt-3 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {cotSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-white/5 last:border-0">
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-primary" style={{ background: "rgba(234,56,87,0.12)" }}>
                      {step.icon}
                    </div>
                    {i < cotSteps.length - 1 && <div className="w-px h-3 bg-white/8" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[11px] font-bold text-foreground">{step.label}</span>
                      <span className="font-mono text-[10px] text-primary/60">{step.time}</span>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground/60 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI response */}
        <div>
          {/* JARVIS label */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(234,56,87,0.15)" }}>
              <Sparkles size={16} className="text-primary" />
            </div>
            <span className="text-[15px] font-semibold text-foreground">
              JARVIS
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full text-primary" style={{ background: "rgba(234,56,87,0.10)", border: "1px solid rgba(234,56,87,0.20)" }}>
              Slow path
            </span>
          </div>

          {/* Rich text body */}
          <div className="space-y-4 mb-6 text-[15px] text-foreground leading-relaxed">
            <p>
              Коротко: есть две <strong>разные вещи под брендом CrewAI</strong>.
            </p>

            <ol className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold text-primary mt-0.5" style={{ background: "rgba(234,56,87,0.10)", border: "1px solid rgba(234,56,87,0.20)" }}>1</span>
                <p>
                  <strong>Open-source фреймворк</strong>{" "}
                  <code className="px-1.5 py-0.5 rounded text-[12px] font-mono text-foreground/80" style={{ background: "rgba(255,255,255,0.08)" }}>crewAIInc/crewAI</code>{" "}
                  на GitHub — он БЕСПЛАТНЫЙ (MIT-лицензия).{" "}
                  <SourceBadge n={1} />
                </p>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold text-primary mt-0.5" style={{ background: "rgba(234,56,87,0.10)", border: "1px solid rgba(234,56,87,0.20)" }}>2</span>
                <p>
                  <strong>Коммерческий SaaS-сервис crewai.com</strong> (облако, UI, хостинг) — он ПЛАТНЫЙ (от ~$99/мес и выше).{" "}
                  <SourceBadge n={2} />
                </p>
              </li>
            </ol>

            <p className="font-semibold text-foreground">Что это значит лично для тебя</p>

            <ul className="space-y-2.5 list-none">
              {[
                <>Ты можешь спокойно ставить <strong>open-source CrewAI как питоновскую библиотеку</strong> в свой стек с OpenClaw и платить ТОЛЬКО за токены Claude/Gemini. <SourceBadge n={3} /></>,
                <>Платные цены, которые ты видел на сайте, относятся к их <strong>облачной платформе</strong> (UI, хостинг, support, team-фичи), она тебе не обязательна. <SourceBadge n={4} /></>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>

            <p className="font-semibold text-foreground">То есть схема такая:</p>

            <ul className="space-y-2.5 list-none">
              {[
                <><code className="px-1.5 py-0.5 rounded text-[12px] font-mono" style={{ background: "rgba(255,255,255,0.08)" }}>pip install crewai</code> → бесплатный фреймворк у тебя локально. <SourceBadge n={1} /></>,
                <>Claude за 200$ → как сейчас, просто ещё один backend для агентов.</>,
                <>Облачный crewai.com можешь вообще игнорировать, если всё крутится на твоём Mac mini / сервере.</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Share2 size={15} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Download size={15} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Copy size={15} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <RotateCcw size={15} />
              </button>

              {/* Sources count pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg ml-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 rounded-full border border-background" style={{ background: "rgba(234,56,87,0.4)" }} />
                  <div className="w-4 h-4 rounded-full border border-background" style={{ background: "rgba(234,56,87,0.7)" }} />
                </div>
                <span className="font-mono text-[12px] text-muted-foreground">{mockSources.length} источников</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <ThumbsUp size={15} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <ThumbsDown size={15} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <MoreHorizontal size={15} />
              </button>
            </div>
          </div>

          {/* Sources row — compact */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {mockSources.map((src) => (
              <div
                key={src.num}
                className="shrink-0 rounded-xl px-3 py-2.5 min-w-[110px] cursor-pointer transition-all hover:border-primary/30"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[9px] tracking-widest text-primary uppercase">
                    {src.label}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-muted-foreground/40 mb-1.5">{src.sub}</div>
                <div className="space-y-0.5">
                  <div className="h-[4px] rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="h-[4px] rounded-full w-2/3" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Follow-up suggestions */}
          <div className="mb-4">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground/50 mb-3">
              Последующие действия
            </div>
            <div className="space-y-1.5">
              {followUpSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSend(s.text)}
                  className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group hover:border-primary/20"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(234,56,87,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ArrowUpRight size={14} className="shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    <span className="text-[13px] text-foreground/70 truncate group-hover:text-foreground transition-colors">{s.text}</span>
                  </div>
                  {s.tag && (
                    <span className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50 px-2 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <Sparkles size={10} className="text-primary/60" />
                      {s.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="shrink-0 px-4 pb-4 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Plus size={17} />
          </button>
          <div className="flex-1 glass-input rounded-xl px-4 py-2.5 flex items-center gap-2">
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && followUp.trim()) {
                  onSend(followUp.trim());
                  setFollowUp("");
                }
              }}
              placeholder="Продолжить диалог..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 text-[14px]"
            />
            <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
              <Mic size={15} />
            </button>
          </div>
          <button
            onClick={() => { if (followUp.trim()) { onSend(followUp); setFollowUp(""); } }}
            className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 hover:opacity-90 transition-opacity"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatResponseView;
