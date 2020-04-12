import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { string } from "rollup-plugin-string";

const BROWSER = 'iife';
const CONFIG = {
  typescript: require('typescript'),
  tsconfigOverride: {
    compilerOptions: {
      module: "es2015"
    }
  }
};

export default [{
  plugins: [
    resolve(),
    typescript(CONFIG),
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
    typescript(CONFIG),
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
    file: './dist/mdiIconTooltip.js',
    format: BROWSER,
    sourcemap: true
  }
}, {
  plugins: [
    resolve(),
    typescript(CONFIG),
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
    file: './dist/mdiIconLevel.js',
    format: BROWSER,
    sourcemap: true
  }
}]