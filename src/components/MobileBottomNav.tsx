import { MessageSquare, CheckSquare, Database, Inbox } from "lucide-react";

interface MobileBottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: "home", icon: MessageSquare, label: "Беседы" },
  { id: "tasks", icon: CheckSquare, label: "Задачи" },
  { id: "inbox", icon: Inbox, label: "Инбокс" },
  { id: "base", icon: Database, label: "База" },
];

const MobileBottomNav = ({ activeView, onNavigate }: MobileBottomNavProps) => {
  const isActive = (id: string) =>
    id === "home" ? activeView === "home" || activeView === "chat" : activeView === id;

  return (
    <div className="shrink-0 flex items-center bg-[hsl(240,10%,5%)] border-t border-white/5 pb-safe">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
            isActive(id) ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Icon size={22} strokeWidth={isActive(id) ? 2 : 1.5} />
          <span
            className={`font-mono text-[10px] tracking-wide ${
              isActive(id) ? "text-primary" : "text-muted-foreground/60"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MobileBottomNav;
