import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Désactive la règle introduite par eslint-plugin-react-hooks@7.1.1
      // (faux positifs sur les patterns SSR hydration `setMounted(true)` dans
      // useEffect avec deps vide — pattern intentionnel Next.js).
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
