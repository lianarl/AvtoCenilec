import { AnimatePresence, motion } from "framer-motion";
import type { CarInput, ValuationResult } from "@/lib/valuation";

export interface HistoryEntry {
  id: string;
  input: CarInput;
  result: ValuationResult;
  timestamp: Date;
}

interface Props {
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
  open: boolean;
  onClose: () => void;
}

const fuelLabels: Record<string, string> = {
  gasoline: "Bencin",
  diesel: "Dizel",
  hybrid: "Hibrid",
  electric: "Električno",
};

const transLabels: Record<string, string> = {
  automatic: "Avt.",
  manual: "Ročni",
};

export default function ValuationHistory({ entries, onSelect, onClear, open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col bg-card/95 backdrop-blur-2xl border-l border-border/30"
            style={{
              boxShadow: "-20px 0 60px hsl(0 0% 0% / 0.4)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <div>
                <h2 className="text-lg font-display font-bold text-foreground">Zgodovina</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {entries.length} {entries.length === 1 ? "ocena" : entries.length < 5 ? "ocene" : "ocen"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {entries.length > 0 && (
                  <button
                    onClick={onClear}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                  >
                    Počisti vse
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <p className="text-muted-foreground text-sm">Še nimate shranjenih ocen</p>
                </div>
              ) : (
                <AnimatePresence>
                  {entries.map((entry, i) => (
                    <motion.button
                      key={entry.id}
                      onClick={() => {
                        onSelect(entry);
                        onClose();
                      }}
                      className="w-full text-left glass-panel rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            {entry.input.brand.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                              {entry.input.brand} {entry.input.model}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {entry.input.year} · {entry.input.mileage.toLocaleString("sl-SI")} km · {transLabels[entry.input.transmission]} · {fuelLabels[entry.input.fuelType]}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <p className="font-display font-bold text-foreground text-sm">
                            {entry.result.estimatedPrice.toLocaleString("sl-SI")} €
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {entry.timestamp.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
