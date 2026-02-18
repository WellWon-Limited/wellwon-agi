import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import ChatInput from "@/components/ChatInput";
import Sidebar from "@/components/Sidebar";
import SystemPanel from "@/components/SystemPanel";
import ChatResponseView from "@/components/ChatResponseView";
import SearchProtocolModal from "@/components/SearchProtocolModal";
import BootScreen from "@/components/BootScreen";
import avatarImg from "@/assets/avatar.jpg";
import { Grid3x3, Sparkles, Minimize2 } from "lucide-react";

type View = "home" | "chat";

const Index = () => {
  const [booting, setBooting] = useState(true);
  const [view, setView] = useState<View>("home");
  const [systemOpen, setSystemOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<"global" | "code">("global");
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentSession, setCurrentSession] = useState("Стоимость 1кВт");

  const handleSend = (text: string) => {
    setCurrentQuery(text);
    setView("chat");
  };

  return (
    <>
      {booting && <BootScreen onComplete={() => setBooting(false)} />}

      <div className="flex h-[100dvh] bg-background overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          onOpenSettings={() => setSystemOpen(true)}
          currentSession={currentSession}
          onSelectSession={(title) => {
            setCurrentSession(title);
            setView("chat");
          }}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Top bar */}
          <header className="shrink-0 flex items-center justify-between px-6 pt-5 pb-3 border-b border-border/40">
            <div />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSystemOpen(!systemOpen)}
                className="w-9 h-9 rounded-full overflow-hidden border border-border hover:border-primary/30 transition-colors"
              >
                <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 min-h-0 flex flex-col">
            {view === "home" ? (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Center logo */}
                <div className="flex-1 flex items-center justify-center">
                  <Logo />
                </div>

                {/* Bottom input area */}
                <div className="shrink-0 px-6 pb-4 pt-2">
                  <div className="font-mono text-[10px] tracking-widest text-primary/60 mb-2 uppercase">
                    System Ready // Awaiting Input
                  </div>
                  <ChatInput onSend={handleSend} onSearchClick={() => setSearchModalOpen(true)} />
                  <div className="font-mono text-[9px] tracking-widest text-muted-foreground/30 mt-1.5 flex justify-between uppercase">
                    <span>Encryption: AES-256</span>
                    <span>WellWon AI Core 1.0</span>
                  </div>
                </div>
              </div>
            ) : (
              <ChatResponseView
                userQuery={currentQuery}
                onSend={handleSend}
              />
            )}
          </div>
        </div>

        {/* Right panel: system */}
        {systemOpen && (
          <SystemPanel onClose={() => setSystemOpen(false)} />
        )}

        {/* Right side floating buttons */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-2 z-10">
          <button className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Grid3x3 size={16} />
          </button>
          <button className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Sparkles size={16} />
          </button>
          <button className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      <SearchProtocolModal
        open={searchModalOpen}
        selected={searchMode}
        onSelect={setSearchMode}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default Index;
