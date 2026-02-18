import { ArrowRight, Power, ChevronRight, Globe, Monitor, Mic, Bell, Cpu } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

interface SystemPanelProps {
  onClose: () => void;
}

const Toggle = ({ active }: { active: boolean }) => (
  <div
    className={`w-[42px] h-[24px] rounded-full p-[2px] transition-colors duration-300 ${
      active ? "bg-primary" : "bg-muted"
    }`}
  >
    <div
      className={`w-[20px] h-[20px] rounded-full bg-white shadow transition-transform duration-300 ${
        active ? "translate-x-[18px]" : "translate-x-0"
      }`}
    />
  </div>
);

const Row = ({
  icon: Icon,
  label,
  value,
  right,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  right?: React.ReactNode;
}) => (
  <button className="w-full flex items-center justify-between py-4 border-b border-border group">
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-primary" />
      <span className="text-[15px] text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      {value && (
        <span className="font-mono text-[12px] tracking-wide text-muted-foreground">{value}</span>
      )}
      {right ?? <ChevronRight size={16} />}
    </div>
  </button>
);

const SystemPanel = ({ onClose }: SystemPanelProps) => {
  return (
    <div className="w-[320px] h-full bg-[hsl(240,10%,6%)] border-l border-border flex flex-col view-slide-in shrink-0">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-border">
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight size={20} />
        </button>
        <span className="font-mono text-[14px] font-bold tracking-widest uppercase text-foreground">
          Система
        </span>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-4 mb-2 bg-card border border-border rounded-xl p-4 flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-border shrink-0">
          <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[16px] font-bold text-foreground">ONS_WELLWON</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="font-mono text-[10px] text-green-400 tracking-wider">ONLINE</span>
            </div>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground tracking-wide mb-2">
            ID: 8492-AX-29
          </div>
          <div className="inline-flex items-center bg-primary/15 border border-primary/30 rounded-md px-2 py-0.5">
            <span className="font-mono text-[10px] text-primary font-bold tracking-widest">
              TITANIUM PRO
            </span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4">
        <Row icon={Monitor} label="Стелс-режим" right={<Toggle active={false} />} />
        <Row icon={Cpu} label="Нейроядро" value="Quantum v4" />
        <Row icon={Globe} label="Локализация" value="RU / EN" />
        <Row icon={Monitor} label="Интерфейс" value="Titanium Dark" />
        <Row icon={Mic} label="Синтез речи" value="Nova" />
        <Row icon={Bell} label="Уведомления" right={<Toggle active={true} />} />
      </div>

      {/* Disconnect */}
      <div className="px-4 pb-6 pt-2 border-t border-border">
        <button className="w-full flex items-center gap-3 py-3 text-primary hover:text-primary/80 transition-colors">
          <Power size={18} />
          <span className="font-mono text-[13px] font-bold tracking-widest uppercase">
            Отключиться
          </span>
        </button>
        <div className="mt-4 text-center">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest opacity-40">
            WELLWON SYSTEMS INC.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemPanel;
