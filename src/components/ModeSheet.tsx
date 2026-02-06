import { X, Search, Compass, Lightbulb } from "lucide-react";

interface ModeSheetProps {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (mode: string) => void;
}

const modes = [
  {
    id: "search",
    icon: Search,
    label: "Поиск",
    pro: true,
    desc: "Быстрые ответы на повседневные вопросы",
    model: "Claude Sonnet 4.5",
  },
  {
    id: "research",
    icon: Compass,
    label: "Исследование",
    pro: true,
    desc: "Глубокое исследование любой темы",
    extra: "8 запросов осталось в этом месяце",
  },
  {
    id: "labs",
    icon: Lightbulb,
    label: "Лаборатории",
    pro: true,
    desc: "Создание проектов с нуля",
  },
];

const ModeSheet = ({ open, onClose, selected, onSelect }: ModeSheetProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-lg bg-card rounded-t-3xl p-5 pb-8 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-semibold text-foreground">Выберите режим</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-3">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => { onSelect(mode.id); onClose(); }}
              className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                selected === mode.id
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <mode.icon size={18} className="text-muted-foreground" />
                  <span className="text-[16px] font-medium text-foreground">{mode.label}</span>
                  {mode.pro && (
                    <span className="text-[11px] font-bold text-primary bg-primary/15 px-1.5 py-0.5 rounded">
                      pro
                    </span>
                  )}
                </div>
                {mode.model && (
                  <span className="text-[13px] text-muted-foreground">{mode.model}</span>
                )}
              </div>
              <p className="text-[14px] text-muted-foreground ml-[26px]">{mode.desc}</p>
              {mode.extra && (
                <p className="text-[13px] text-muted-foreground/70 ml-[26px] mt-0.5">{mode.extra}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSheet;
