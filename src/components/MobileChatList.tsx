import { useState } from "react";
import { Search, MoreHorizontal, Clock, Pencil } from "lucide-react";

const allSessions = [
  {
    title: "Во сколько вообще реально оцифровать себя",
    preview: "Полная «оцифровка» команды для IT-агентства с ролями вроде продаж, обработки жалоб, прототип...",
    time: "8h",
    active: true,
  },
  {
    title: "Шаг 4. На роутере Mac Mini — пробросить порт SSH",
    preview: "Чтобы настроить проброс порта SSH на вашем роутере (вероятно, TP-Link Archer по скриншоту), с...",
    time: "1d",
  },
  {
    title: "Дай не сегодня самые свежие бенчи по OCR по всем моделям",
    preview: "Gemini 3 Flash лидирует в свежих OCR-бенчмарках по состоянию на февраль 2026, опережая конкуре...",
    time: "1d",
  },
  {
    title: "Стоимость 1кВт",
    preview: "Расчет топливной эффективности генератора G-Pro с учётом текущих тарифов...",
    time: "2d",
  },
  {
    title: "Размер экрана HUAWEI Mateo's pro 12.2 в см",
    preview: "Размер экрана планшета HUAWEI MatePad Pro 12.2 (вероятно, имеется в виду MatePad Pro 12.2, а «Мате...",
    time: "2d",
  },
  {
    title: "HUAWEI Планшет MatePad Pro 13.2 Wi-Fi+Клавиатура",
    preview: "Кратко: судя по артикулам и описаниям, именно WEB-W09 / 53014EXP в чёрном цвете — это НЕ Pa...",
    time: "3d",
  },
  {
    title: "Протокол .local",
    preview: "Сетевая диагностика macOS и настройка mDNS в локальной сети...",
    time: "4d",
  },
  {
    title: "Генерация v2026",
    preview: "Сравнительный анализ языковых моделей и их возможностей...",
    time: "5d",
  },
];

interface MobileChatListProps {
  currentSession: string;
  onSelectSession: (title: string) => void;
  onOpenSettings: () => void;
  onNewChat: () => void;
  onSend: (text: string) => void;
}

const MobileChatList = ({
  currentSession,
  onSelectSession,
  onOpenSettings,
  onNewChat,
}: MobileChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allSessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top bar — шестерёнка слева, JARVIS по центру, карандаш справа */}
      <div className="shrink-0 flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-xl bg-card border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        <h1 className="flex-1 text-center font-mono text-[15px] font-black tracking-widest uppercase text-foreground">
          JARVIS
        </h1>

        <button
          onClick={onNewChat}
          className="w-9 h-9 rounded-xl bg-card border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <Pencil size={15} />
        </button>
      </div>

      {/* Search bar */}
      <div className="shrink-0 px-4 pb-3">
        <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2.5" style={{border: "1px solid rgba(255,255,255,0.05)"}}>
          <Search size={14} className="text-muted-foreground/40 shrink-0" />
          <input
            type="text"
            placeholder="Поиск бесед"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-foreground placeholder:text-muted-foreground/40"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filtered.map((session, i) => (
          <button
            key={i}
            onClick={() => onSelectSession(session.title)}
            className="w-full text-left px-4 py-4 hover:bg-card/30 transition-colors active:bg-card/50 relative"
          >
            <div className="flex items-start gap-1 pr-8">
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[15px] leading-snug mb-1 line-clamp-1 ${
                    session.title === currentSession
                      ? "font-semibold text-foreground"
                      : "font-medium text-foreground/80"
                  }`}
                >
                  {session.title}
                </div>
                <div className="text-[13px] text-muted-foreground/50 line-clamp-1 leading-relaxed">
                  {session.preview}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Clock size={10} className="text-muted-foreground/25" />
                  <span className="font-mono text-[11px] text-muted-foreground/30">{session.time}</span>
                  {session.active && (
                    <span className="ml-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-[10px] text-primary/60">active</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Three dots */}
            <button
              className="absolute right-3 top-4 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/25 hover:text-muted-foreground hover:bg-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={15} />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileChatList;
