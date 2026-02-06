import { ArrowLeft, Search, SlidersHorizontal, ThumbsUp, ThumbsDown, Share } from "lucide-react";
import { useState } from "react";

interface DiscoverViewProps {
  onBack: () => void;
}

const categories = ["Для вас", "Топ Истории", "Технологии и наука", "Финансы", "Спорт"];

const mockArticles = [
  {
    title: "Исследование Apple: дообученная open-source модель превзошла GPT-5 в дизайне...",
    source: "wellwon",
  },
  {
    title: "Российский генерал разведки ранен при покушении в Москве",
    source: "wellwon",
  },
  {
    title: "Новый закон об ИИ вступает в силу в ЕС: что изменится для разработчиков",
    source: "wellwon",
  },
];

const DiscoverView = ({ onBack }: DiscoverViewProps) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-lg mx-auto">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="font-semibold text-foreground text-[17px]">Открытие</span>
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
            <Search size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pb-3 shrink-0 overflow-x-auto">
        <div className="flex gap-4 whitespace-nowrap">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`text-[14px] pb-1 transition-colors ${
                i === activeCategory
                  ? "text-primary font-medium border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {mockArticles.map((article, i) => (
          <div key={i} className="mb-4">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="h-48 bg-muted" />
              <div className="p-4">
                <h3 className="text-[16px] font-medium text-foreground leading-snug mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-muted-foreground">✦ {article.source}</span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <button className="hover:text-foreground"><ThumbsUp size={16} /></button>
                    <button className="hover:text-foreground"><ThumbsDown size={16} /></button>
                    <button className="hover:text-foreground"><Share size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverView;
