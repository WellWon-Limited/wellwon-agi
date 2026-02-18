import { MessageSquare, CheckSquare, Database, Sparkles } from "lucide-react";

interface NavRailProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onAvatarClick: () => void;
  avatarSrc: string;
}

const navItems = [
  { id: "home", icon: MessageSquare, label: "Чат" },
  { id: "tasks", icon: CheckSquare, label: "Задачи" },
  { id: "base", icon: Database, label: "База" },
];

const NavRail = ({ activeView, onNavigate, onAvatarClick, avatarSrc }: NavRailProps) => {
  const isActive = (id: string) =>
    id === "home" ? activeView === "home" || activeView === "chat" : activeView === id;

  return (
    <div className="h-full flex flex-col items-center bg-[hsl(240,10%,5%)] border-r border-border w-[60px] shrink-0 py-4">
      {/* Logo mark */}
      <button
        onClick={() => onNavigate("home")}
        className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center mb-6 hover:bg-primary/25 transition-colors"
      >
        <Sparkles size={16} className="text-primary" />
      </button>

      {/* Nav icons */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isActive(id)
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* Avatar at bottom */}
      <button
        onClick={onAvatarClick}
        className="w-9 h-9 rounded-full overflow-hidden border border-border hover:border-primary/40 transition-colors mt-2"
      >
        <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default NavRail;
