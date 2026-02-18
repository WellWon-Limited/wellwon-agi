import { useState } from "react";
import Logo from "@/components/Logo";
import ChatInput from "@/components/ChatInput";
import Sidebar from "@/components/Sidebar";
import SystemPanel from "@/components/SystemPanel";
import ChatResponseView from "@/components/ChatResponseView";
import SearchProtocolModal from "@/components/SearchProtocolModal";
import BootScreen from "@/components/BootScreen";
import TasksView from "@/components/TasksView";
import NavRail from "@/components/NavRail";
import MobileChatList from "@/components/MobileChatList";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import avatarImg from "@/assets/avatar.jpg";

type View = "home" | "chat" | "tasks" | "base";

const Index = () => {
  const [booting, setBooting] = useState(true);
  const [view, setView] = useState<View>("home");
  const [systemOpen, setSystemOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<"global" | "code">("global");
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentSession, setCurrentSession] = useState("Стоимость 1кВт");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Mobile: track if we're in chat detail (vs list)
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const isMobile = useIsMobile();

  const handleSend = (text: string) => {
    setCurrentQuery(text);
    setView("chat");
    if (isMobile) setMobileChatOpen(true);
  };

  const handleSelectSession = (title: string) => {
    setCurrentSession(title);
    setView("chat");
    if (isMobile) setMobileChatOpen(true);
  };

  const handleMobileBack = () => {
    setMobileChatOpen(false);
    setView("home");
  };

  const isChatView = view === "home" || view === "chat";

  // ─── MOBILE LAYOUT ──────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}

        <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 min-h-0 overflow-hidden">

            {/* Tasks view */}
            {view === "tasks" && (
              <div className="h-full overflow-y-auto">
                <TasksView />
              </div>
            )}

            {/* Base view */}
            {view === "base" && (
              <div className="h-full flex items-center justify-center px-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                  </div>
                  <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60 mb-2">База знаний</div>
                  <p className="text-muted-foreground text-sm">Скоро здесь появится второй мозг JARVIS</p>
                </div>
              </div>
            )}

            {/* Chat section */}
            {(view === "home" || view === "chat") && (
              <>
                {/* Chat detail view */}
                {mobileChatOpen ? (
                  <div className="h-full flex flex-col">
                    {/* Mobile chat top bar */}
                    <div className="shrink-0 flex items-center gap-2 px-3 pt-safe pt-3 pb-3 border-b border-border bg-background/95 backdrop-blur-sm">
                      <button
                        onClick={handleMobileBack}
                        className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 5l-7 7 7 7"/>
                        </svg>
                      </button>

                      {/* Agent mode pills */}
                      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                        {[
                          { icon: "✦", label: "JARVIS", active: true },
                          { icon: "🌐", label: "Веб" },
                          { icon: "🖼", label: "Медиа" },
                          { icon: "📹", label: "Видео" },
                        ].map((item) => (
                          <button
                            key={item.label}
                            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-mono transition-colors ${
                              item.active
                                ? "bg-primary/15 text-primary border border-primary/30"
                                : "bg-card border border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="text-[11px]">{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setSystemOpen(true)}
                        className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="8" cy="6" r="4"/><path d="M16 6h2"/><circle cx="16" cy="18" r="4"/><path d="M6 18H4"/>
                        </svg>
                      </button>
                    </div>

                    {/* Chat content */}
                    <div className="flex-1 min-h-0">
                      <ChatResponseView
                        userQuery={currentQuery}
                        onSend={handleSend}
                      />
                    </div>
                  </div>
                ) : (
                  /* Mobile chat list */
                  <MobileChatList
                    currentSession={currentSession}
                    onSelectSession={handleSelectSession}
                    onOpenSettings={() => setSystemOpen(true)}
                    onNewChat={() => { setView("home"); setMobileChatOpen(true); setCurrentQuery(""); }}
                    onSend={handleSend}
                  />
                )}
              </>
            )}
          </div>

          {/* Bottom navigation */}
          <MobileBottomNav
            activeView={view}
            onNavigate={(v) => {
              setView(v as View);
              setMobileChatOpen(false);
            }}
          />
        </div>

        {systemOpen && <SystemPanel onClose={() => setSystemOpen(false)} />}
        <SearchProtocolModal
          open={searchModalOpen}
          selected={searchMode}
          onSelect={setSearchMode}
          onClose={() => setSearchModalOpen(false)}
        />
      </>
    );
  }

  // ─── DESKTOP LAYOUT ──────────────────────────────────────────────
  return (
    <>
      {booting && <BootScreen onComplete={() => setBooting(false)} />}

      <div className="flex h-[100dvh] bg-background overflow-hidden">
        {/* Left icon nav rail */}
        <NavRail
          activeView={view}
          onNavigate={(v) => setView(v as View)}
          onAvatarClick={() => setSystemOpen(!systemOpen)}
          avatarSrc={avatarImg}
        />

        {/* Chat session sidebar — only visible in chat mode */}
        {isChatView && sidebarOpen && (
          <Sidebar
            onOpenSettings={() => setSystemOpen(true)}
            currentSession={currentSession}
            activeView={view}
            onNavigate={(v) => setView(v as View)}
            onSelectSession={(title) => {
              setCurrentSession(title);
              setView("chat");
            }}
            onCollapse={() => setSidebarOpen(false)}
          />
        )}

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
          {/* Top bar */}
          <header className="shrink-0 flex items-center justify-between px-4 md:px-6 pt-4 pb-3">
            {isChatView && !sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              </button>
            )}
            {(!isChatView || sidebarOpen) && <div />}

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground/40 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                JARVIS · Online
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 min-h-0 flex flex-col items-center w-full">
            {view === "tasks" ? (
              <div className="flex-1 min-h-0 w-full max-w-[960px]">
                <TasksView />
              </div>
            ) : view === "base" ? (
              <div className="flex-1 min-h-0 w-full max-w-[960px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                  </div>
                  <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground/60 mb-2">База знаний</div>
                  <p className="text-muted-foreground text-sm">Скоро здесь появится второй мозг JARVIS</p>
                </div>
              </div>
            ) : view === "home" ? (
              <div className="flex flex-col flex-1 min-h-0 w-full max-w-[900px] px-4 md:px-6">
                <div className="flex-1 flex items-center justify-center">
                  <Logo />
                </div>
                <div className="shrink-0 pb-6 pt-2">
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
              <div className="flex-1 min-h-0 w-full max-w-[900px]">
                <ChatResponseView userQuery={currentQuery} onSend={handleSend} />
              </div>
            )}
          </div>
        </div>

        {systemOpen && <SystemPanel onClose={() => setSystemOpen(false)} />}
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
