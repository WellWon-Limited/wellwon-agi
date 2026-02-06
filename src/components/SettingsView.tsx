import {
  X, ChevronRight, Globe, Volume2, Sparkles, Bell, Map, ShoppingBag,
  Contrast, Send, Eye
} from "lucide-react";

interface SettingsViewProps {
  onClose: () => void;
}

const Toggle = ({ active }: { active: boolean }) => (
  <div className={`w-[46px] h-[28px] rounded-full p-[2px] transition-colors duration-300 ${active ? "bg-primary" : "bg-muted"}`}>
    <div className={`w-[24px] h-[24px] rounded-full bg-foreground shadow-md transition-transform duration-300 ${active ? "translate-x-[18px]" : "translate-x-0"}`} />
  </div>
);

const MenuItem = ({
  icon: Icon,
  label,
  right,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between py-4 border-b border-border text-left"
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className="text-muted-foreground" />
      <span className="text-[16px] text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      {right || <ChevronRight size={18} />}
    </div>
  </button>
);

const SettingsView = ({ onClose }: SettingsViewProps) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-card max-w-lg mx-auto view-slide-in">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full text-foreground"
        >
          <X size={20} />
        </button>
        <span className="font-semibold text-foreground text-[17px]">Настройки</span>
        <div className="w-10" />
      </div>

      {/* Profile */}
      <div className="px-4 py-4 flex items-center gap-3 shrink-0">
        <div className="w-14 h-14 rounded-full bg-muted border border-border" />
        <div>
          <div className="text-foreground font-semibold text-[17px]">ons_wellwon</div>
          <div className="text-primary text-[14px]">Управление аккаунтом</div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <MenuItem icon={Eye} label="Режим инкогнито" right={<Toggle active={false} />} />
        <MenuItem
          icon={Sparkles}
          label="WellWon Pro"
          right={
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-[14px]">Вы подписаны</span>
              <ChevronRight size={18} />
            </div>
          }
        />
        <MenuItem icon={ShoppingBag} label="Заказы" />
        <MenuItem icon={Contrast} label="Тема и иконка приложения" />
        <MenuItem icon={Send} label="Модель генерации изображений" />
        <MenuItem icon={Globe} label="Язык приложения" />
        <MenuItem icon={Volume2} label="Голос и язык" />
        <MenuItem icon={Sparkles} label="Персонализировать" />
        <MenuItem
          icon={Map}
          label="Задачи"
          right={
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <ChevronRight size={18} />
            </div>
          }
        />
        <MenuItem icon={Bell} label="Push-уведомления" right={<Toggle active={true} />} />
      </div>
    </div>
  );
};

export default SettingsView;
