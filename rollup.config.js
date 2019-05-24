import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import { string } from "rollup-plugin-string";

export default [{
  plugins: [
    string({
      include: "**/*.html"
    }),
    string({
      include: "**/*.css"
    }),
    typescript(),
    terser()
  ],
  input: './src/mdiIcon.ts',
  output: {
    file: "./dist/mdiIcon.js",
    format: "esm",
    sourcemap: true
  }
} /*, {
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
}*/]