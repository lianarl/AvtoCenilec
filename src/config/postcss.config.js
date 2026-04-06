import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(configDir, "..");

export default {
  plugins: {
    tailwindcss: {
      config: path.join(rootDir, "config/tailwind.config.ts"),
    },
    autoprefixer: {},
  },
};
