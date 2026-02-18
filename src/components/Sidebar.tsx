import { useState } from "react";
import { Layers, Search, MessageSquare, Database, PanelLeftClose, PanelLeftOpen, CheckSquare } from "lucide-react";

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-full flex flex-col bg-[hsl(240,10%,6%)] border-r border-border shrink-0 transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[280px]"
      }`}
    >
      {/* Header */}
      <div className={`px-3 pt-5 pb-4 flex items-center ${collapsed ? "justify-center" : "justify-between gap-2"}`}>
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <Layers size={16} className="text-primary shrink-0" />
            <span className="font-mono text-[12px] font-bold tracking-widest uppercase text-foreground whitespace-nowrap">
              Модули памяти
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0 ${collapsed ? "" : ""}`}
          title={collapsed ? "Развернуть" : "Свернуть"}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Search — only when expanded */}
      {!collapsed && (
        <div className="px-3 mb-4">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-muted-foreground">
            <Search size={14} />
            <span className="font-mono text-[12px] tracking-wider uppercase">Поиск данных...</span>
          </div>
        </div>
      )}

      {/* Collapsed: just search icon */}
      {collapsed && (
        <div className="px-3 mb-4 flex justify-center">
          <button className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Search size={16} />
          </button>
        </div>
      )}

      {/* Sessions */}
      <div className={`flex-1 overflow-y-auto ${collapsed ? "px-1.5" : "px-3"} space-y-1 scrollbar-hide`}>
        {collapsed ? (
          /* Mini mode: just icon dots */
          <div className="space-y-2">
            <div className="flex justify-center">
              <button
                onClick={() => onSelectSession(activeSession.title)}
                title={activeSession.title}
                className="w-9 h-9 rounded-lg border-l-2 border-primary bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </button>
            </div>
            {archiveSessions.map((s, i) => (
              <div key={i} className="flex justify-center">
                <button
                  onClick={() => onSelectSession(s.title)}
                  title={s.title}
                  className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
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
                className="w-full text-left px-3 py-3 rounded-lg border-l-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors"
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
          </>
        )}
      </div>

      {/* Bottom tabs */}
      <div className={`pb-4 pt-2 border-t border-border flex ${collapsed ? "flex-col items-center gap-2 px-1.5" : "gap-2 px-3"}`}>
        <button
          className={`flex items-center justify-center gap-2 rounded-lg bg-secondary text-foreground font-mono tracking-wider uppercase transition-colors ${
            collapsed ? "w-9 h-9" : "flex-1 py-2.5 text-[12px]"
          }`}
        >
          <MessageSquare size={14} />
          {!collapsed && "Поток"}
        </button>
        <button
          className={`flex items-center justify-center gap-2 rounded-lg hover:bg-secondary text-muted-foreground font-mono tracking-wider uppercase transition-colors ${
            collapsed ? "w-9 h-9" : "flex-1 py-2.5 text-[12px]"
          }`}
        >
          <Database size={14} />
          {!collapsed && "База"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
