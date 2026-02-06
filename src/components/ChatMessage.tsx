import { User, Sparkles } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={`px-4 py-3 ${role === "user" ? "" : ""}`}>
      <div className="flex gap-3 max-w-2xl mx-auto">
        <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${
          role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}>
          {role === "assistant" ? <Sparkles size={14} /> : <User size={14} />}
        </div>
        <div className="flex-1 min-w-0">
          {role === "user" ? (
            <p className="text-foreground font-medium text-[15px]">{content}</p>
          ) : (
            <div className="text-foreground/90 text-[15px] leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
