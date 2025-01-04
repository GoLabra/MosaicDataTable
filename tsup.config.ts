
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"], // Build for commonJS and ESmodules
    dts: true, // Generate declaration file (.d.ts)
    splitting: false,
    sourcemap: true,
    clean: true,
    external: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/material/styles',
        '@mui/icons-material',
        '@mui/material/*', // This will mark all MUI imports as external
        '@emotion/react',
        '@emotion/styled'
    ],
});