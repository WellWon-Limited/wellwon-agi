import { useState, useRef } from "react";
import { Plus, Search, Mic, AudioLines } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onSearchClick?: () => void;
}

const ChatInput = ({ onSend, disabled, onSearchClick }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
    <div className={`glass-input rounded-xl transition-shadow duration-200 ${isFocused ? "glass-input-focused" : ""}`}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <Plus size={18} />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Введите команду или запрос..."
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-[14px] font-mono"
        />
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onSearchClick}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <AudioLines size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Mic size={18} />
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-all hover:opacity-90 flex items-center justify-center"
          >
            <Search size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
