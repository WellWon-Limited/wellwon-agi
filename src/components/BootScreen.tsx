import { useEffect, useState } from "react";
import robotImg from "@/assets/ai-robot.jpg";

const bootLines = [
  "> INITIALIZING CORE...",
  "> LOADING NEURAL MESH v4.0...",
  "> ESTABLISHING SECURE LINK...",
  "> CALIBRATING OPTICS...",
  "> SYSTEM READY.",
];

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [barProgress, setBarProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const intervals: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
        setBarProgress(Math.round(((i + 1) / bootLines.length) * 100));
      }, 400 + i * 500);
      intervals.push(t);
    });

    const finalT = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, 400 + bootLines.length * 500 + 400);
    intervals.push(finalT);

    return () => intervals.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Robot image */}
      <div className="w-48 h-48 mb-8 overflow-hidden">
        <img
          src={robotImg}
          alt="WellWon AI"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Boot sequence */}
      <div className="w-72">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary font-mono text-[13px] font-bold tracking-widest">
            {">_"}
          </span>
          <span className="text-foreground font-mono text-[13px] font-bold tracking-widest uppercase">
            BOOT SEQUENCE
          </span>
        </div>
        <div className="border-t border-border mb-4" />

        <div className="space-y-1.5 min-h-[120px]">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`font-mono text-[12px] tracking-wide ${
                i === visibleLines - 1 && line === "> SYSTEM READY."
                  ? "text-foreground"
                  : "text-primary"
              }`}
              style={{
                animation: "fadeIn 0.3s ease both",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-[2px] bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${barProgress}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
