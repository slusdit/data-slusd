// ESLint flat config (ESLint 9). Next 16 removed `next lint`, so `npm run lint`
// runs `eslint .` with the same Next core-web-vitals rules as before.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    // eslint-config-next 16 enables the React Compiler readiness rules as errors.
    // They flag long-standing patterns (state synced from props in effects,
    // components defined inside render) that are not regressions. Kept as
    // warnings until those components are reworked; see the upgrade commit.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
    "docs/**",
    "backend/**",
  ]),
]);
