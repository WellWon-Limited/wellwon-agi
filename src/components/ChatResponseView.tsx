import { Sparkles, Copy, ThumbsUp, ThumbsDown, Mic, Plus, ArrowUp } from "lucide-react";
import { useState } from "react";

interface ChatResponseViewProps {
  userQuery: string;
  onSend: (msg: string) => void;
}

const mockPoints = [
  {
    num: "01",
    title: "При полной нагрузке генератор работает эффективнее",
    body: "4,5 руб за 1 кВт·ч — это почти в 1,3 раза дешевле, чем при половинной нагрузке.",
    bold: true,
  },
  {
    num: "02",
    title: null,
    body: "При частичной нагрузке (50%) себестоимость поднимается до 5,8 руб/кВт·ч, так как относительный расход газа на единицу выработанной энергии растёт.",
    bold: false,
  },
  {
    num: "03",
    title: "ВАЖНО",
    body: "Это только топливная составляющая. К ней нужно добавить амортизацию генератора (стоимость ~400–500 тыс. руб).",
    bold: true,
  },
];

const mockSources = [
  { num: 1, label: "ИСТОЧНИК 1" },
  { num: 2, label: "ИСТОЧНИК 2" },
  { num: 3, label: "ИСТОЧНИК 3" },
  { num: 4, label: "ИСТОЧНИК 4" },
];

const ChatResponseView = ({ userQuery, onSend }: ChatResponseViewProps) => {
  const [followUp, setFollowUp] = useState("");

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* User message bubble */}
        <div className="flex justify-end mb-6">
          <div className="bg-card border border-border rounded-2xl px-4 py-3 max-w-[75%]">
            <p className="text-[15px] text-foreground leading-relaxed">
              {userQuery || "Можешь рассчитать сколько будет стоить расход на производство 1кв электричества"}
            </p>
          </div>
        </div>

        {/* AI response */}
        <div>
          {/* WellWon AI label */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Sparkles size={16} className="text-primary" />
            </div>
            <span className="text-[15px] font-semibold text-foreground">
              WellWon{" "}
              <span className="text-primary font-bold">AI</span>
            </span>
          </div>

          {/* Section title */}
          <div className="border-l-2 border-primary pl-4 mb-5">
            <h2 className="font-mono text-[16px] font-bold tracking-wider uppercase text-foreground">
              Анализ эффективности
            </h2>
          </div>

          {/* Numbered cards */}
          <div className="space-y-3 mb-5">
            {mockPoints.map((point) => (
              <div
                key={point.num}
                className="bg-card border border-border rounded-xl p-4 flex gap-3"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-mono text-[11px] font-bold text-primary">
                    {point.num}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  {point.title && (
                    <div className="font-bold text-[14px] text-foreground mb-1 uppercase tracking-wide">
                      {point.title}
                    </div>
                  )}
                  <p className="text-[14px] text-foreground/85 leading-relaxed">{point.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sources row */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
            {mockSources.map((src) => (
              <div
                key={src.num}
                className="shrink-0 bg-card border border-border rounded-xl px-3 py-2.5 min-w-[130px]"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
                    {src.label}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="h-[6px] bg-muted rounded-full w-full" />
                  <div className="h-[6px] bg-muted rounded-full w-3/5" />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-[13px] text-muted-foreground hover:text-foreground transition-colors">
              <Copy size={14} />
              <span className="font-mono tracking-wide">Копировать</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <ThumbsUp size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <ThumbsDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="font-mono text-[10px] tracking-widest text-primary/60 mb-2 uppercase">
          System Ready // Awaiting Input
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <Plus size={18} />
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
              placeholder="Введите команду или запрос..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-[14px] font-mono"
            />
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Mic size={16} />
            </button>
          </div>
          <button
            onClick={() => { if (followUp.trim()) { onSend(followUp); setFollowUp(""); } }}
            className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 hover:opacity-90 transition-opacity"
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <div className="font-mono text-[9px] tracking-widest text-muted-foreground/30 mt-1.5 flex justify-between uppercase">
          <span>Encryption: AES-256</span>
          <span>WellWon AI Core 1.0</span>
        </div>
      </div>
    </div>
  );
};

export default ChatResponseView;
