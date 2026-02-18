const Logo = () => (
  <div className="flex flex-col items-center gap-6 select-none">
    <div className="flex items-center gap-3">
      <h1
        className="font-sans font-black uppercase text-foreground leading-none tracking-tight"
        style={{
          fontSize: "clamp(52px, 8vw, 72px)",
          textShadow: "0 0 60px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.5)",
          letterSpacing: "-0.02em",
        }}
      >
        WELLWON
      </h1>
      <div
        className="bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest rounded-lg flex items-center"
        style={{ fontSize: "13px", padding: "5px 10px" }}
      >
        PRO
      </div>
    </div>
    <p
      className="text-muted-foreground font-mono tracking-[0.35em] uppercase text-[13px] flex items-center gap-2"
    >
      <span className="text-primary text-[8px]">●</span>
      Цифровой сотрудник
      <span className="text-primary text-[8px]">●</span>
    </p>
  </div>
);

export default Logo;
