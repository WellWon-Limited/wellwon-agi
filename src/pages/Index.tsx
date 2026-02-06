import { useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import LibraryView from "@/components/LibraryView";
import SettingsView from "@/components/SettingsView";
import ChatResponseView from "@/components/ChatResponseView";
import DiscoverView from "@/components/DiscoverView";
import ModeSheet from "@/components/ModeSheet";
import SourcesSheet from "@/components/SourcesSheet";
import BottomNav from "@/components/BottomNav";
import avatarImg from "@/assets/avatar.jpg";

type Message = { role: "user" | "assistant"; content: string };
type View = "home" | "discover" | "library" | "more" | "chat-response";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("search");
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

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

  // Full-screen views (no bottom nav)
  if (view === "chat-response") return <ChatResponseView onBack={() => setView("library")} />;

  // Views with bottom nav
  const activeTab = view as "home" | "discover" | "library" | "more";

  const handleTabChange = (tab: "home" | "discover" | "library" | "more") => {
    setView(tab);
  };

  const renderContent = () => {
    if (view === "library") {
      return <LibraryView onBack={() => setView("home")} onOpenChat={() => setView("chat-response")} />;
    }
    if (view === "more") {
      return <SettingsView onClose={() => setView("home")} />;
    }
    if (view === "discover") {
      return <DiscoverView onBack={() => setView("home")} />;
    }

    // Home view
    return (
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-12 pb-3 shrink-0">
          <div className="w-10" />
          <div className="w-9 h-9 rounded-full overflow-hidden border border-border">
            <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
          </div>
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

        {/* Bottom sheets */}
        <ModeSheet open={modeOpen} onClose={() => setModeOpen(false)} selected={selectedMode} onSelect={setSelectedMode} />
        <SourcesSheet open={sourcesOpen} onClose={() => setSourcesOpen(false)} />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-lg mx-auto selection:bg-primary/30">
      <div className="flex-1 min-h-0 flex flex-col">
        {renderContent()}
      </div>
      <BottomNav active={activeTab} onChange={handleTabChange} />
    </div>
  );
};

export default Index;
