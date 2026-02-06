import { useState, useRef, useEffect } from "react";
import { User, LayoutGrid } from "lucide-react";
import Logo from "@/components/Logo";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";

type Message = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Это демо-ответ на ваш вопрос: "${text}". Подключите AI-бэкенд для настоящих ответов.`,
        },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-lg mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <User size={18} className="text-muted-foreground" />
        </button>
        <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <LayoutGrid size={18} className="text-muted-foreground" />
        </button>
      </header>

      {/* Main area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="flex items-center justify-center h-full">
            <Logo />
          </div>
        ) : (
          <div className="pt-4 pb-2">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="px-4 py-3">
                <div className="flex gap-3 max-w-2xl mx-auto">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm">Думаю...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;
