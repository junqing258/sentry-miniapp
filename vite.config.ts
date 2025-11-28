import Module from "module";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const { builtinModules } = Module;
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const nodeBuiltIns = new Set([
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
]);
const banner = `// ${pkg.name} v${pkg.version}`;

export default defineConfig((args) => {
  return {
    build: {
      target: "es2015",
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: args.mode === "dev" ? ["es"] : ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      },
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        external: (id) => nodeBuiltIns.has(id),
        treeshake: {
          moduleSideEffects: (id) => id.includes('polyfills'),
        },
        output: {
          banner,
          exports: "named",
        },
      },
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
      dts({
        entryRoot: "src",
        rollupTypes: true,
        outDir: "dist",
      }),
    ],
  };
});
