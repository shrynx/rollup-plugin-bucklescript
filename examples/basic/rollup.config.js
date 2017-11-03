import bucklescript from 'rollup-plugin-bucklescript';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [bucklescript()],
};
