import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import { string } from "rollup-plugin-string";

const BROWSER = 'iife';

export default [{
  plugins: [
    string({
      include: '**/*.html'
    }),
    string({
      include: '**/*.css'
    }),
    typescript(),
    terser()
  ],
  input: './src/mdiIcon.ts',
  output: {
    name: 'MdiIcon',
    file: './dist/mdi/icon.js',
    format: BROWSER,
    sourcemap: true
  }
}, {
  plugins: [
    string({
      include: '**/*.html'
    }),
    string({
      include: '**/*.css'
    }),
    typescript(),
    terser()
  ],
  input: './src/mdiCustom.ts',
  output: {
    name: 'MdiCustom',
    file: './dist/mdi/custom.js',
    format: BROWSER,
    sourcemap: true
  }
}]