export interface CarInput {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  transmission: "automatic" | "manual";
  fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
}

export interface FactorImpact {
  name: string;
  percentage: number;
  description: string;
}

export interface ValuationResult {
  estimatedPrice: number;
  rangeLow: number;
  rangeHigh: number;
  factors: FactorImpact[];
  explanation: string;
}

const brandModels: Record<string, string[]> = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Supra", "Land Cruiser"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "M3", "M5", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "AMG GT"],
  Audi: ["A3", "A4", "A6", "Q5", "Q7", "RS5", "e-tron"],
  Ford: ["Mustang", "F-150", "Explorer", "Bronco", "Escape", "Maverick"],
  Chevrolet: ["Camaro", "Corvette", "Silverado", "Equinox", "Tahoe", "Malibu"],
  Volkswagen: ["Golf", "Jetta", "Tiguan", "Atlas", "ID.4", "Passat"],
  Hyundai: ["Elantra", "Tucson", "Santa Fe", "Sonata", "Kona", "Ioniq 5"],
  Kia: ["Forte", "Sportage", "Telluride", "K5", "EV6", "Sorento"],
  Nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Frontier", "Z"],
  Mazda: ["Mazda3", "CX-5", "CX-30", "CX-50", "MX-5 Miata", "CX-90"],
  Lexus: ["IS", "ES", "RX", "NX", "GX", "LC"],
  Porsche: ["911", "Cayenne", "Macan", "Taycan", "Panamera", "718 Boxster"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  Volvo: ["XC40", "XC60", "XC90", "S60", "V60", "C40 Recharge"],
  Subaru: ["Outback", "Forester", "Crosstrek", "WRX", "Impreza", "Legacy"],
  Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Gladiator"],
};

export function getBrands(): string[] {
  return Object.keys(brandModels).sort();
}

export function getModels(brand: string): string[] {
  return brandModels[brand] || [];
}

export function calculateValuation(_input: CarInput): ValuationResult {
  return {
    estimatedPrice: 15000,
    rangeLow: 13200,
    rangeHigh: 16800,
    factors: [
      { name: "Znamka", percentage: 12, description: "Znamka dosega premijsko ceno na trgu" },
      { name: "Letnik", percentage: -18, description: "Starost vozila znižuje vrednost" },
      { name: "Kilometrina", percentage: -5, description: "Kilometrina je v pričakovanem obsegu" },
      { name: "Menjalnik", percentage: 3, description: "Avtomatski menjalnik je bolj priljubljen med kupci" },
      { name: "Vrsta goriva", percentage: 8, description: "Hibridna učinkovitost povečuje tržno privlačnost" },
    ],
    explanation: "Dejavniki znamka, menjalnik in vrsta goriva so zvišali ocenjeno vrednost, medtem ko so letnik in kilometrina znižali končno tržno oceno.",
  };
}
