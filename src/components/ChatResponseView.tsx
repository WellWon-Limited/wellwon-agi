import { ArrowLeft, Sparkles, Globe, Image as ImageIcon, Share, Mic, Plus } from "lucide-react";
import { useState, useRef } from "react";

interface ChatResponseViewProps {
  onBack: () => void;
}

const ChatResponseView = ({ onBack }: ChatResponseViewProps) => {
  const [followUp, setFollowUp] = useState("");

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft size={24} />
        </button>
        <div className="flex bg-card rounded-full p-1 border border-border">
          <button className="px-4 py-1.5 rounded-full bg-secondary text-primary">
            <Sparkles size={18} />
          </button>
          <button className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground">
            <Globe size={18} />
          </button>
          <button className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground">
            <ImageIcon size={18} />
          </button>
        </div>
        <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
          <Share size={22} />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-4" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        <div className="mt-6">
          <h2 className="text-[20px] font-semibold text-foreground mb-5">Выводы</h2>
          <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">
            <div className="flex gap-3">
              <span className="text-muted-foreground font-medium shrink-0">1.</span>
              <div>
                При полной нагрузке генератор работает эффективнее:{" "}
                <span className="font-semibold text-foreground">4,5 руб за 1 кВт·ч</span> — это почти в 1,3 раза
                дешевле, чем при половинной нагрузке.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground font-medium shrink-0">2.</span>
              <div>
                При частичной нагрузке (50%) себестоимость поднимается до{" "}
                <span className="font-semibold text-foreground">5,8 руб/кВт·ч</span>, так как относительный расход
                газа на единицу выработанной энергии растёт.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground font-medium shrink-0">3.</span>
              <div>
                Для сравнения: розничный тариф на электроэнергию для населения в Ленобласти в 2026 году составляет
                примерно <span className="font-semibold text-foreground">5,5–7 руб/кВт·ч</span> (зависит от зоны и
                поставщика).
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground font-medium shrink-0">4.</span>
              <div>
                Не забывайте: это только топливная составляющая. К ней нужно добавить амортизацию генератора
                (стоимость ~400–500 тыс. руб, ресурс двигателя ~6000 моточасов).
              </div>
            </div>
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-foreground/85">
            Если нужна более мощная модель (ближе к 20 кВт) или трёхфазная — есть аналогичные генераторы той же серии
            CTG и других брендов (POWERON, Generac, Gazvolt) с похожими характеристиками расхода.
          </p>
        </div>
      </div>

      {/* Follow-up input */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-background border-t border-border">
        <div className="max-w-lg mx-auto bg-card rounded-[28px] p-2 pl-4 flex items-center justify-between border border-border">
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Задайте уточняющий вопрос..."
            className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-[15px] w-full"
          />
          <div className="flex items-center gap-1">
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <Mic size={20} />
            </button>
            <button className="p-2 bg-secondary rounded-full text-foreground">
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatResponseView;
