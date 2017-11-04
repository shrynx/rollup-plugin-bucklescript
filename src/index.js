import * as path from 'path';
import { createFilter, addExtension } from 'rollup-pluginutils';
import { compileFile } from 'bsb-js';

import getBsConfigModuleOptions from './helpers/getBsConfigModuleOptions';
import jsFilePath from './helpers/jsFilePath';
import isRelative from './helpers/isRelative';

export default (options = {}) => {
  const filter = createFilter(
    options.include || ['*.+(ml|re)', '**/*.+(ml|re)'],
    options.exclude || ['*.+(mli|rei)', '**/*.+(mli|rei)']
  );

  const buildDir = options.cwd || process.cwd();
  const showWarnings =
    options.showWarnings !== undefined ? options.showWarnings : true;

  const bsconfig = getBsConfigModuleOptions(buildDir);

  const moduleDir = options.module || bsconfig.moduleDir;
  const bsSuffix = bsconfig.suffix;
  const inSourceBuild = options.inSource || bsconfig.inSource || false;

  return {
    name: 'bucklescript',
    resolveId: (importee, importer) => {
      if (!filter(importer)) {
        return null;
      }

      if (isRelative(importee)) {
        const moduleDir = bsconfig.moduleDir;
        const bsSuffix = bsconfig.suffix;

        const inSourceBuild = options.inSource || bsconfig.inSource || false;

        const buildpath = jsFilePath(
          buildDir,
          moduleDir,
          importer,
          inSourceBuild,
          bsSuffix
        );
        const relativePath = path.join(buildpath, '..', importee);
        return addExtension(relativePath, bsSuffix);
      }
      return null;
    },
    transform: function(code, id) {
      if (moduleDir !== 'es6') {
        throw new Error(
          `Please "specify-packge" as "[es6]" in "bsconfig.json"
or  pass " module: 'es6' " in config options of bucklescript plugin`
        );
      }
      if (!filter(id)) {
        return null;
      }

      const compiledFilePath = jsFilePath(
        buildDir,
        moduleDir,
        id,
        inSourceBuild,
        bsSuffix
      );

      return compileFile(
        buildDir,
        moduleDir,
        compiledFilePath
      ).then(({ src, warnings, errors }) => {
        if (showWarnings) {
          warnings.forEach(message => {
            this.warn(message);
          });
        }

        if (errors.length > 0) {
          throw new Error(errors[errors.length - 1]);
        } else {
          return {
            code: src,
            map: { mappings: '' },
          };
        }
      });
    },
  };
};
