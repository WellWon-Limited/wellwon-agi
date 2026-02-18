import { useState } from "react";
import Logo from "@/components/Logo";
import ChatInput from "@/components/ChatInput";
import Sidebar from "@/components/Sidebar";
import SystemPanel from "@/components/SystemPanel";
import ChatResponseView from "@/components/ChatResponseView";
import SearchProtocolModal from "@/components/SearchProtocolModal";
import BootScreen from "@/components/BootScreen";
import TasksView from "@/components/TasksView";
import KnowledgeBaseView from "@/components/KnowledgeBaseView";
import NavRail from "@/components/NavRail";
import MobileChatList from "@/components/MobileChatList";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import avatarImg from "@/assets/avatar.jpg";
import { Globe, Image, Video, Sparkles, Settings2, PenLine, CheckSquare, Inbox, Database } from "lucide-react";

type View = "home" | "chat" | "tasks" | "base" | "inbox";

const Index = () => {
  const [booting, setBooting] = useState(true);
  const [activeMode, setActiveMode] = useState(0);
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

            {/* Glass top bar — shared style for non-chat views */}
            {(view === "tasks" || view === "inbox" || view === "base") && (
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2.5 px-3 pt-3 pb-3 pointer-events-none">
                {/* Left icon button */}
                <button
                  className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  {view === "tasks" && <CheckSquare size={16} />}
                  {view === "inbox" && <Inbox size={16} />}
                  {view === "base" && <Database size={16} />}
                </button>

                {/* Title pill */}
                <div
                  className="flex-1 flex items-center justify-center pointer-events-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    borderRadius: "100px",
                    padding: "10px 16px",
                  }}
                >
                  <span className="font-mono text-[13px] font-black tracking-widest uppercase text-foreground">
                    {view === "tasks" && "ЗАДАЧИ"}
                    {view === "inbox" && "ИНБОКС"}
                    {view === "base" && "БАЗА"}
                  </span>
                </div>

                {/* Settings button */}
                <button
                  onClick={() => setSystemOpen(true)}
                  className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <Settings2 size={16} />
                </button>
              </div>
            )}

            {/* Tasks view */}
            {view === "tasks" && (
              <div className="h-full overflow-y-auto relative pt-16">
                <TasksView />
              </div>
            )}

            {/* Inbox view */}
            {view === "inbox" && (
              <div className="h-full flex flex-col relative pt-16">
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
                  {[
                    { text: "Нужно подготовить презентацию для инвесторов на следующей неделе", time: "2 мин назад", processed: false },
                    { text: "Идея: сделать рассылку по базе клиентов с новым оффером", time: "14 мин назад", processed: false },
                    { text: "Посмотри кейс конкурента — они запустили новый продукт", time: "1 ч назад", processed: true },
                    { text: "Надо разобраться с подпиской на Notion — скоро истекает", time: "3 ч назад", processed: true },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-4 bg-card border rounded-2xl transition-all ${item.processed ? "border-border/40 opacity-50" : "border-primary/20"}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.processed ? "bg-muted-foreground/40" : "bg-primary animate-pulse"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[14px] leading-snug mb-1 ${item.processed ? "line-through text-muted-foreground" : "text-foreground"}`}>{item.text}</p>
                        <span className="font-mono text-[10px] text-muted-foreground/50">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="shrink-0 px-4 pb-4 pt-2 border-t border-white/5">
                  <div className="glass-input rounded-2xl px-4 py-3 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Набросай идею или задачу..."
                      className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-[14px] font-mono"
                    />
                    <button className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Base view */}
            {view === "base" && (
              <div className="h-full overflow-y-auto relative">
                <KnowledgeBaseView />
              </div>
            )}

            {/* Chat section */}
            {(view === "home" || view === "chat") && (
              <>
                {/* Chat detail view */}
                {mobileChatOpen ? (
                  <div className="h-full flex flex-col relative">
                    {/* Glass floating top bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2.5 px-3 pt-3 pb-3">
                      {/* Back button — round glass */}
                      <button
                        onClick={handleMobileBack}
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors shrink-0"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 5l-7 7 7 7"/>
                        </svg>
                      </button>

                      {/* Mode pill — glass pill with icon buttons */}
                      <div
                        className="flex-1 flex items-center"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                          borderRadius: "100px",
                          padding: "4px",
                        }}
                      >
                        {[
                          { icon: <Sparkles size={17} />, label: "JARVIS" },
                          { icon: <Globe size={17} />, label: "Веб" },
                          { icon: <Image size={17} />, label: "Медиа" },
                          { icon: <Video size={17} />, label: "Видео" },
                        ].map((item, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveMode(i)}
                            title={item.label}
                            className="flex-1 h-9 rounded-full flex items-center justify-center transition-all"
                            style={activeMode === i ? {
                              background: "rgba(255,255,255,0.12)",
                              color: "hsl(var(--primary))",
                            } : {
                              color: "rgba(255,255,255,0.45)",
                            }}
                          >
                            {item.icon}
                          </button>
                        ))}
                      </div>

                      {/* Settings button — round glass */}
                      <button
                        onClick={() => setSystemOpen(true)}
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors shrink-0"
                      >
                        <Settings2 size={16} />
                      </button>
                    </div>

                    {/* Chat content — padding top for floating bar */}
                    <div className="flex-1 min-h-0">
                      <ChatResponseView
                        userQuery={currentQuery}
                        onSend={handleSend}
                      />
                    </div>

                    {/* Floating new chat button */}
                    <button
                      onClick={() => { setView("home"); setMobileChatOpen(true); setCurrentQuery(""); }}
                      style={{
                        background: "rgba(255,255,255,0.13)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
                      }}
                      className="absolute bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground transition-all hover:scale-105 z-10"
                    >
                      <PenLine size={22} />
                    </button>
                  </div>
                ) : (
                  /* Mobile chat list + FAB for new chat */
                  <div className="h-full relative">
                    <MobileChatList
                      currentSession={currentSession}
                      onSelectSession={handleSelectSession}
                      onOpenSettings={() => setSystemOpen(true)}
                      onNewChat={() => { setView("home"); setMobileChatOpen(true); setCurrentQuery(""); }}
                      onSend={handleSend}
                    />
                    {/* FAB — new chat, полупрозрачный */}
                    <button
                      onClick={() => { setView("home"); setMobileChatOpen(true); setCurrentQuery(""); }}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                      }}
                      className="absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-all hover:scale-105 z-10"
                    >
                      <PenLine size={19} />
                    </button>
                  </div>
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
                  <ChatInput onSend={handleSend} onSearchClick={() => setSearchModalOpen(true)} />
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
