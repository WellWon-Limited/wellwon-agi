const Logo = () => (
  <div className="flex flex-col items-center gap-5">
    <div className="flex items-center gap-2">
      <h1 className="font-sans text-[32px] font-extrabold tracking-tight text-foreground uppercase leading-none">
        wellwon
      </h1>
      <div className="bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
        pro
      </div>
    </div>
    <p className="text-[15px] text-muted-foreground font-normal tracking-wide opacity-70">
      Цифровой сотрудник
    </p>
  </div>
);

export default Logo;
