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
  input: './src/mdiIconTooltip.ts',
  output: {
    name: 'MdiIconTooltip',
    file: './dist/mdi/icon-tooltip.js',
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
  input: './src/mdiIconLevel.ts',
  output: {
    name: 'MdiLevel',
    file: './dist/mdi/iconLevel.js',
    format: BROWSER,
    sourcemap: true
  }
}]