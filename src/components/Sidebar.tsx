import { Layers, Search, MessageSquare, Database, MoreHorizontal } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

const activeSession = {
  title: "Стоимость 1кВт",
  preview: "Расчет топливной эффективности генератора G-Pro...",
};

const archiveSessions = [
  { title: "Протокол .local", preview: "Сетевая диагностика macOS..." },
  { title: "Генерация v2026", preview: "Сравнительный анализ моделей..." },
];

interface SidebarProps {
  onOpenSettings: () => void;
  currentSession: string;
  onSelectSession: (title: string) => void;
}

const Sidebar = ({ onOpenSettings, currentSession, onSelectSession }: SidebarProps) => {
  return (
    <div className="w-[280px] h-full flex flex-col bg-[hsl(240,10%,6%)] border-r border-border shrink-0">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-2">
        <Layers size={18} className="text-primary" />
        <span className="font-mono text-[13px] font-bold tracking-widest uppercase text-foreground">
          Модули памяти
        </span>
      </div>

      {/* Search */}
      <div className="px-3 mb-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-muted-foreground">
          <Search size={14} />
          <span className="font-mono text-[12px] tracking-wider uppercase">Поиск данных...</span>
        </div>
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {/* Active session */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 px-1 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              Активная сессия
            </span>
          </div>
          <button
            onClick={() => onSelectSession(activeSession.title)}
            className={`w-full text-left px-3 py-3 rounded-lg border-l-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors`}
          >
            <div className="font-semibold text-[14px] text-foreground mb-0.5 leading-snug">
              {activeSession.title}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
              {activeSession.preview}
            </div>
          </button>
        </div>

        {/* Archive */}
        <div>
          <div className="flex items-center gap-1.5 px-1 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              Архив
            </span>
          </div>
          {archiveSessions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelectSession(s.title)}
              className="w-full text-left px-3 py-3 rounded-lg hover:bg-secondary transition-colors mb-1"
            >
              <div className="font-semibold text-[14px] text-foreground mb-0.5 leading-snug">
                {s.title}
              </div>
              <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                {s.preview}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom tabs */}
      <div className="px-3 pb-4 pt-2 border-t border-border flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary text-foreground text-[12px] font-mono tracking-wider uppercase">
          <MessageSquare size={14} />
          Поток
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-secondary text-muted-foreground text-[12px] font-mono tracking-wider uppercase transition-colors">
          <Database size={14} />
          База
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
