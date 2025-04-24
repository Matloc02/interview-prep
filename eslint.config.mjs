import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "noImplicitThis": true,
      "strictNullChecks": true,
      "forceConsistentCasingInFileNames": true
    }
  }
  

];

export default eslintConfig;
