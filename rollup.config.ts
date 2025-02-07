import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "src/index.ts",
  external: [], // 忽略有commonjs的库
  output: {
    minifyInternalExports: true,
    dir: "dist",
    format: "cjs",
    entryFileNames: "index.cjs",
  },
  plugins: [nodeResolve(), commonjs(), json(), typescript(), terser()],
});
