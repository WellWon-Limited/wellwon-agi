import { useState } from "react";
import { Search, MoreHorizontal, Clock } from "lucide-react";

type Session = {
  title: string;
  preview: string;
  time: string;
  active?: boolean;
  group: "today" | "yesterday" | "week" | "older";
};

const allSessions: Session[] = [
  {
    title: "Во сколько вообще реально оцифровать себя",
    preview: "Полная «оцифровка» команды для IT-агентства с ролями вроде продаж, обработки жалоб, прототип...",
    time: "8h",
    active: true,
    group: "today",
  },
  {
    title: "Шаг 4. На роутере Mac Mini — пробросить порт SSH",
    preview: "Чтобы настроить проброс порта SSH на вашем роутере (вероятно, TP-Link Archer по скриншоту), с...",
    time: "1d",
    group: "yesterday",
  },
  {
    title: "Дай не сегодня самые свежие бенчи по OCR по всем моделям",
    preview: "Gemini 3 Flash лидирует в свежих OCR-бенчмарках по состоянию на февраль 2026, опережая конкуре...",
    time: "1d",
    group: "yesterday",
  },
  {
    title: "Стоимость 1кВт",
    preview: "Расчет топливной эффективности генератора G-Pro с учётом текущих тарифов...",
    time: "2d",
    group: "week",
  },
  {
    title: "Размер экрана HUAWEI Mateo's pro 12.2 в см",
    preview: "Размер экрана планшета HUAWEI MatePad Pro 12.2 (вероятно, имеется в виду MatePad Pro 12.2, а «Мате...",
    time: "2d",
    group: "week",
  },
  {
    title: "HUAWEI Планшет MatePad Pro 13.2 Wi-Fi+Клавиатура",
    preview: "Кратко: судя по артикулам и описаниям, именно WEB-W09 / 53014EXP в чёрном цвете — это НЕ Pa...",
    time: "3d",
    group: "week",
  },
  {
    title: "Протокол .local",
    preview: "Сетевая диагностика macOS и настройка mDNS в локальной сети...",
    time: "4d",
    group: "older",
  },
  {
    title: "Генерация v2026",
    preview: "Сравнительный анализ языковых моделей и их возможностей...",
    time: "5d",
    group: "older",
  },
];

const groupLabels: Record<Session["group"], string> = {
  today: "Сегодня",
  yesterday: "Вчера",
  week: "Эта неделя",
  older: "Ранее",
};

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
}: MobileChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allSessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // group by date category
  const groups = (["today", "yesterday", "week", "older"] as Session["group"][]).map(g => ({
    key: g,
    label: groupLabels[g],
    items: filtered.filter(s => s.group === g),
  })).filter(g => g.items.length > 0);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top bar */}
      <div className="shrink-0 flex items-center gap-2 px-3 pt-3 pb-3">
        {/* Search bar */}
        <div
          className="flex-1 flex items-center gap-2 px-4"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            borderRadius: "100px",
            height: "40px",
          }}
        >
          <Search size={14} className="text-foreground/30 shrink-0" />
          <input
            type="text"
            placeholder="Поиск бесед"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-foreground placeholder:text-foreground/30 font-mono"
          />
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "50%",
          }}
          className="w-10 h-10 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      {/* Chat list with date groups */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {groups.map(({ key, label, items }) => (
          <div key={key}>
            {/* Sticky group header */}
            <div
              className="sticky top-0 z-10 px-4 py-1.5"
              style={{
                background: "rgba(15,15,20,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40">
                {label}
              </span>
            </div>

            {items.map((session, i) => (
              <button
                key={i}
                onClick={() => onSelectSession(session.title)}
                className="w-full text-left px-4 py-4 transition-colors active:bg-white/5 relative"
                style={{ background: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
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
                    <div className="text-[13px] text-muted-foreground/45 line-clamp-1 leading-relaxed">
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
        ))}
      </div>
    </div>
  );
};

export default MobileChatList;
