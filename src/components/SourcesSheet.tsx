import { X, Image as ImageIcon, Camera, FilePlus, Globe, GraduationCap, DollarSign, Users } from "lucide-react";

interface SourcesSheetProps {
  open: boolean;
  onClose: () => void;
}

const Toggle = ({ active }: { active: boolean }) => (
  <div className={`w-[46px] h-[28px] rounded-full p-[2px] transition-colors duration-300 ${active ? "bg-primary" : "bg-muted"}`}>
    <div className={`w-[24px] h-[24px] rounded-full bg-foreground shadow-md transition-transform duration-300 ${active ? "translate-x-[18px]" : "translate-x-0"}`} />
  </div>
);

const sources = [
  { icon: Globe, label: "Веб", desc: "Поиск по всему интернету", active: true },
  { icon: GraduationCap, label: "Академический", desc: "Поиск опубликованных научных статей", active: false },
  { icon: DollarSign, label: "Финансы", desc: "Поиск записей комиссии по ценным бумагам", active: false },
  { icon: Users, label: "Социальные", desc: "Искать обсуждения и мнения", active: false },
];

const SourcesSheet = ({ open, onClose }: SourcesSheetProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-lg bg-card rounded-t-3xl p-5 pb-8 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-semibold text-foreground">Источники</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={22} />
          </button>
        </div>

        {/* Upload buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: ImageIcon, label: "Изображение" },
            { icon: Camera, label: "Камера" },
            { icon: FilePlus, label: "Файл" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-secondary border border-border hover:bg-muted transition-colors"
            >
              <item.icon size={24} className="text-muted-foreground" />
              <span className="text-[13px] text-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Source toggles */}
        <div className="space-y-0">
          {sources.map((src, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <src.icon size={20} className="text-muted-foreground" />
                <div>
                  <div className="text-[15px] text-foreground font-medium">{src.label}</div>
                  <div className="text-[13px] text-muted-foreground">{src.desc}</div>
                </div>
              </div>
              <Toggle active={src.active} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcesSheet;
