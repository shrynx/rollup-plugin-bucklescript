# rollup-plugin-bucklescript

![dependency-status](https://david-dm.org/shrynx/rollup-plugin-bucklescript.svg?path=rollup-plugin-bucklescript)
[![npm version](https://badge.fury.io/js/rollup-plugin-bucklescript.svg)](https://badge.fury.io/js/rollup-plugin-bucklescript)

> [bucklescript](https://github.com/BuckleScript/bucklescript) compiler plugin for [rollup.js](https://rollupjs.org/)

works with both [ReasonML](https://reasonml.github.io/) and [OCaml](http://ocaml.org/)

## Usage

### Installation

First install `bs-platform` in your project

```shell
npm i -D bs-platform
```

create a `bsconfig.json` for Bucklescript in the root directory of your project

and remember to specify `"package-specs"` as `["es6"]`, so that rollup can consume it.

```javascript
{
  "name": "hello",
  "sources": ["src"],
  "bs-dependencies": ["reason-react"],
  "reason": {
    "react-jsx": 2
  },
  "package-specs": ["es6"],
  "refmt": 3
}
```

Finally, install `rollup-plugin-bucklescript`

```shell
npm i -D rollup-plugin-bucklescript
```

and add it to your rollup config.

```javascript
import bucklescript from 'rollup-plugin-bucklescript'

export default {
  input: 'src/main.re',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    bucklescript()
  ],
}
```

### Options

All the settings are taken from `bsconfig.json`, but few options can be overridden.

### `include` and `exclude`

 each a minimatch pattern, or array of minimatch patterns, which determines which files are complied by Bucklescript.
 By default all  `.re` and `.ml` are included and all `.rei` and `.mli` are excluded.

### `module`

To specify bucklescript output type for rollup to consume.

**Note: Please check the Caveats section**

```javascript
...

plugins: [
  bucklescript({
    module: 'es6'
  })
]
```

### `inSource`

To use bs-loader with [bsb's in-souce builds](https://bucklescript.github.io/bucklescript/Manual.html#_in_source_build_support_since_1_9_0),
add the `inSource` option to your loader config:

```javascript
...

plugins: [
  bucklescript({
    inSource: false
  })
]
```

### `cwd`

This option specifies what directory to run `bsb` from.

```javascript
...

plugins: [
  bucklescript({
    cwd: 'path/to/dir'
  })
]
```

### `showWarnings`

Controls whether `bsb` compile warnings are shown. Defaults to `true`.

```javascript
...

plugins: [
  bucklescript({
    showWarnings: true
  })
]
```

## Examples
Check the [examples folder](https://github.com/shrynx/rollup-plugin-bucklescript/tree/master/examples) in the github repo.

# Caveats
Please use `es6` for `module` option as rollup works only with es modules.
But this breaks integration with with react, 
thought it can be easily solved by following the helpful error message provided by rollup.

or check the [react folder](https://github.com/shrynx/rollup-plugin-bucklescript/tree/master/examples/react)

## Acknowledgement

-   [bs-loader](https://github.com/reasonml-community/bs-loader) - A webpack plugin for bucklescript,
    for providing `bsb-js` and `read-bsconfig`.
-   Reason team at facebook and all the project contributors for making ReasonML
-   [@bobzhang](https://github.com/bobzhang) and all contributors of bucklescript.

## License

MIT
