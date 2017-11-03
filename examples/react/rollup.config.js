import bucklescript from 'rollup-plugin-bucklescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/main.re',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    bucklescript(),
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/react/react.js': ['createElement'],
      },
    }),
  ],
};
