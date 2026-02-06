import { useState } from "react";
import { Settings, ArrowRight, Search, Clock, MoreHorizontal, MessageSquare, LayoutGrid, PenSquare, Layers, Briefcase, GraduationCap, Code, Lightbulb } from "lucide-react";

interface LibraryViewProps {
  onBack: () => void;
  onOpenChat: () => void;
}

const mockChats = [
  {
    title: "Можешь рассчитать сколько будет стоить расход на производство 1кв электричества газ...",
    preview: "Ниже — оценка именно топливной себестоимости 1 кВт·ч на газовом генераторе в Ленинградской обла...",
    time: "12m",
    tag: "Глубокое Исследование",
  },
  {
    title: "Что не так как подключиться",
    preview: "Основная проблема заключается в том, что вы используете локальный адрес (.local), который раб...",
    time: "26m",
  },
  {
    title: "Через что лучше всего создавать картинки ИИ быстро и качественно?",
    preview: "Для создания ИИ-бота в феврале 2026 года наиболее эффективными решениями для генерац...",
    time: "6h",
  },
  {
    title: "Найди и составь полную историю развития ООО «Рекома» ООО «2Н» (Мурманск)",
    preview: "На основе изображения юбилейного логотипа (34 года успеха с 1992 по 2026 год, подписи Н.Н. Фрол...",
    time: "8h",
  },
];

const mockSpaces = [
  {
    icon: Briefcase,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    title: "Рабочие проекты",
    description: "Задачи, планирование, бизнес-анализ",
    count: 12,
  },
  {
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    title: "Обучение",
    description: "Курсы, статьи, заметки по саморазвитию",
    count: 8,
  },
  {
    icon: Code,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    title: "Разработка",
    description: "Код, документация, дебаг сессии",
    count: 24,
  },
  {
    icon: Lightbulb,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    title: "Идеи",
    description: "Брейнштормы, концепции, черновики",
    count: 5,
  },
];

const LibraryView = ({ onBack, onOpenChat }: LibraryViewProps) => {
  const [tab, setTab] = useState<"chats" | "spaces">("chats");

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-lg mx-auto view-slide-in">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 flex items-center justify-between shrink-0">
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
          <Settings size={24} strokeWidth={1.5} />
        </button>
        <span className="font-semibold text-foreground text-[17px]">ons_wellwon</span>
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center bg-card rounded-full text-foreground border border-border hover:bg-secondary transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-4 shrink-0">
        <div className="bg-card rounded-xl px-3 py-2.5 flex items-center gap-2 text-muted-foreground border border-border">
          <Search size={18} />
          <span className="text-[15px]">Поиск бесед</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-28">
        {tab === "chats" ? (
          mockChats.map((chat, i) => (
            <div
              key={i}
              onClick={onOpenChat}
              className={`cursor-pointer py-4 group ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[16px] font-medium text-foreground line-clamp-2 leading-snug w-[90%] group-hover:text-primary transition-colors">
                  {chat.title}
                </h3>
                <MoreHorizontal size={18} className="text-muted-foreground shrink-0" />
              </div>
              <p className="text-muted-foreground text-[14px] line-clamp-2 mb-2 leading-relaxed">
                {chat.preview}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={12} /> {chat.time}
                </div>
                {chat.tag && (
                  <div className="flex items-center gap-1 text-primary">
                    <Layers size={12} /> {chat.tag}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-2 gap-3 mt-2">
            {mockSpaces.map((space, i) => {
              const Icon = space.icon;
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl ${space.bgColor} flex items-center justify-center mb-3`}>
                    <Icon size={20} className={space.color} />
                  </div>
                  <h3 className="text-[15px] font-medium text-foreground mb-1">{space.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-snug mb-2">{space.description}</p>
                  <span className="text-[11px] text-muted-foreground">{space.count} бесед</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none">
        <div className="flex items-center bg-card border border-border rounded-full p-1 pointer-events-auto shadow-2xl">
          <button
            onClick={() => setTab("chats")}
            className={`px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors ${
              tab === "chats" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare size={16} className={tab === "chats" ? "text-primary" : ""} /> Беседы
          </button>
          <button
            onClick={() => setTab("spaces")}
            className={`px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors ${
              tab === "spaces" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid size={16} className={tab === "spaces" ? "text-primary" : ""} /> Пространства
          </button>
        </div>
        <button className="absolute right-4 bottom-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-foreground border border-border shadow-lg pointer-events-auto hover:bg-muted transition-colors">
          <PenSquare size={20} />
        </button>
      </div>
    </div>
  );
};

export default LibraryView;