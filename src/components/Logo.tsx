const Logo = () => (
  <div className="flex flex-col items-center gap-5">
    <div className="flex items-center gap-2">
      <h1 className="font-sans text-[38px] font-semibold tracking-tight text-foreground uppercase leading-none">
        wellwon
      </h1>
      <div className="bg-primary/20 text-primary text-[13px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border border-primary/30">
        pro
      </div>
    </div>
    <p className="text-[15px] text-muted-foreground font-normal tracking-wide opacity-70">
      Цифровой сотрудник
    </p>
  </div>
);

export default Logo;
