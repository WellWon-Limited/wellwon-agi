import { Home, MessageSquare, Brain, CheckSquare, MoreHorizontal } from "lucide-react";

interface MobileBottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Главная" },
  { id: "chat", icon: MessageSquare, label: "Беседы" },
  { id: "brain", icon: Brain, label: "Brain" },
  { id: "tasks", icon: CheckSquare, label: "Задачи" },
  { id: "more", icon: MoreHorizontal, label: "Ещё" },
];

const MobileBottomNav = ({ activeView, onNavigate }: MobileBottomNavProps) => {
  const isActive = (id: string) => {
    if (id === "chat") return activeView === "chat";
    if (id === "more") return ["more", "briefs", "capsules", "experts", "profile"].includes(activeView);
    return activeView === id;
  };

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
