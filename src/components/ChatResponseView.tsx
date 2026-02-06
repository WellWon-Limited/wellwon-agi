import { ArrowLeft, Sparkles, Globe, Image as ImageIcon, Share, Mic, Plus, ExternalLink, Upload, RotateCcw, Copy, MoreHorizontal, Square } from "lucide-react";
import { useState } from "react";

interface ChatResponseViewProps {
  onBack: () => void;
}

const mockSources = [
  { id: 1, name: "РБК Энергетика", domain: "rbc.ru" },
  { id: 2, name: "Газпром тарифы 2026", domain: "gazprom.ru" },
  { id: 3, name: "CTG генераторы каталог", domain: "ctg-power.ru" },
  { id: 4, name: "Тарифы Ленобласти", domain: "lenreg.ru" },
  { id: 5, name: "Расчёт себестоимости кВт·ч", domain: "habr.com" },
];

const ChatResponseView = ({ onBack }: ChatResponseViewProps) => {
  const [followUp, setFollowUp] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleFollowUpSend = () => {
    if (!followUp.trim()) return;
    setFollowUp("");
    // mock: would send follow-up
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-lg mx-auto view-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 shrink-0">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex bg-card rounded-full p-1 border border-border">
          <button className="px-4 py-1.5 rounded-full bg-secondary text-primary">
            <Sparkles size={18} />
          </button>
          <button className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <Globe size={18} />
          </button>
          <button className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <ImageIcon size={18} />
          </button>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Upload size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {/* User message bubble */}
        <div className="flex justify-end mt-4 mb-6">
          <div className="bg-card border border-border rounded-2xl px-4 py-3 max-w-[85%]">
            <p className="text-[15px] text-foreground">Пдалаьадалпбалвь</p>
            <p className="text-[15px] text-foreground">Влада</p>
            <p className="text-[15px] text-foreground">Давала</p>
            <p className="text-[15px] text-foreground">Задал</p>
          </div>
        </div>

        {/* Thinking indicator / Sources */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-primary" />
            <span className="text-[13px] text-muted-foreground">Активен...</span>
          </div>
        </div>

        {/* Answer */}
        <div className="mb-6">
          <div className="border-l-2 border-border pl-4">
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
              <p>
                Я вижу, что ваше сообщение выглядит как случайный набор букв или возможная опечатка.
                Среди текста можно разобрать несколько русских слов: "Влада", "Давала", "Задал".
              </p>
              <p>
                Могу ли я чем-то помочь? Пожалуйста, уточните ваш вопрос, и я с удовольствием предоставлю нужную
                информацию или помогу с решением задачи.
              </p>
            </div>
          </div>

          {/* Action buttons like Perplexity */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Поделиться">
                <Upload size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Перегенерировать">
                <RotateCcw size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Копировать">
                <Copy size={18} />
              </button>
            </div>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Ещё">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Follow-up suggestion chips */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {["Показать полный источник", "Искать связанные темы", "Объяснить подробнее"].map((suggestion) => (
              <button
                key={suggestion}
                className="shrink-0 px-4 py-2 rounded-full bg-card border border-border text-[13px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Follow-up input with glass effect */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-background/80 backdrop-blur-lg">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <div className="flex-1 glass-input rounded-full p-2 pl-4 flex items-center">
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFollowUpSend()}
              placeholder="Задайте уточняющий вопрос..."
              className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-[15px] w-full"
            />
            <button className="p-2 text-muted-foreground hover:text-foreground shrink-0">
              {followUp.trim() ? <Square size={18} /> : <Mic size={20} />}
            </button>
          </div>
          <button className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors">
            <Plus size={20} className="rotate-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatResponseView;