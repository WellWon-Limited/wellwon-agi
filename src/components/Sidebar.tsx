import { useState } from "react";
import { Layers, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react";

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
  activeView?: string;
  onNavigate?: (view: string) => void;
  onCollapse?: () => void;
}

const Sidebar = ({ onOpenSettings, currentSession, onSelectSession, activeView, onNavigate, onCollapse }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    if (onCollapse) {
      onCollapse();
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div
      className={`h-full flex flex-col bg-[hsl(240,10%,6%)] border-r border-border shrink-0 transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      {/* Header */}
      <div className={`px-3 pt-5 pb-4 flex items-center ${collapsed ? "justify-center" : "justify-between gap-2"}`}>
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <Layers size={16} className="text-primary shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-foreground whitespace-nowrap">
              Память
            </span>
          </div>
        )}
        <button
          onClick={handleCollapse}
          className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
          title={collapsed ? "Развернуть" : "Свернуть"}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Search */}
      {!collapsed ? (
        <div className="px-3 mb-4">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-muted-foreground">
            <Search size={13} />
            <span className="font-mono text-[11px] tracking-wider uppercase">Поиск...</span>
          </div>
        </div>
      ) : (
        <div className="px-3 mb-4 flex justify-center">
          <button className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Search size={15} />
          </button>
        </div>
      )}

      {/* Sessions */}
      <div className={`flex-1 overflow-y-auto ${collapsed ? "px-1.5" : "px-3"} space-y-1 scrollbar-hide`}>
        {collapsed ? (
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
            <div className="mb-3">
              <div className="flex items-center gap-1.5 px-1 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  Активная
                </span>
              </div>
              <button
                onClick={() => onSelectSession(activeSession.title)}
                className="w-full text-left px-3 py-2.5 rounded-lg border-l-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <div className="font-semibold text-[13px] text-foreground mb-0.5 leading-snug">
                  {activeSession.title}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground leading-relaxed line-clamp-1">
                  {activeSession.preview}
                </div>
              </button>
            </div>

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
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors mb-1"
                >
                  <div className="font-semibold text-[13px] text-foreground mb-0.5 leading-snug">
                    {s.title}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground leading-relaxed line-clamp-1">
                    {s.preview}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
