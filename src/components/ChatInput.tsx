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
    <div className="px-4 pb-6 pt-2">
      <div className={`glass-input rounded-[28px] transition-shadow duration-200 ${isFocused ? "glass-input-focused" : ""}`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Спросите что угодно..."
          rows={1}
          disabled={disabled}
          className="w-full bg-transparent px-4 pt-4 pb-1 text-foreground placeholder:text-muted-foreground resize-none outline-none text-[15px]"
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
              <Plus size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
              <Search size={18} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
              <Mic size={20} />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!value.trim() || disabled}
              className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition-all hover:opacity-90"
            >
              <AudioLines size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
