import { useState, forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import { getBrands, getModels, type CarInput } from "@/lib/valuation";


export interface DisplayOptions {
  showRange: boolean;
  showFactors: boolean;
}

interface ValuationFormProps {
  onSubmit: (input: CarInput) => void;
  isLoading: boolean;
  onReset?: () => void;
  displayOptions: DisplayOptions;
  onDisplayOptionsChange: (options: DisplayOptions) => void;
}

interface FieldError {
  [key: string]: string;
}

const currentYear = new Date().getFullYear();

const SelectField = forwardRef<
  HTMLSelectElement,
  {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    error?: string;
    placeholder: string;
  }
>(({ label, value, onChange, options, error, placeholder }, ref) => (
  <div>
    <label className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
      {label}
    </label>
    <select
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
        error ? "border-primary" : "border-border/50"
      } text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-muted-foreground/30 appearance-none cursor-pointer`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-primary text-xs mt-1">{error}</p>
    )}
  </div>
));
SelectField.displayName = "SelectField";

const InputField = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  error,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder: string;
  error?: string;
  suffix?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
          error ? "border-primary" : "border-border/50"
        } text-foreground text-base placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-muted-foreground/30`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
          {suffix}
        </span>
      )}
    </div>
    {error && (
      <p className="text-primary text-xs mt-1">{error}</p>
    )}
  </div>
);

export default function ValuationForm({ onSubmit, isLoading, onReset, displayOptions, onDisplayOptionsChange }: ValuationFormProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [errors, setErrors] = useState<FieldError>({});

  const brands = getBrands();
  const models = brand ? getModels(brand) : [];

  const handleBrandChange = (v: string) => {
    setBrand(v);
    setModel("");
  };

  const validate = (): boolean => {
    const e: FieldError = {};
    if (!brand) e.brand = "Prosimo, izberite znamko";
    if (!model) e.model = "Prosimo, izberite model";
    if (!year) e.year = "Prosimo, vnesite letnik";
    else {
      const y = parseInt(year);
      if (isNaN(y) || y < 1980 || y > currentYear + 1)
        e.year = `Letnik mora biti med 1980 in ${currentYear + 1}`;
    }
    if (!mileage) e.mileage = "Prosimo, vnesite kilometrino";
    else {
      const m = parseInt(mileage);
      if (isNaN(m) || m < 0) e.mileage = "Kilometrina ne more biti negativna";
      else if (m > 500000) e.mileage = "Prosimo, vnesite realno kilometrino";
    }
    if (!transmission) e.transmission = "Prosimo, izberite tip menjalnika";
    if (!fuelType) e.fuelType = "Prosimo, izberite vrsto goriva";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReset = () => {
    setBrand("");
    setModel("");
    setYear("");
    setMileage("");
    setTransmission("");
    setFuelType("");
    setErrors({});
    onReset?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      brand,
      model,
      year: parseInt(year),
      mileage: parseInt(mileage),
      transmission: transmission as CarInput["transmission"],
      fuelType: fuelType as CarInput["fuelType"],
    });
  };

  const formRef = useRef<HTMLFormElement>(null);


  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between rounded-2xl p-6 lg:p-8 relative overflow-hidden bg-card/60 backdrop-blur-2xl border border-border/50"
      style={{
        boxShadow: `
          0 0 80px hsl(var(--primary) / 0.06),
          inset 0 1px 0 hsl(var(--glass) / 0.08),
          0 25px 80px -20px hsl(0 0% 0% / 0.1)
        `,
      }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10">
        <div className="mb-5">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium tracking-wider uppercase mb-3">
            Takojšnja tržna ocena
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            Vnesite podatke o vozilu
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Znamka"
          value={brand}
          onChange={handleBrandChange}
          options={brands.map((b) => ({ value: b, label: b }))}
          error={errors.brand}
          placeholder="Izberite znamko"
        />
        <SelectField
          label="Model"
          value={model}
          onChange={setModel}
          options={models.map((m) => ({ value: m, label: m }))}
          error={errors.model}
          placeholder={brand ? "Izberite model" : "Najprej izberite znamko"}
        />
        <InputField
          label="Letnik"
          value={year}
          onChange={setYear}
          type="number"
          placeholder={`1980 – ${currentYear + 1}`}
          error={errors.year}
        />
        <InputField
          label="Kilometrina"
          value={mileage}
          onChange={setMileage}
          type="number"
          placeholder="npr. 45000"
          error={errors.mileage}
          suffix="km"
        />
        <SelectField
          label="Menjalnik"
          value={transmission}
          onChange={setTransmission}
          options={[
            { value: "automatic", label: "Avtomatski" },
            { value: "manual", label: "Ročni" },
          ]}
          error={errors.transmission}
          placeholder="Izberite tip"
        />
        <SelectField
          label="Vrsta goriva"
          value={fuelType}
          onChange={setFuelType}
          options={[
            { value: "gasoline", label: "Bencin" },
            { value: "diesel", label: "Dizel" },
            { value: "hybrid", label: "Hibrid" },
            { value: "electric", label: "Električno" },
          ]}
          error={errors.fuelType}
          placeholder="Izberite gorivo"
        />
        </div>

        <div className="mt-5 pt-4 border-t border-border/20 flex gap-3">
          <button
            type="button"
            onClick={() => onDisplayOptionsChange({ ...displayOptions, showRange: !displayOptions.showRange })}
            className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer group ${
              displayOptions.showRange
                ? "bg-primary/20 text-foreground shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <div className={`w-[51px] h-[31px] rounded-full relative transition-all duration-300 shrink-0 ${
              displayOptions.showRange
                ? "bg-[hsl(142_69%_45%)]"
                : "bg-[hsl(0_0%_78%)]"
            }`} style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}>
              <div className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white transition-all duration-300 ${
                displayOptions.showRange ? "left-[22px]" : "left-[2px]"
              }`} style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)" }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">Razpon cene</span>
          </button>

          <button
            type="button"
            onClick={() => onDisplayOptionsChange({ ...displayOptions, showFactors: !displayOptions.showFactors })}
            className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer group ${
              displayOptions.showFactors
                ? "bg-primary/20 text-foreground shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <div className={`w-[51px] h-[31px] rounded-full relative transition-all duration-300 shrink-0 ${
              displayOptions.showFactors
                ? "bg-[hsl(142_69%_45%)]"
                : "bg-[hsl(0_0%_78%)]"
            }`} style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)" }}>
              <div className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white transition-all duration-300 ${
                displayOptions.showFactors ? "left-[22px]" : "left-[2px]"
              }`} style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)" }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">Vplivni faktorji</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex-1 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full font-semibold text-base overflow-hidden transition-all duration-300 border border-primary/40 text-primary-foreground hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          style={{
            background: "linear-gradient(135deg, hsl(217 91% 45%), hsl(217 91% 35%))",
            boxShadow: "inset 0 1px 1px hsl(0 0% 100% / 0.15), 0 4px 16px hsl(217 91% 45% / 0.35)",
          }}
        >
          {isLoading ? (
            <span className="flex items-center gap-3 relative z-10">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analiziram...
            </span>
          ) : (
            <>
              <span className="relative z-10">Pridobi oceno</span>
              <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent h-1/2 rounded-t-full pointer-events-none" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300 disabled:opacity-50 shrink-0"
          title="Nova poizvedba"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </motion.form>
  );
}
