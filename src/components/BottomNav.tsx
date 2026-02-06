import { Home, Compass, Library, MoreHorizontal } from "lucide-react";

type Tab = "home" | "discover" | "library" | "more";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "home", icon: Home, label: "Главная" },
  { id: "discover", icon: Compass, label: "Открытие" },
  { id: "library", icon: Library, label: "Библиотека" },
  { id: "more", icon: MoreHorizontal, label: "Ещё" },
];

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <nav className="shrink-0 border-t border-border bg-background/90 backdrop-blur-xl px-2 pb-6 pt-2">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
