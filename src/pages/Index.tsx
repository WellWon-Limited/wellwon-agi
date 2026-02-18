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
import DashboardView from "@/components/DashboardView";
import BrainView from "@/components/BrainView";
import BriefsView from "@/components/BriefsView";
import CapsulesView from "@/components/CapsulesView";
import ExpertsView from "@/components/ExpertsView";
import ProfileView from "@/components/ProfileView";
import { useIsMobile } from "@/hooks/use-mobile";
import avatarImg from "@/assets/avatar.jpg";
import {
  Globe, Image, Video, Sparkles, Settings2, PenLine,
  CheckSquare, Package, Users, User, BarChart2, Home,
  MessageSquare, Brain
} from "lucide-react";

type View =
  | "home" | "chat" | "tasks" | "brain" | "more"
  | "briefs" | "capsules" | "experts" | "profile";

// Top bar config for secondary views
const topBarConfig: Partial<Record<View, { icon: React.ReactNode; title: string }>> = {
  tasks:   { icon: <CheckSquare size={16} />, title: "ЗАДАЧИ" },
  brain:   { icon: <Brain size={16} />, title: "BRAIN" },
  home:    { icon: <Home size={16} />, title: "ГЛАВНАЯ" },
  briefs:  { icon: <Sparkles size={16} />, title: "БРИФ" },
  capsules:{ icon: <Package size={16} />, title: "КАПСУЛЫ" },
  experts: { icon: <Users size={16} />, title: "ЭКСПЕРТЫ" },
  profile: { icon: <User size={16} />, title: "ПРОФИЛЬ" },
  more:    { icon: <BarChart2 size={16} />, title: "ЕЩЁ" },
};

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
    setView("chat");
  };

  const handleNavigate = (v: string) => {
    setView(v as View);
    setMobileChatOpen(false);
  };

  const isChatView = view === "chat";
  const isTopBarView = view !== "chat" || !mobileChatOpen;

  // ─── MOBILE LAYOUT ──────────────────────────────────────────────
  if (isMobile) {
    const topBar = topBarConfig[view];
    const showTopBar = topBar && !(view === "chat" && mobileChatOpen);

    return (
      <>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}

        <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden relative">

            {/* Floating glass top bar for secondary views */}
            {showTopBar && view !== "chat" && (
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2.5 px-3 pt-3 pb-3 pointer-events-none">
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
                  {topBar.icon}
                </button>

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
                    {topBar.title}
                  </span>
                </div>

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

            {/* ── HOME ── */}
            {view === "home" && (
              <div className="h-full overflow-y-auto">
                <DashboardView onNavigate={handleNavigate} />
              </div>
            )}

            {/* ── TASKS ── */}
            {view === "tasks" && (
              <div className="h-full overflow-y-auto relative pt-16">
                <TasksView />
              </div>
            )}

            {/* ── BRAIN ── */}
            {view === "brain" && (
              <div className="h-full overflow-hidden relative">
                <BrainView />
              </div>
            )}

            {/* ── BRIEFS ── */}
            {view === "briefs" && (
              <div className="h-full overflow-hidden relative">
                <BriefsView onNavigate={handleNavigate} />
              </div>
            )}

            {/* ── CAPSULES ── */}
            {view === "capsules" && (
              <div className="h-full overflow-hidden relative">
                <CapsulesView />
              </div>
            )}

            {/* ── EXPERTS ── */}
            {view === "experts" && (
              <div className="h-full overflow-hidden relative">
                <ExpertsView />
              </div>
            )}

            {/* ── PROFILE ── */}
            {view === "profile" && (
              <div className="h-full overflow-hidden relative">
                <ProfileView />
              </div>
            )}

            {/* ── MORE ── */}
            {view === "more" && (
              <div className="h-full overflow-y-auto scrollbar-hide">
                <div className="px-4 pt-20 pb-8 space-y-3">
                  {[
                    {
                      id: "briefs", icon: <Sparkles size={22} />, label: "Брифы",
                      desc: "Утренний бриф и вечерний отчёт", color: "text-amber-400",
                      bg: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.20)"
                    },
                    {
                      id: "capsules", icon: <Package size={22} />, label: "Капсулы",
                      desc: "Форвардные задачи с контекстом", color: "text-blue-400",
                      bg: "rgba(74,158,255,0.10)", border: "rgba(74,158,255,0.20)"
                    },
                    {
                      id: "experts", icon: <Users size={22} />, label: "Эксперты",
                      desc: "Каталог агентов и фоновые процессы", color: "text-violet-400",
                      bg: "rgba(183,124,255,0.10)", border: "rgba(183,124,255,0.20)"
                    },
                    {
                      id: "profile", icon: <User size={22} />, label: "Профиль",
                      desc: "9 доменов, черты личности, тренды", color: "text-primary",
                      bg: "rgba(234,56,87,0.10)", border: "rgba(234,56,87,0.20)"
                    },
                    {
                      id: "settings", icon: <Settings2 size={22} />, label: "Настройки",
                      desc: "Системные параметры JARVIS", color: "text-muted-foreground/60",
                      bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.09)"
                    },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "settings") setSystemOpen(true);
                        else handleNavigate(item.id);
                      }}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left hover:opacity-80 transition-all active:scale-[0.99]"
                      style={{ background: item.bg, border: `1px solid ${item.border}` }}
                    >
                      <div className={`${item.color} shrink-0`}>{item.icon}</div>
                      <div className="flex-1">
                        <div className={`font-mono text-[14px] font-bold ${item.color} mb-0.5`}>{item.label}</div>
                        <div className="font-mono text-[11px] text-muted-foreground/50">{item.desc}</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/25 shrink-0">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── CHAT ── */}
            {view === "chat" && (
              <>
                {mobileChatOpen ? (
                  <div className="h-full flex flex-col relative">
                    {/* Chat top bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2.5 px-3 pt-3 pb-3">
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

                      <div
                        className="flex-1 flex items-center overflow-x-auto scrollbar-hide"
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
                            className="flex-1 h-9 rounded-full flex items-center justify-center transition-all shrink-0"
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

                    <div className="flex-1 min-h-0">
                      <ChatResponseView
                        userQuery={currentQuery}
                        onSend={handleSend}
                      />
                    </div>

                    <button
                      onClick={() => { setMobileChatOpen(false); }}
                      style={{
                        background: "rgba(255,255,255,0.13)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
                      }}
                      className="absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground transition-all hover:scale-105 z-10"
                    >
                      <PenLine size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="h-full relative">
                    <MobileChatList
                      currentSession={currentSession}
                      onSelectSession={handleSelectSession}
                      onOpenSettings={() => setSystemOpen(true)}
                      onNewChat={() => { setMobileChatOpen(true); setCurrentQuery(""); }}
                      onSend={handleSend}
                    />
                    <button
                      onClick={() => { setMobileChatOpen(true); setCurrentQuery(""); }}
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
            onNavigate={handleNavigate}
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
        <NavRail
          activeView={view}
          onNavigate={(v) => setView(v as View)}
          onAvatarClick={() => setSystemOpen(!systemOpen)}
          avatarSrc={avatarImg}
        />

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

        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
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

          <div className="flex-1 min-h-0 flex flex-col items-center w-full">
            {view === "tasks" ? (
              <div className="flex-1 min-h-0 w-full max-w-[960px]">
                <TasksView />
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
