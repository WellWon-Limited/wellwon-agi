import { X, Globe, Code2 } from "lucide-react";

interface SearchProtocolModalProps {
  open: boolean;
  selected: "global" | "code";
  onSelect: (mode: "global" | "code") => void;
  onClose: () => void;
}

const SearchProtocolModal = ({ open, selected, onSelect, onClose }: SearchProtocolModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-[380px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <span className="font-mono text-[14px] font-bold tracking-widest uppercase text-foreground">
              Протокол поиска
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-3">
          {/* Global network */}
          <button
            onClick={() => { onSelect("global"); onClose(); }}
            className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
              selected === "global"
                ? "border-primary/40 bg-primary/5"
                : "border-border hover:border-primary/20 bg-card"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Globe size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono text-[13px] font-bold tracking-widest uppercase text-foreground mb-1">
                    Глобальная сеть
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground tracking-wide">
                    Стандартный поиск по всем узлам
                  </div>
                </div>
              </div>
              {selected === "global" && (
                <div className="bg-primary text-primary-foreground text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-md shrink-0">
                  ACTIVE
                </div>
              )}
            </div>
          </button>

          {/* Code / Logic */}
          <button
            onClick={() => { onSelect("code"); onClose(); }}
            className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
              selected === "code"
                ? "border-primary/40 bg-primary/5"
                : "border-border hover:border-primary/20 bg-card"
            }`}
          >
            <div className="flex items-start gap-3">
              <Code2 size={20} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <div className="font-mono text-[13px] font-bold tracking-widest uppercase text-foreground mb-1">
                  Код / Логика
                </div>
                <div className="font-mono text-[11px] text-muted-foreground tracking-wide">
                  Оптимизация для разработки
                </div>
              </div>
              {selected === "code" && (
                <div className="ml-auto bg-primary text-primary-foreground text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-md shrink-0">
                  ACTIVE
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchProtocolModal;
