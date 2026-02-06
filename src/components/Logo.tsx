const Logo = () => (
  <div className="flex flex-col items-center gap-5">
    <div className="flex items-center gap-3">
      <h1 className="font-sans text-[42px] font-bold tracking-tight text-foreground uppercase leading-none">
        WELLWON
      </h1>
      <div className="bg-primary text-primary-foreground text-[15px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-[0_0_15px_hsl(350_80%_57%/0.4)] translate-y-[2px]">
        PRO
      </div>
    </div>
    <p className="text-[17px] text-muted-foreground font-normal tracking-wide opacity-80">
      Цифровой сотрудник
    </p>
  </div>
);

export default Logo;
