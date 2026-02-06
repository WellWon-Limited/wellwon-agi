import { useState, useRef } from "react";
import { Plus, ScanLine, Mic, AudioWaveform } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="px-4 pb-8 pt-2">
      <div className="bg-muted rounded-[36px] p-2 flex items-center h-[60px] shadow-2xl border border-border">
        {/* Plus Button */}
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground shrink-0 ml-1 active:scale-95 transition-transform">
          <Plus size={24} strokeWidth={2} />
        </button>

        {/* Text Input */}
        <div className="flex-1 ml-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Спросите что угодно..."
            rows={1}
            disabled={disabled}
            className="w-full bg-transparent border-none outline-none text-[17px] text-foreground placeholder:text-muted-foreground resize-none font-normal leading-[40px]"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1 pr-2 shrink-0">
          <button className="p-2 text-secondary-foreground hover:text-foreground transition-colors">
            <ScanLine size={22} strokeWidth={2} />
          </button>
          <button className="p-2 text-secondary-foreground hover:text-foreground transition-colors">
            <Mic size={22} strokeWidth={2} />
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 disabled:opacity-40"
          >
            <AudioWaveform size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
