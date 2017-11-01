import buble from 'rollup-plugin-buble';
const pkg = require('./package.json');

const external = [...Object.keys(pkg.dependencies), 'path'];

export default {
  input: 'index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [buble()],
  external: external,
  sourcemap: true,
};
