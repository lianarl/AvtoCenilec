import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import ValuationForm, { type DisplayOptions } from "@/components/ValuationForm";
import ValuationResult from "@/components/ValuationResult";
import ValuationHistory, { type HistoryEntry } from "@/components/ValuationHistory";
import LoginDialog from "@/components/LoginDialog";
import { calculateValuation, type CarInput, type ValuationResult as Result } from "@/lib/valuation";

export default function ValuationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({ showRange: false, showFactors: false });
  const [username, setUsername] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleSubmit = useCallback((input: CarInput) => {
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const val = calculateValuation(input);
      setResult(val);
      setIsLoading(false);
      setHistory((prev) => [
        { id: crypto.randomUUID(), input, result: val, timestamp: new Date() },
        ...prev,
      ]);
    }, 2200);
  }, []);

  const handleReset = useCallback(() => { setResult(null); setDisplayOptions({ showRange: false, showFactors: false }); }, []);
  const handleHistorySelect = useCallback((entry: HistoryEntry) => { setResult(entry.result); }, []);
  const handleClearHistory = useCallback(() => { setHistory([]); }, []);

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-muted-foreground">
            {username ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Prijavljen kot <span className="text-foreground font-medium">{username}</span>
                <button
                  onClick={() => setUsername(null)}
                  className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Odjava
                </button>
              </span>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-muted-foreground text-sm hover:border-primary/30 hover:text-foreground transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Prijava
              </button>
            )}
          </div>

          {username && (
            <button
              onClick={() => setHistoryOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-muted-foreground text-sm hover:border-primary/30 hover:text-foreground transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Zgodovina
              {history.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                  {history.length}
                </span>
              )}
            </button>
          )}
        </motion.header>

        <div className="flex-1 w-full px-6 md:px-10 lg:px-16 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 h-[calc(100vh-5rem)]">
            <ValuationForm onSubmit={handleSubmit} isLoading={isLoading} onReset={handleReset} displayOptions={displayOptions} onDisplayOptionsChange={setDisplayOptions} />
            <motion.div
              className="rounded-2xl p-6 lg:p-8 bg-card/60 backdrop-blur-2xl border border-border/50 overflow-y-auto"
              style={{
                boxShadow: `
                  0 0 80px hsl(var(--primary) / 0.06),
                  inset 0 1px 0 hsl(var(--glass) / 0.08),
                  0 25px 80px -20px hsl(0 0% 0% / 0.1)
                `,
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ValuationResult result={result} isLoading={isLoading} displayOptions={displayOptions} />
            </motion.div>
          </div>
        </div>
      </div>

      {username && (
        <ValuationHistory
          entries={history}
          onSelect={handleHistorySelect}
          onClear={handleClearHistory}
          open={historyOpen}
          onClose={() => setHistoryOpen(false)}
        />
      )}

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={setUsername} />
    </div>
  );
}
