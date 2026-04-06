import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ValuationResult as Result } from "@/lib/valuation";
import type { DisplayOptions } from "@/components/ValuationForm";

interface Props {
  result: Result | null;
  isLoading: boolean;
  displayOptions: DisplayOptions;
}

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display.toLocaleString("sl-SI")} €</>;
}

function FactorBar({ factor, index }: { factor: Result["factors"][0]; index: number }) {
  const isPositive = factor.percentage >= 0;
  const absPercent = Math.abs(factor.percentage);
  const maxWidth = Math.min(absPercent * 2.5, 100);

  return (
    <motion.div
      className="glass-panel rounded-xl p-3 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? "bg-positive" : "bg-destructive"}`} />
          <span className="font-medium text-foreground text-sm">{factor.name}</span>
        </div>
        <span className={`text-xs font-bold ${isPositive ? "text-positive" : "text-destructive"}`}>
          {isPositive ? "+" : ""}{factor.percentage}%
        </span>
      </div>
      <div className="h-1 rounded-full bg-secondary overflow-hidden mb-1.5">
        <motion.div
          className={`h-full rounded-full ${
            isPositive
              ? "bg-gradient-to-r from-positive/60 to-positive"
              : "bg-gradient-to-r from-destructive/60 to-destructive"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${maxWidth}%` }}
          transition={{ delay: 0.6 + index * 0.08, duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{factor.description}</p>
    </motion.div>
  );
}

export default function ValuationResult({ result, isLoading, displayOptions }: Props) {
  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="flex-1 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
            </div>
            <p className="text-muted-foreground text-sm">Analiziranje vozila...</p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            className="flex-1 flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="rounded-2xl p-4 text-center shine-effect relative overflow-hidden bg-card border border-border/50"
              style={{ boxShadow: "0 2px 12px hsl(0 0% 0% / 0.06)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

              <span className="inline-block px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-widest mb-2">
                Ocenjena tržna vrednost
              </span>

              <motion.div
                className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1 relative z-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <AnimatedPrice value={result.estimatedPrice} />
              </motion.div>

              {displayOptions.showRange && (
                <div className="text-sm text-muted-foreground mb-3">
                  Razpon:{" "}
                  <span className="text-foreground font-medium">
                    {result.rangeLow.toLocaleString("sl-SI")} €
                  </span>
                  {" – "}
                  <span className="text-foreground font-medium">
                    {result.rangeHigh.toLocaleString("sl-SI")} €
                  </span>
                </div>
              )}

              <p className="text-muted-foreground text-xs max-w-sm mx-auto leading-relaxed">
                {result.explanation}
              </p>
            </motion.div>

            {displayOptions.showFactors && (
              <div className="flex-1 min-h-0 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-display font-bold text-foreground">
                    Kaj je vplivalo na rezultat
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-positive" />
                      <span>Zvišuje</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span>Znižuje</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex-1 min-h-0 grid gap-2"
                  style={{ gridTemplateRows: `repeat(${result.factors.length}, minmax(0, 1fr))` }}
                >
                  {result.factors.map((factor, i) => (
                    <FactorBar key={factor.name} factor={factor} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="flex-1 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a9 9 0 11-18 0V5.25" />
              </svg>
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-1">
              Rezultat ocene
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Izpolnite obrazec na levi in kliknite "Pridobi oceno" za prikaz tržne vrednosti
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
