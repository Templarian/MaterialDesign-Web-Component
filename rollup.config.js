import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { string } from "rollup-plugin-string";

const BROWSER = 'iife';

export default [{
  plugins: [
    resolve(),
    typescript({ typescript: require('typescript') }),
    string({
      include: '**/*.html'
    }),
    string({
      include: '**/*.css'
    })
  ],
  input: './src/mdi/icon/icon.ts',
  output: {
    name: 'MdiIcon',
    file: './dist/mdiIcon.js',
    format: BROWSER,
    sourcemap: true
  }
}, {
  plugins: [
    resolve(),
    typescript({ typescript: require('typescript') }),
    string({
      include: '**/*.html'
    }),
    string({
      include: '**/*.css'
    })
  ],
  input: './src/mdi/iconTooltip/iconTooltip.ts',
  output: {
    name: 'MdiIconTooltip',
    file: './dist/mdi/iconTooltip.js',
    format: BROWSER,
    sourcemap: true
  }
}, {
  plugins: [
    resolve(),
    typescript({ typescript: require('typescript') }),
    string({
      include: '**/*.html'
    }),
    string({
      include: '**/*.css'
    })
  ],
  input: './src/mdi/iconLevel/iconLevel.ts',
  output: {
    name: 'MdiLevel',
    file: './dist/mdi/iconLevel.js',
    format: BROWSER,
    sourcemap: true
  }
}]