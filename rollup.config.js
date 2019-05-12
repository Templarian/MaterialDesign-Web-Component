import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

export default [{
  plugins: [
    typescript(),
    terser()
  ],
  input: './src/mdi-icon.ts',
  output: {
    file: "./dist/mdi-icon.js",
    format: "esm",
    sourcemap: true
  }
}, {
  plugins: [
    typescript(),
    terser()
  ],
  input: './src/mdi-stack.ts',
  output: {
    file: "./dist/mdi-stack.js",
    format: "esm",
    sourcemap: true
  }
}]