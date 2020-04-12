import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { string } from "rollup-plugin-string";
import * as fs from 'fs';
import * as path from 'path';

const BROWSER = 'iife';
const CONFIG = {
  typescript: require('typescript'),
  tsconfigOverride: {
    compilerOptions: {
      module: "es2015"
    }
  }
};

const entries = [];

const srcDir = path.join(__dirname, 'src');
const namespaces = fs.readdirSync(srcDir)
  .filter((f) => f.match(/^[a-z]+$/) !== null);
namespaces.forEach((namespace) => {
  const namespaceDir = path.join(srcDir, namespace);
  const components = fs.readdirSync(namespaceDir)
    .filter((f) => f.match(/^[a-zA-Z0-9]+$/) !== null);
  components.forEach((component) => {
    const componentDir = path.join(namespaceDir, component);
    const file = path.join(componentDir, `${component}.ts`);
    if (fs.existsSync(file)) {
      const name = `${namespace}${component[0].toUpperCase()}${component.substr(1)}`;
      entries.push({
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
        input: `./src/${namespace}/${component}/${component}.ts`,
        output: {
          name: `${name}`,
          file: `./dist/${name}.js`,
          format: BROWSER,
          sourcemap: true
        }
      });
    } else {
      console.error(`Unable to find ${file}!`);
    }
  });
});


export default [...entries];